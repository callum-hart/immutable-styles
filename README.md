<h1 align="center"><img src="logo.png" /><br>Immutable Styles</h1>
<p align="center">
  <b>A JavaScript library for styling web interfaces with a focus on predictability and robustness. It uses immutability to remove side effects often tied to CSS.</b>
</p>
<p align="center">
  <sub>
    <a href="">Link One</a> |
    <a href="">Link Two</a> |
    <b>Active Link</b> |
    <a href="">Link Four</a>
  </sub>
</p>

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

**Returns:** An AST representing Immutable Styles.

#### createCSS `createCSS(styles)`

Takes the Immutable Styles AST returned from `createStyle` and turns it into CSS.

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

All together now:

```js
// Define Immutable Styles
const styles = [
 createStyle(
  "p",
  null,
  "color: cadetblue;"
 ),
 createStyle(
  "button",
  {
   className: "btn",
   pseudo: ":hover"
  },
  "opacity: 0.75;"
 )
]

// Generate CSS
const CSS = createCSS(styles);
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
  `padding: 10px 20px; ${borderRadius(4px)}`
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

Dot notation is used to indicate that a subclass extends a superclass (`className: <superclass>.<subclass>`). In the following examples each subclass will extend `baseForm`.

A subclass inherits all styles from its superclass:

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

A subclass can define its own styles which get merged with the styles it inherits:

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

A subclass can redefine any styles it inherits from its superclass:

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

- Immutable Styles are compiled
- CSS is only generated if the compiler doesn't find any errors.
- The different compile time errors are documented [here]().

### FAQ

### Roadmap

### Licence
