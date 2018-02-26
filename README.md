# Immutable Styles for CSS

## What

Immutable styles cannot change once created. A style that is immutable **can never be overridden**. Immutability leads to simpler development since it makes CSS **predictable** and **deterministic**. This reduces time spent coordinating overrides, and troubleshooting the side effects of cascade, specificity and importance.

## Why

Parallels can be drawn between mutable state in programs and overrides in CSS. The mutable *(overriding)* nature of CSS means we cannot confidently make changes. CSS overrides suffer from the following:

- **Unpredictable** No guarantee who "winning style" is. Overrides rely on cascade, specificity and importance - all of which are *vulnerable* to change.
- **Volatile** The longevity of an override is unknown. Just because a style wins today doesn’t mean it always will.
- **Brittle** Changes bring unforeseen and unwanted side effects. Re-ordering rules in the cascade, modifying selector specificity, adding or removing !important can break things.
- **Difficult to Contain** Global scope permits anyone to override, whilst a lack of encapsulation dampens efforts to protect styles from being overridden.
- **Hard to Troubleshoot** Side effects aren't always immediately apparent.
- **Obfuscate Developer Intent** It’s hard to differentiate between an intentional and unintentional override - which can be left to interpretation.
- **No Escape** It’s hard to escape an overriding system. There is a correlation between the number of overrides and the time/energy spent managing them.
- **Self-perpetuating** The more overrides exist the more overriding you need to do.
- **Hard to Scale** Overrides appear harmless at first but become challenging to manage at scale.

Immutable Styles is an attempt to **remove overrides** (and thus complexity) from CSS.

Futher reading: [The End of CSS Overrides?](http://www.callumhart.com/blog/the-end-of-css-overrides).

## How

Immutable Styles...

- Use the same data structure as the DOM - a **tree**.
- Are written as **functions** that *can* be mapped to JSX.
- Are compiled to CSS version 2.1 and up :v:
- Are **markup agnostic** so work with any templating/view library (React, Angular, Vue, Plain ol'HTML).

## Example

```js
const im = require('immutable-styles');

const styles = [
 im.createStyle(
  'p',
   {
    className: 'foo'
   },
   'color: cadetblue;'
  )
];

const CSS = im.createCSS(styles);
```

The `color` of `p.foo` is immutable meaning it cannot change (be overridden). Any attempt to mutate (override) the `color` is not allowed:

```diff
const styles = [
 im.createStyle(
  'p',
  {
   className: 'foo'
  },
  'color: cadetblue;'
 ),
+im.createStyle(
+ 'div',
+ null,
+ im.createStyle(
+  'p',
+  {
+   className: 'foo'
+  },
+  'color: transparent /* attempted override */;'
+ )
+)
];
```

Throws the compile-time error:

```
[Override Found] "div p.foo" overrides the "color" set by "p.foo"

Overridden styles ("p.foo"):

  color: cadetblue;

Overriding styles ("div p.foo"):

  color: transparent /* attempted override */;

The "color" of "p.foo" cannot be overridden
```

**JSX**

Immutable Styles can be written using JSX - which provides syntax sugar for calling `ImmutableStyles.createStyle(element, attrs, ...children)`. The example above re-written in JSX looks like:


```jsx
<p className="foo">
 font-size: 14px;
</p>,

<div className="bar">
 <p className="foo">
  font-size: 10px;
 </p>
</div>
```

## Getting Started

Install from npm:

`npm i immutable-styles`

*Optionally* map `ImmutableStyles` to JSX. I recommend the babel plugin [`transform-react-jsx`](https://www.npmjs.com/package/babel-plugin-transform-react-jsx):

```js
{
 "plugins": [
  ["transform-react-jsx", {
   "pragma": "ImmutableStyles.createStyle"
  }]
 ]
}
```

Include `ImmutableStyles` module in your JavaScript or JSX file:

```jsx
const ImmutableStyles = require('immutable-styles');

const styles = [
 <nav>
  display: flex;
  align-items: center;

  <img className="nav__icon">
   padding: 5px;
  </img>

  <div className="nav__links">
   justify-content: flex-end;
  </div>
 </nav>
]

const result = ImmutableStyles.createCSS(styles);
```

## API

### `ImmutableStyles.createStyle(element, attrs, ...children)`

Create and return a new immutable style.

- **`element`** HTML tag name `String`
- **`attrs`** attribute(s) if any `Object|null`
- **`children`** styles and/or child element(s) if any `String|Object`

```js
const styles = [
 ImmutableStyles.createStyle(
  'span',
  null,
  'color: cadetblue;'
 )
]
```

### `ImmutableStyles.createCSS(styles)`

Convert immutable styles to CSS.

- **`styles`** result returned from `ImmutableStyles.createStyle`

```js
const result = ImmutableStyles.createCSS(styles);
```

### Attrs

Attributes are optional. An element can have zero or more attributes. Available attributes are:

- **`className`** CSS class for a given element
- **`minWidth`** Minimum size style(s) should apply (px)
- **`maxWidth`** Maximum size style(s) should apply (px)
- **`pseudo`** Pseudo class(es) and/or pseudo element(s)

## Tests

Run all tests with:

```
npm test
```

Or run a specific test with:

```
npm test singleInheritance.test.js
```

## Licence

[MIT](https://github.com/callum-hart/immutable-styles/blob/master/LICENSE)

Copyright (c) 2018-present, Callum Hart