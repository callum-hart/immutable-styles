# Immutable Styles for CSS

## What

- Immutable styles cannot change once created.
- A style that is immutable cannot be overridden.
- Immutability leads to much simpler development since it makes CSS predictable and deterministic.
- Reduces time spent coordinating overrides and troubleshooting the side-effects of cascade, specificity and importance.

## How

- Immutable styles have the same data structure as the DOM - a tree.
- Styles as functions that can be mapped to JSX.
- Compiled to CSS (version 2.1+).
- Example:

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

- If we tried to mutate (override) the `font-size`:

```jsx
<div className="parent">
	<p>
		font-size: 16px;
	</p>
</div>
```

- We would get the compile time error:

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
	- **Deadcode** Keeping track of the styles that override versus the styles that are overridden is laborious, which can lead to redundant styles.
	- **Self-perpetuating** The more overrides exist the more overriding you do
- The mutable (overriding) nature of CSS means we cannot confidently make changes.
- Immutable styles is an attempt to remove overrides from CSS.

## Getting Started

- TODO

## API

- createStyle
- createCSS
- Attrs
	- className 
	- minWidth 
	- maxWidth 
	- pseudo

### Errors

- Unkown Attribute
- Override Found
- Nested Media Query
- Unkown Base Class
- Duplicate CSS Property
- Element Property Mismatch

## Extends (Single inheritance)

- TODO

## Gotchas

 - Element != element with class
 - Cannot use IDs for styling
 - Discrete vs indiscrete media queries
 - Child nodes use child combinator selector (<)
 - Inheritable properties




