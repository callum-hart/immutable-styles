# Explicit Selectors

All selectors in immutable styles are explicit. Explicit selectors only target elements that exactly match a given selector:

```jsx
<p>
  color: slategray;
</p>
```

In the example above the ruleset uses a type selector, which only targets elements of type `p` that *do not* have a class. The ruleset will not target elements of type `p` that do have a class. Immutable styles treat type selectors and selectors with a class as different selectors *even though* they target the same element type.

In a similar vien explicit selectors also apply to selectors with a class:

```jsx
<button className="btn-primary">
  background: cornflowerblue;
</button>
```

In the example above the ruleset only targets elements of type `button` that have the class `btn-primary`. The ruleset will not target elements of type `button` that combine the `btn-primary` class with another class:

```html
<!-- html -->

<button class="btn-primary disabled">
  Submit
</button>
```

The HTML element above will not recieve the styles defined by the `btn-primary` ruleset. Combining the `btn-primary` class with the `disabled` class represents a different UI state and therefore should be handled explicity by another ruleset:

```jsx
<button className="btn-primary disabled">
  background: cornflowerblue;
  pointer-events: none;
  opacity: 0.8;
</button>
```

The ruleset above uses a *modifier class* to explicitly target elements of type `button` with the classes `btn-primary disabled`.

> 💡Note: you may have noticed the same `background` declaration is defined in both the `btn-primary` and `btn-primary disabled` rulesets. Immutable styles provides ways to share styles accross similar rulesets, however these fall out of scope of explicit selectors.

<center>*</center>

Explicit selectors also apply to nested rulesets:

```jsx
<nav>
  <a>
    font-size: 14px;
  </a>
</a>
```

In the example above the ruleset only targets elements of type `a` (without a class) that have the parent element of type `nav` (also without a class).

- all nested rulesets equate to the `child combinator` (>) selector in CSS.
- child combinator are stricter than descendant selectors since they only target the immediate children.
- makes the behaviour of nested rulesets predictable
- decendant selectors are too broad and very sensitive to changes in HTML (for example)
- one to one mapping between structure of HTML and structure of immutable rulesets – predictable, deterministic. Look at structure of immutable rulesets and immediatley identify what the target HTML will be.
