## Compile Time Errors

Immutable Styles are compiled from JavaScript to CSS (using the method `createCSS`). The library ships with a friendly compiler that helps assist development, rather than bark at you. If the compiler finds an error, such as a CSS override the compilation process is terminated and an error is thrown.

Each error is documented below including the problem code and the error thrown.

### Unknown Attribute

When an unknown attribute is found:

```js
createStyle(
  "p",
  {
    foo: "invalidAttr"
  },
  'font-size: 20px;'
)
```

Throws:

```
[Unknown Attribute] "foo" is not a valid attribute

Occurrence found:

  foo="invalidAttr"

Only the following attributes are permitted:

  className, minWidth, maxWidth, pseudo
```

### Duplicate CSS Property

When a CSS property is defined more than once in same block.

```js
createStyle(
  "h1",
  {
    className: "title"
  },
  `color: darkslategray;
  font-size: 20px;
  color: burlywood;`
)
```

Throws:

```
[Duplicate CSS Property] The property "color" has been defined more than once by "h1.title"

  color: darkslategray;
  font-size: 20px;
  color: burlywood;
```

### Override Found

When one style overrides another style.

```js
createStyle(
  "p",
  {
    className: "child"
  },
  'color: darksalmon;'
),
createStyle(
  "div",
  {
    className: "parent"
  },
  createStyle(
    "p",
    {
      className: "child"
    },
    `font-size: 10px;
    color: lightsalmon;`
  )
)
```

Throws:

```
[Override Found] "div.parent p.child" overrides the "color" set by "p.child"

Overridden styles ("p.child"):

  color: darksalmon;

Overriding styles ("div.parent p.child"):

  font-size: 10px;
  color: lightsalmon;

The "color" of "p.child" cannot be overridden
```

### Nested Media Query

When a media query is nested inside another media query.

```js
createStyle(
  "footer",
  {
    minWidth: 900
  },
  'padding: 0 30px;',
  createStyle(
    "p",
    {
      minWidth: 300
    },
    'font-size: 12px;'
  )
)
```

Throws:

```
[Nested Media Query] Nested media query found in "footer"

Outer media query ("footer"):

  min-width of 900

Inner media query ("footer p"):

  min-width of 300
```

### Unknown Base Class

When a subclass extends a superclass that hasn't been defined.

```js
createStyle(
  "div",
  {
    className: "baseClass.subClass"
  },
  'padding: 30px;'
)
```

Throws:

```
[Unknown Base Class] The base class "div.baseClass" does not exist

Occurrence found:

  "div.baseClass.subClass"
```

### Element Property Mismatch

Immutable Styles does not allow child elements to inherit styles from parent elements. This means inheritable CSS properties can only be applied directly to a given element. Otherwise it wouldn't be possible for the compiler to detect a child element overriding an inherited style.

The usage of inheritable CSS properties are whitelisted to certain elements, for example `font-size` can be used by a `p` but not a `div`:

```js
createStyle(
  "div",
  null,
  'font-size: 20px;'
)
```

Throws:

```
[Element Property Mismatch] The element <div> cannot use the property "font-size"

Occurrence found ("div"):

  font-size: 20px;

"font-size" can only be used by the following elements:

  <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <p>, <a>, <strong>, <span>
  <li>, <input>, <button>
```