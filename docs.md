# Immutable Styles for CSS

## Table of Contents

- [What](#what)
- [How](#how)
- [Example](#example)
- [Why](#why)
- [Usage](#usage)
- [API](#api)
- [Single Inheritance Model](#single-inheritance-model)
- [Compile-time Errors](#compile-time-errors)
- [Design Decisions / Tradeoffs](#design-decisions--tradeoffs)
- [Licence](#licence)

## What

- Immutable styles cannot change once created.
- A style that is immutable **cannot be overridden**.
- Immutability leads to simpler development since it makes CSS **predictable** and **deterministic**.
- This reduces time spent coordinating overrides and troubleshooting the side effects of cascade, specificity and importance.

## How

- Immutable styles use the same data structure as the DOM - a tree.
- Styles are written as functions that *can* be mapped to JSX.
- Compiled to CSS (version 2.1+).

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

The `font-size` of `p.foo` is immutable meaning it cannot change (be overridden). Any attempt to mutate (override) the `font-size`:

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

Overidden styles ("p.foo"):

  font-size: 14px;

Overriding styles ("div.bar p.foo"):

  font-size: 10px;

The "font-size" of "p.foo" cannot be overridden
```

**JSX**

- Immutable Styles can be written using JSX.
- Provides syntax sugar for calling `ImmutableStyles.createStyle(element, attrs, ...children)`.
- The example above re-written in JSX looks like:


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

## Why

Parallels can be drawn between mutable state in programs and overrides in CSS. The mutable *(overriding)* nature of CSS means we cannot confidently make changes. CSS overrides suffer from the following:

- **Unpredictable** No guarantee who "winning style" is. Overrides rely on cascade, specicifity and importance - all of which are *vunerable* to change.
- **Brittle** Changes bring unforeseen and unwanted side effects. Re-ordering rules in the cascade, modifying selector specificity, adding/removing !important can break things.
- **Difficult to contain** Global scope permits anyone to override, whilst a lack of encapsulation dampens efforts to protect styles from being overridden.
- **Hard to troubleshoot** Overrides operate globally which means their side effects aren't always immediately apparent.
- **No escape** It’s hard to escape an overriding system. There is a direct correlation between the number of overrides and the time/energy spent managing them.
- **Dead code** Overrides make it hard to differentiate between styles that are actually used and those that are redundant.
- **Self-perpetuating** The more overrides exist the more overriding you do.
- **Hard to scale** Overrides start innocently but at scale become challenging to manage.

Immutable Styles is an attempt to **remove overrides** (and thus complexity) from CSS.

## Usage

- Install *todo*
- *Optionally* map `ImmutableStyles` to JSX. Recommend the babel plugin [`transform-react-jsx`](https://www.npmjs.com/package/babel-plugin-transform-react-jsx):

```js
{
 "plugins": [
  ["transform-react-jsx", {
   "pragma": "ImmutableStyles.createStyle"
  }]
 ]
}
```

- Include `ImmutableStyles` module in your JavaScript or JSX file:

```jsx
const ImmutableStyles = require('immutableStyles');

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

- **Parameters:**
	- `element` HTML tag name
	- `attrs` attribute(s) if any
	- `children` styles and/or child element(s) if any

**Usage:** Create and return a new immutable style.

```js
const styles = [
	ImmutableStyle.createStyle(
		'span',
		null,
		'color: cadetblue;'
	)
]
```

### `ImmutableStyles.createCSS(styles)`

- **Parameters:**
	- `styles` result returned from `ImmutableStyles.createStyle`

**Usage:** Convert immutable styles to CSS.

```js
const result = ImmutableStyles.createCSS(styles);
```

### Attrs

Attributes are optional. An element can have zero or more attributes. Available attributes are:

- **`className`** CSS class for a given element
- **`minWidth`** Minimum size style(s) should apply (px)
- **`maxWidth`** Maximum size style(s) should apply (px)
- **[`pseudo`](https://github.com/callum-hart/immutable-styles/blob/master/tests/pseudoSelectors.test.js)** Pseudo class(es) and/or pseudo element(s)

## Single Inheritance Model

Usually CSS overrides are used to allow styles to be reused and repurposed across *similar* but not identical interfaces. In order to achieve the same effect without overrides Immutable Styles implements a single inheritance model. This allows a style to acquire the properties from another style (subclass inherits styles from superclass), for example:

```jsx
<form className="form">
 padding: 20px;
 background: ivory;
 border: 1px solid lightgray;
</form>,

<form className="form.form--withError">
 border: 1px solid lightcoral;
</form>
```

Generated CSS:

```css
form[class="form"] {
 padding: 20px;
 background: ivory;
 border: 1px solid lightgray;
}

form[class="form form--withError"] {
 padding: 20px;
 background: ivory;
 border: 1px solid lightcoral /* (original value: 1px solid lightgray) */;
}
```

- `form--withError` inherits the `padding` and `background` from `form`.
- `form--withError` overrides the `border` at compile-time not run-time.

This inheritance model also works with nested elements:

```jsx
<form className="form">
 <span className="form__error">
  display: none;
 </span>
</form>,

<form className="form.form--withError">
 <span className="form__error">
  display: block;
  color: indianred;
 </span>
</form>
```

Generated CSS:

```css
form[class="form"] > span[class="form__error"] {
  display: none;
}

form[class="form form--withError"] > span[class="form__error"] {
  display: block /* (original value: none) */;
  color: indianred;
}
```

## Compile-time Errors

### Unkown Attribute

When an unkown attribute is found, for example:

```jsx
<p foo="invalidAttr">
	font-size: 20px;
</p>
```

Throws:

```
[Unkown Attribute] "foo" is not a valid attribute

Occurrence found:

  foo="invalidAttr"

Only the following attributes are permitted:

  className, minWidth, maxWidth, pseudo
```

### Duplicate CSS Property

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

### Override Found

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

Overidden styles ("p.child"):

  color: darksalmon;

Overriding styles ("div.parent p.child"):

  font-size: 10px;
  color: lightsalmon;

The "color" of "p.child" cannot be overridden
```

### Nested Media Query

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

### Unkown Base Class

When a subclass extends a superclass that hasn't been defined.

```jsx
<div className="baseClass.subClass">
  padding: 30px;
</div>
```

Throws:

```
[Unkown Base Class] The base class "div.baseClass" does not exist

Occurrence found:

  "div.baseClass.subClass"
```

### Element Property Mismatch

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

## Tests

Run all tests with:

```
npm test
```

Or run a specific test with:

```
npm test singleInheritance.test.js
```

## Design Decisions / Tradeoffs

In order to achieve no overrides there are some tradeoffs, some of which may feel unatural - and the rationale not immediately apparent. Each tradeoff is documented below explaining *what* it is, *why* it exists and the *problem* it solves. It should be noted that tradeoffs are subject to change if and when a better solution is found.

Alot of the design decisions make CSS resilient to changes in HTML. This means changes in HTML (structure/attributes) should not introduce unforeseen overrides.

### Class Selectors

**What**

- All classes are matched via *exact* attribute selectors `[class=className]`

**Why**

- Prevent overrides when an element uses multiple classes containing competing styles.

**Problem**

```html
<p class="foo">...</p>
<p class="bar">...</p>
```

```css
p.foo {
	color: black;
}

p.bar {
	color: red;
}
```

- Cannot guarantee the color of `p.foo` will always be `black`.
- Current example assumes paragraphs will never use both classes `foo bar`.

```html
<p class="foo bar">...</p>
```

- Override introduced when both classes are used.

**Solution**

- To counter this Immutable Styles treats `foo` and `bar` as distinct values - the generated CSS for this example is:

```css
p[class="foo"] {
  color: black;
}

p[class="bar"] {
  color: red;
}
```

### Child Selectors

**What**

- All child nodes are matched via *direct* child selectors `A < B`.

**Why**

- Structure of HTML is an unkown.
- Prevent overrides when nested HTML structures contain competing styles.

**Problem**

```html
<div>
 <p>...</p>
</div>

<section>
 <p>...</p>
</section>
```

```css
div p {
	color: black;
}

section p {
	color: red
}
```

- Cannot guarantee the color of `p.foo` will always be `black`.
- Current example assumes paragraphs are only nested within `div` **or** `section`.

```diff
<div>
 <p>...</p>
+ <section>
+  <p>...</p>
+ </section>
</div>
```

- Override introduced when a paragraph is nested within `div` **and** `section`.

**Solution**

- To counter this Immutable Styles treats all child nodes as direct children - the generated CSS for this example is:

```css
div:not([class]) > p:not([class]) {
  color: black;
}
section:not([class]) > p:not([class]) {
  color: red;
}
```

### Element Equality

**What**

- Element != element (of same type) with a class.
- For example `span` and `span.icon` are treated disparate despite sharing the same HTML tag.
- This means styles applied to `span` are not applied to `span.icon`.

**Why**

- If elements (of same type) were treated equally overrides *could* go undetected.
- Cannot determine what class(es) an element has/will have in HTML.

**Problem**

```html
<p class="foo">...</p>

<div class="bar">
 <p>...</p>
</div>
```

```css
p.foo {
	color: black;
}

div.bar p {
	color: red;
}
```

- Cannot guarantee the color of `p.foo` will always be `black`.
- Current example assumes paragraphs within `div.bar` will never use the class `foo`.

```diff
<div class="bar">
- <p>...</p>
+ <p class="foo">...</p>
</div>
```

- Override introduced when the class `foo` is added.
- The color of paragraphs within `div.bar` is nondeterministic.

**Solution**

- To counter this Immutable Styles treats `p` and `p.foo` differently - the generated CSS for this example is:

```css
p[class="foo"] {
  color: black;
}

div[class="bar"] > p:not([class]) {
  color: red;
}
```

### No ID Selectors

**What**

- Styles cannot be applied using ID selectors.
- Styles can only be applied using *element* type or class selectors.

**Why**

- ID selectors *could* sidestep override detection.

**Problem**

```html
<p class="foo">...</p>
<p id="bar">...</p>
```

```css
p.foo {
	color: black;
}

p#bar {
	color: red;
}
```

- Cannot guarantee the color of `p.foo` will always be `black`.
- Current example assumes paragraphs only have the class `.foo` **or** the ID `#bar`.

```diff
<p class="foo">...</p>
+<p class="foo" id="bar">...</p>
```

- Override introduced when paragraph has the class `.foo` **and** the ID `#bar`.

**Solution**

- Immutable Styles counters this by not supporting ID selectors.

### No Property Inheritance

**What**

- Inheritable properties cannot be used by parent elements.
- They can only be set by the elements that use them.

**Why**

- Cannot determine if an inherited style is overridden.

**Problem**

```html
<div class="foo">...</div>
```

```css
div.foo {
	color: black;
}

p.bar {
	color: red;
}
```

- Cannot guarantee the color of elements within `div.foo` will always be `black`.

```diff
<div class="bar">
+ <p class="foo">...</p>
</div>
```

- The color of `p.bar` overrides the color inherited from `div.foo`.

**Solution**

- Immutable Styles counters this by not supporting inheritable properties.

### Discrete Media Queries

**What**

- Styles in one media query cannot override styles in another media query.

**Why**

- Prevent overrides among media queries.
- Media queries should not rely on cascade/specificty to produce their expected behaviour.

**Problem**

```css
@media (min-width:300px) {
	p {
		color: black;
	}
}

@media (min-width:900px) {
	p {
		color: red;
	}
}
```

- Cannot guarantee the color of `p.foo` on screens wider than `300px` will always be `black`.
- The first media query is only effective until an implied max-width of 899px.
- On screens wider than `900px` the color of `p.foo` is overriden to `red`.

**Solution**

```diff
+@media (min-width:300px) and (max-width:899px) {
	p {
		color: black;
	}
}

@media (min-width:900px) {
	p {
		color: red;
	}
}
```

- Media queries containing competing styles should use discrete breakpoints to encapsulate styles (and thus prevent overrides).


## Licence

MIT License

Copyright (c) 2017-present, Callum Hart
