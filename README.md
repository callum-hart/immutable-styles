<h1 align="center"><img src="./docs/logo.png" /><br>Immutable Styles</h1>
<p align="center">
  <b>A JavaScript library for styling web interfaces with a focus on predictability and robustness. It uses immutability to remove side effects often tied to CSS.</b>
</p>
<p align="center">
  <sub>
    <a href="">Link One</a> |
    <b>Active Link</b> |
    <a href="">Link Two</a>
  </sub>
</p>

---

### What is Immutable Styles?

Immutable Styles is a cross between a CSS pre-processor and a CSS in-JS library. Styles are written using JavaScript which are subsequently compiled to CSS. The library has 2 goals:

1. Make styles for the web **predictable**
2. Make styles for the web **robust**

If you have ever encountered styles that were neither expected nor desired you probably met a CSS side effect; most likely a consequence of:

- a) Selectors clashing with other selectors
- b) Selectors targeting unwanted elements
- c) Styles overriding other styles
- d) Elements inheriting undesirable styles

As the name suggests the library uses immutability to help remove these side effects. With Immutable Styles all CSS rules are immutable. An immutable style cannot change once created, which means it can **never** be overridden. This alone solves a, b and c (we will see the solution to d later).

## The case for Immutable Styles

Those familiar with CSS will have heard the term "winning style"; in which styles compete against one another. Much of what makes CSS development difficult is ensuring the styles we want: win, and the styles we don’t want: loose.

Overrides form the basis of "winning styles". CSS rules with the strongest specificity or endmost place in the cascade win. Anytime we edit a CSS file we risk changing the conditions that influence which overrides win. This makes CSS incredibly **fragile** and **unpredictable**.

Parallels can be drawn between mutable state in programs and overrides in CSS. When a style overrides another it mutates (changes) the value of the original style. Over recent years the front-end community has seen a huge shift towards removing mutable state in our applications - yet CSS has been left behind.

But why should the way we build applications be different to how we style them? We should unite construction with cosmetics. Immutable Styles is an attempt to remove mutation (a.k.a overrides) and thus complexity from CSS. You can read more on this topic in the blog post: [CSS Overrides: Friend or Foe?](http://www.callumhart.com/blog/css-overrides-friend-or-foe).

## Getting Started

### Install

Install Immutable Styles using npm:

```
npm install immutable-styles
```

Or with yarn:

```
yarn add immutable-styles
```

Then require it in any module:

```
const { createStyle, createCSS } = require('immutable-styles');
```

### Usage

Immutable Styles are written using functions. They are represented using the same data structure as the DOM - a tree. The library exposes two methods:

#### createStyle `createStyle(element, attrs, ...children)`

Creates and returns the AST for an Immutable Style. This is the equivalent of a CSS rule-set.

**Parameters:**

**`element`** The HTML tag name, for example "div".

**`attrs`** Attributes if any, can be one of the following:

- `className` CSS class for the current element.
- `minWidth` Minimum width styles should apply. `minWidth: 900` is the equivalent of the CSS media query: `@media (min-width: 900px)`
- `maxWidth` Maximum width styles should apply. `maxWidth: 600` is the equivalent of the CSS media query: `@media (max-width: 600)`
- `pseudo` Pseudo classes and/or elements. `pseudo: ":hover"` is the equivalent of the psuedo selector: `:hover`

**`children`** Styles for the current element and/or nested child elements.

**Returns:** A object representing the Immutable Styles AST.

#### createCSS `createCSS(styles)`

Takes the object returned from `createStyle` and turns it into CSS.

**Parameters:**

**`styles`** The result returned from `createStyle`.

**Returns:** Semantic CSS (version 2.1 and up).

### Syntax

A simple rule-set:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "p",                     | p {
 null,                    |  color: cadetblue;
 "color: cadetblue;"      | }
)                         |
                          |
--------------------------------------------------------
```

A rule-set with attributtes:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "button",                | button.btn:hover {
 {                        |  opacity: 0.75;
   className: "btn",      | }
   pseudo: ":hover"       |
 },                       |
 "opacity: 0.75;"         |
)                         |
                          |
--------------------------------------------------------
```

A rule-set with child element:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "section",               | section.row {
 {                        |  display: flex;
  className: "row"        | }
 },                       |
 "display: flex;",        | section.row div.col {
 createStyle(             |  flex: 1;
  "div",                  | }
  {                       |
    className: "col"      |
  },                      |
  "flex: 1;"              |
 )                        |
)                         |
                          |
--------------------------------------------------------
```

A rule-set with media query:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "h1",                    | @media (max-width:680px) {
 {                        |  h1 {
  maxWidth: 680           |   font-size: 1.6em;
 },                       |  }
 "font-size: 1.6em;"      | }
)                         |
                          |
--------------------------------------------------------
```

### Features

Since Immutable Styles is just JavaScript we get the niceties of CSS pre-processors for free. Leveraging ES6 template literals enables variables, detached rule-sets, mixins, and theming with little to no extra cost.

#### Variables

```js
const brandColor = "#58CCFA";

createStyle(
 "nav",
 null,
 `background: ${brandColor};`
)

```

#### Detached Rule-sets

```js
const mediumFont = `
  font-family: "Operator Mono";
  font-weight: 600;
  font-size: 2.1rem;
`;

createStyle(
  "h2",
  {
    className: "title"
  },
  mediumFont
)
```

#### Mixins

