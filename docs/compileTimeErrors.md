# Compile Time Errors

Immutable styles ships with a friendly compiler that helps assist development, rather than bark at you. If the compiler finds an error, such as a CSS override the compilation process is terminated and an error is thrown. Each error is documented below including the problem code and the error thrown.

## Invalid Attribute

When an invalid attribute is used.

```jsx
<p foo="invalidAttr">
  font-size: 20px;
</p>
```

The ruleset above throws an "Invalid Attribute" compile time error:

<p align="center">
  <img src="../docs/_images/UnknownAttribute.png"
    width="780px"
    height="241px"
  />
</p>

## Duplicate Property

When a CSS property is defined more than once in same block.

```jsx
<h1 className="title">
  color: darkslategray;
  font-size: 20px;
  color: burlywood;
</h1>
```

The ruleset above throws a "Duplicate Property" compile time error:

<p align="center">
  <img src="../docs/_images/DuplicateCSSProperty.png"
    width="780px"
    height="307px"
  />
</p>

## Override Found

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

The rulesets above throws an "Override Found" compile time error:

<p align="center">
  <img src="../docs/_images/ExactOverrideFound.png"
    width="785px"
    height="359px"
  />
</p>

## Partial Override Found

When one style partially overrides another style.

```jsx
<dl className="address">
  margin: 20px 10px;
</dl>,

<footer>
  <dl className="address">
    margin-left: 20px;
  </dl>
</footer>
```

The rulesets above throws a "Partial Override Found" compile time error:

<p align="center">
  <img src="../docs/_images/PartialOverrideFound.png"
    width="785px"
    height="340px"
  />
</p>

## Nested Media Query

When a media query is nested inside another media query.

```jsx
<footer minWidth="900">
  padding: 0 30px;

  <p minWidth="300">
    font-size: 1rem;
  </p>
</footer>
```

The ruleset above throws a "Nested Media Query" compile time error:

<p align="center">
  <img src="../docs/_images/NestedMediaQuery.png"
    width="785px"
    height="306px"
  />
</p>

## Element Property Mismatch

When an inheritable property is used by an invalid element type.

```jsx
<div>
  font-size: 1.4rem;
</div>
```

The ruleset above throws a "Element Property Mismatch" compile time error:

<p align="center">
  <img src="../docs/_images/ElementPropertyMismatch.png"
    width="785px"
    height="299px"
  />
</p>

*See [Strict Inheritance](advancedConcepts/strictInheritance.md) for more details.*