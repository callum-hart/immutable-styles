<h1 align="center"><img src="./docs/logo.png" width="130px" height="135px" /><br>Immutable Styles</h1>
<p align="center">
  <b>A JavaScript library for styling web interfaces with a focus on predictability and robustness. It uses immutability to remove side effects often tied to CSS.</b>
</p>
<p align="center">
  <sub>
    <a href="">Install</a> |
    <a href="">Usage</a> |
    <a href="">Syntax</a> |
    <a href="">Features</a> |
    <a href="">Compile Time Errors</a> |
    <a href="">Single Inheritance Model</a> |
    <a href="">FAQ</a> |
    <a href="">Licence</a>
  </sub>
</p>

---

## What is Immutable Styles?

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

Those familiar with CSS will have heard the term "winning style"; in which CSS rules compete against one another. Importance, specificity and cascade decide which styles win via overrides.

Much of what makes CSS development difficult is ensuring the styles we want, win; and the styles we don’t want, lose. Anytime we edit a CSS file we risk changing the conditions that influence which override wins. This makes CSS incredibly fragile and unpredictable.

Overrides make CSS **fragile** since what they rely on (importance, specificity, and cascade) are all vulnerable to change. Changes to HTML structure and attributes (classes) can introduce previously non-existent overrides.

Overrides make CSS **unpredictable** because:

1. The global scope permits anyone to override.
2. The side effects aren’t immediately apparent (exaggerated by #1).
3. A lack of encapsulation dampens efforts to protect styles from being overridden.
4. The longevity of an override is unknown. Just because a style wins today doesn’t mean it always will.
5. They obfuscate developer intent. It’s hard to differentiate between an intentional and unintentional override (which can be left to interpretation).

Parallels can be drawn between mutable state in programs and overrides in CSS. When a style overrides another it mutates (changes) the value of the original style. Over recent years the front-end community has seen a huge shift towards removing mutable state in our applications - yet CSS has been left behind.

But why should the way we build applications be different to how we style them? We should unite construction with cosmetics. Immutable Styles is an attempt to remove mutation (a.k.a overrides) and thus complexity from CSS. You can read more on this topic in the blog post: [CSS Overrides: Friend or Foe?](http://www.callumhart.com/blog/css-overrides-friend-or-foe)

## Install

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

## Usage

Immutable Styles are written using functions. They are represented using the same data structure as the DOM - a tree. The library exposes two methods:

### createStyle

```
createStyle(element, attrs, ...children)
```

- **Description:**
  - Creates and returns the AST for an Immutable Style. This is the equivalent of a CSS rule-set.
- **Parameters:**
  - `element`: The HTML tag name, for example "div".
  - `attrs`: Attributes (if any), can be one of the following:
    - `className`: CSS class for the current element.
    - `minWidth`: Minimum width styles should apply.
    - `maxWidth`: Maximum width styles should apply.
    - `pseudo`: Pseudo classes and/or elements.
  - `children`: Styles for the current element and/or nested child elements.
- **Returns:**
  - An object representing the Immutable Styles AST.

### createCSS

```
createCSS(styles)
```

- **Description:**
  - Takes the object returned from `createStyle` and turns it into CSS.
- **Parameters:**
  - `styles`: The result returned from `createStyle`.
- **Returns:** Semantic CSS (version 2.1 and up).

## FAQ

### Why choose Immutable Styles over something more established?

The most popular CSS strategies around today share one thing in common:

They all **reduce overrides**.

[BEM](http://getbem.com/naming/) uses naming conventions to modularise CSS, leveraging name-spaces to encapsulate styles. [CSS Modules](https://github.com/css-modules/css-modules) implements local scope, where styles in one file cannot override styles in another. CSS-in-JS solutions such as [styled components](https://www.styled-components.com/) generate unique classes to avoid selectors clashing.

Despite the implementation differences each approach converges in regards to overrides; fewer overrides make CSS more robust and easier to maintain.

The theory behind Immutable Styles is: if fewer overrides are better, why override at all?

### Can I use Immutable Styles with React/AngularJS/Vue/Backbone/Elm/Clojure...?

Immutable Styles is markup agnostic, which means it isn’t coupled or biased to a specific way of generating HTML. Just like a CSS pre-processor Immutable Styles spits out CSS which can be used on any website, rendered server or client-side.

### Is Immutable Styles production ready?

Technically yes, but I think it needs better tooling first.

### Have any websites been built without overrides?

Yes. Immutable Styles evolved from an earlier open-source project of mine called [mono](). As part of monos R&D I built three proof of concept websites without any CSS overrides. You can see them [here](), [here]() and [here]().

### Can I Contribute?

YES. The project is very welcome to feedback, fresh perspectives, feature requests, pull requests, and of course, contributors 🙂

## Roadmap

- A CLI to generate CSS
- Integrations / plugins with build tools
- Seemless usage with JSX (`createStyle` can be mapped to JSX in the same way `createElement` does in React)
- Better error messages that include file & line number
- Allow modules to expose styles that can be changed at compile-time (similar to single inheritance model)
- Runtime validations during development
- `createCSS` should also accept an object (currently assumes param is always an array)

## Licence

[MIT](https://github.com/callum-hart/immutable-styles/blob/master/LICENSE)

Copyright (c) 2018-present, Callum Hart