```js
function borderRadius(radius) {
  return `
    -webkit-border-radius: ${radius};
       -moz-border-radius: ${radius};
            border-radius: ${radius};
  `;
}

createStyle(
  "button",
  null,
  `padding: 10px 20px; ${borderRadius('4px')}`
)
```

#### Themes

```js
const ACTIVE_THEME = "light";
const colorMap = {
  light: {
    appBackground: "FFFFFF"
  },
  dark: {
    appBackground: "#111111"
  }
}

createStyle(
  "main",
  {
    className: "app"
  },
  `background: ${colorMap[ACTIVE_THEME].appBackground};`
)
```

If Immutable Styles were compiled server-side - and of course architecture permitting - additional features such as: conditional styles based on experiments, styles specific to locale, and even styles based on different component versioning would be possible.

### Single Inheritance Model

Usually CSS overrides are used to allow styles to be reused and repurposed across similar but not identical interfaces. In order to achieve the same effect without permitting overrides Immutable Styles implements a **[single inheritance model](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)#Types)**. This allows a style to acquire the properties from another style, where the subclass inherits all styles from its superclass.

Superclasses look like any other Immutable Style:

```js
createStyle(
  "form",
  {
    className: "baseForm"
  },
  `padding: 20px;
  background: ivory;
  border: 1px solid lightgray;`
)
```

Dot notation is used to indicate that a subclass extends a superclass (`className: <superclass>.<subclass>`). In the following examples each subclass extends `baseForm`.

A subclass **inherits all styles** from its superclass:

```
------------------------------------------------------------------------
Subclass                              | Applied Styles
------------------------------------------------------------------------
                                      |
createStyle(                          | /* inherited styles */
  "form",                             | padding: 20px
  {                                   | background: ivory
    className: "baseForm.loginForm"   | border: 1px solid lightgray
  }                                   |
)                                     |
                                      |
------------------------------------------------------------------------
```

A subclass can **define its own styles** which get merged with the styles it inherits:

```
------------------------------------------------------------------------
Subclass                              | Applied Styles
------------------------------------------------------------------------
                                      |
createStyle(                          | /* inherited styles */
  "form",                             | padding: 20px
  {                                   | background: ivory
    className: "baseForm.loginForm"   | border: 1px solid lightgray
  },                                  | /* own styles */
  `width: 60%;                        | width: 60%
  display: block;                     | display: block
  margin: 0 auto;                     | margin: 0 auto
  border-radius: 4px;`                | border-radius: 4px
)                                     |
                                      |
------------------------------------------------------------------------
```

A subclass can **redefine any styles it inherits** from its superclass:

```
------------------------------------------------------------------------
Subclass                              | Applied Styles
------------------------------------------------------------------------
                                      |
createStyle(                          | /* inherited styles */
  "form",                             | padding: 20px
  {                                   | border: 1px solid lightgray
    className: "baseForm.loginForm"   |
  },                                  | /* redefined styles */
  'background: cornflowerblue;'       | background: cornflowerblue
)                                     |
                                      |
------------------------------------------------------------------------
```

### Compile Time Errors

Immutable Styles are compiled from JavaScript to CSS (using the method [`createCSS`]()). The library ships with a friendly compiler that helps assist development, rather than bark at you. If the compiler finds an error, such as a CSS override the compilation process is terminated and an error is thrown.

Each error is documented below including the problem code and the error thrown.

#### Unknown Attribute

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

#### Duplicate CSS Property

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

#### Override Found

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

#### Nested Media Query

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

#### Unknown Base Class

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

#### Element Property Mismatch

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

### FAQ

#### Why choose Immutable Styles over something more established?

The most popular CSS strategies around today share one thing in common:

They all **reduce overrides**.

[BEM]() uses naming conventions to modularise CSS, leveraging name-spaces to encapsulate styles. [CSS Modules]() implements local scope, where styles in one file cannot override styles in another. CSS-in-JS solutions such as [styled components]() generate unique classes to avoid selectors clashing.

Despite the implementation differences each approach converges in regards to overrides; fewer overrides make CSS more robust and easier to maintain.

The theory behind Immutable Styles is: if fewer overrides are better, why override at all?

#### Can I use Immutable Styles with React/AngularJS/Vue/Backbone/Elm/Clojure...?

Immutable Styles is markup agnostic, which means it isn’t coupled or biased to a specific way of generating HTML. Just like a CSS pre-processor Immutable Styles spits out CSS which can be used on any website, rendered server or client-side.

#### Is Immutable Styles production ready?

Technically yes, but I think it needs better tooling first.

#### Have any websites been built without overrides?

Yes. Immutable Styles evolved from an earlier open-source project of mine called [mono](). As part of monos R&D I built three proof of concept websites without any CSS overrides. You can see them [here](), [here]() and [here]().

#### Can I Contribute?

YES. The project is very welcome to feedback, fresh perspectives, feature requests, pull requests, and of course, contributors 🙂

### Roadmap

- A CLI to generate CSS
- Integrations / plugins with build tools
- Seemless usage with JSX (`createStyle` can be mapped to JSX in the same way `createElement` is in React)
- Better error messages that include file & line number
- Allow modules to expose styles that can be changed at compile-time (similar to single inheritance model)
- Runtime validations during development
- `createCSS` should also accept an object (currently assumes param is always an array)

### Licence

[MIT]()

Copyright (c) 2018-present, Callum Hart
