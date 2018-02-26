## Compile-time Errors

### :warning: Unknown Attribute

When an unknown attribute is found, for example:

```jsx
<p foo="invalidAttr">
 font-size: 20px;
</p>
```

Throws:

```
[Unknown Attribute] "foo" is not a valid attribute

Occurrence found:

  foo="invalidAttr"

Only the following attributes are permitted:

  className, minWidth, maxWidth, pseudo
```

### :warning: Duplicate CSS Property

When a CSS property is defined more than once in same block.

```jsx
<h1 className="title">
 color: darkslategray;
 font-size: 20px;
 color: burlywood;
</h1>
```

Throws:

```
[Duplicate CSS Property] The property "color" has been defined more than once by "h1.title"

  color: darkslategray;
  font-size: 20px;
  color: burlywood;
```

### :warning: Override Found

When one style overrides another style.

```jsx
<p className="child">
 color: darksalmon;
</p>,

<div className="parent">
 <p className="child">
  font-size: 10px;
  color: lightsalmon;
 </p>
</div>
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

### :warning: Nested Media Query

When a media query is nested inside another media query.

```jsx
<footer minWidth="900">
 padding: 0 30px;
 <p minWidth="300">
  font-size: 12px;
 </p>
</footer>
```

Throws:

```
[Nested Media Query] Nested media query found in "footer"

Outer media query ("footer"):

  min-width of 900

Inner media query ("footer p"):

  min-width of 300
```

### :warning: Unknown Base Class

When a subclass extends a superclass that hasn't been defined.

```jsx
<div className="baseClass.subClass">
 padding: 30px;
</div>
```

Throws:

```
[Unknown Base Class] The base class "div.baseClass" does not exist

Occurrence found:

  "div.baseClass.subClass"
```

### :warning: Element Property Mismatch

When an element uses a whitelisted CSS property.

```jsx
<div>
 font-size: 20px;
</div>
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