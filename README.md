# Immutable Styles for CSS

## What

Immutable styles cannot change once created. A style that is immutable **cannot be overridden**. Immutability leads to simpler development since it makes CSS **predictable** and **deterministic**. This reduces time spent coordinating overrides and troubleshooting the side effects of cascade, specificity and importance.

## Why

Parallels can be drawn between mutable state in programs and overrides in CSS. The mutable *(overriding)* nature of CSS means we cannot confidently make changes. CSS overrides suffer from the following:

- **Unpredictable** No guarantee who "winning style" is. Overrides rely on cascade, specificity and importance - all of which are *vulnerable* to change.
- **Brittle** Changes bring unforeseen and unwanted side effects. Re-ordering rules in the cascade, modifying selector specificity, adding/removing !important can break things.
- **Difficult to Contain** Global scope permits anyone to override, whilst a lack of encapsulation dampens efforts to protect styles from being overridden.
- **Hard to Troubleshoot** Overrides operate globally which means their side effects aren't always immediately apparent.
- **No Escape** It’s hard to escape an overriding system. There is a direct correlation between the number of overrides and the time/energy spent managing them.
- **Dead Code** Overrides make it hard to differentiate between styles that are actually used and those that are redundant.
- **Self-perpetuating** The more overrides exist the more overriding you do.
- **Hard to Scale** Overrides appear harmless at first but become challenging to manage at scale.

Immutable Styles is an attempt to **remove overrides** (and thus complexity) from CSS.

## How

Immutable Styles use the same data structure as the DOM - a tree. Styles are written as **functions** that *can* be mapped to JSX. Immutable Styles are **markup agnostic** so work with any templating/view library, and are compatible with CSS version 2.1 and up :v:

## Example

```js
ImmutableStyles.createStyle(
 'p',
 {
  className: 'foo'
  },
 'font-size: 14px;'
)
```

Compiles to:

```css
p[class="foo"] {
 font-size: 14px;
}
```

The `font-size` of `p.foo` is immutable meaning it cannot change (be overridden). Any attempt to mutate (override) the `font-size` is not allowed:

```js
ImmutableStyles.createStyle(
 'div',
 {
  className: 'bar'
 },
 ImmutableStyles.createStyle(
  'p',
  {
   className: 'foo'
  },
  'font-size: 10px;'
 )
)
```

Throws the compile-time error:

```
[Override Found] "div.bar p.foo" overrides the "font-size" set by "p.foo"

Overridden styles ("p.foo"):

  font-size: 14px;

Overriding styles ("div.bar p.foo"):

  font-size: 10px;

The "font-size" of "p.foo" cannot be overridden
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

MIT(https://github.com/callum-hart/immutable-styles/blob/master/LICENSE)

Copyright (c) 2018-present, Callum Hart