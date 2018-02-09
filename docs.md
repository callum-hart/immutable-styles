# Immutable Styles for CSS

## What

- Immutable styles cannot change once created.
- A style that is immutable **cannot be overridden**.
- Immutable styles lead to simpler development since they make CSS predictable and deterministic.
- This reduces time spent coordinating overrides and troubleshooting the side-effects of cascade, specificity and importance.

## How

- Immutable styles have the same data structure as the DOM - a tree.
- Styles as functions that can be mapped to JSX.
- Compiled to CSS (version 2.1+).

## Example

```jsx
<p>
 font-family: "Operator Mono";
 font-size: 15px;
</p>
```

Compiles to:

```css
p:not([class]) {
 font-family: "Operator Mono";
 font-size: 15px;
}
```

If we tried to mutate (override) the `font-size`:

```jsx
<div className="parent">
 <p>
  font-size: 16px;
 </p>
</div>
```

We would get the compile time error:

```
[Override Found] "div.parent p" overrides the "font-size" set by "p"

Overidden styles ("p"):

  font-family: "Operator Mono";
  font-size: 15px;

Overriding styles ("div.parent p"):

  font-size: 16px;

The "font-size" of "p" cannot be overridden
```

## Why

- Overrides = Mutation
- Issues with overrides:
	- **Unpredictable** No guarantee who "winning style" is. Overrides rely on cascade, specicifity and importance - all of which are vunerable to change.
	- **Brittle** Changes bring unforeseen and unwanted side-effects. Re-ordering rules in the cascade, modifying selector specificity, adding/removing !important can break things.
	- **Difficult to contain** Global scope permits anyone to override, whilst a lack of encapsulation dampens efforts to protect styles from being overridden.
	- **Hard to troubleshoot** Overrides operate globally which means their side effects aren't always immediately apparent.
	- **No escape** It’s hard to escape an overriding system. There is a direct correlation between the number of overrides and the time/energy spent managing them.
	- **Deadcode** Overrides make it hard to differentiate between styles that are actually used and those that are redundant.
	- **Self-perpetuating** The more overrides exist the more overriding you do
- The mutable (overriding) nature of CSS means we cannot confidently make changes.
- Immutable styles is an attempt to remove overrides from CSS.

## Usage

TODO:

- Install
- ImmutableStyles entry point
- Usage with JSX

## API

### `createStyle`
**createStyle(element, attrs, ...children)**

- `element` HTML tag name
- `attrs` attribute(s) if any
- `children` styles and/or child element(s) if any

Create and return a new immutable style. Styles written in JSX are converted to `ImmutableStyles.createStyle(element, attrs, ...children)`.

### `createCSS`
**createCSS(styles)**

- `styles` result returned from `ImmutableStyles.createStyle`

Generate CSS from the AST returned from `ImmutableStyles.createStyle`.

### Attrs

Attributes are optional. An element can have zero or more attributes. Available attributes are:

- **`className`** CSS class of a given element
- **`minWidth`** Pixel value of the `min-width` a style should apply
- **`maxWidth`** Pixel value of the `max-width` a style should apply
- **`pseudo`** Pseudo class(es) and/or pseudo element(s)

## Single Inheritance Model

Usually CSS overrides are used to allow styles to be reused and repurposed across similar but not identical interfaces. In order to achieve the same effect without overrides Immutable Styles implements a single inheritance model. This allows a style to acquire the properties from another style, for example:

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

Generates:

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
- This also works with nested elements:

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

Generates:

```css
form[class="form"] > span[class="form__error"] {
  display: none;
}

form[class="form form--withError"] > span[class="form__error"] {
  display: block /* (original value: none) */;
  color: indianred;
}
```

### Compile-time Errors

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

- Immutable styles uses [Jest](https://facebook.github.io/jest/) for testing.
- Tests are located in the `tests` folder.
- Run tests with `npm test`.

## Tradeoffs / Implementation Details

In order to achieve no overrides there are some tradeoffs - some of which may feel unatural, and the rationale not immediately apparent. Each tradeoff is documented below explaining what it is, and why it exists. It should be noted that tradeoffs are subject to change, if a better solution is found.



	- Element != element with class
	- Class is matched via attributte selector
	- Cannot use IDs for styling
	- All child nodes are targeted with combinator selector (<)
	- Inheritable properties

- Prerequisite: concept of [discrete breakpoints]()


