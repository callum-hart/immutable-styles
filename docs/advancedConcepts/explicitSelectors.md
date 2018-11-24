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
<button className="btn-primary.disabled">
  background: cornflowerblue;
  pointer-events: none;
  opacity: 0.8;
</button>
```

The ruleset above uses a *modifier class* to explicitly target elements of type `button` with the classes `btn-primary disabled`.

> 💡Note: you may have noticed the same `background` declaration is defined in both the `btn-primary` and `btn-primary disabled` rulesets. Immutable styles provides ways to share styles accross similar rulesets, however these fall out of scope of explicit selectors.

## Nested Rulesets

Explicit selectors also apply to nested rulesets:

```jsx
<nav>
  <a>
    font-size: 14px;
  </a>
</a>
```

In the example above the ruleset only targets elements of type `a` that are the immediate children of elements of type `nav`. This is the equivalant of a *child combinator (A > B)* selector in CSS.

In immutable styles all nested rulesets equate to child combinators in CSS. Child combinators offer several advantages over the less strict *decendant selectors (A B)* in several ways.

Firstly, the behaviour of child combinators is highly predictable. It is very easy to identify who the target elements are and who the target elements are not. The structure of the *immutable* ruleset mirrors that of the target HTML.

Secondly, child combinators narrow the scope of who their target elements are. This helps prevent poorly scoped selectors targeting unwanted elements, or clashing with other selectors, which prevents intensional and unintensional overrides.