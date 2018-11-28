# Typed Selectors

Typed selectors is a design pattern that ensures all CSS selectors include the element type. The rationale supporting this is best illustrated using a CSS example:

```css
.btn {
  font-family: "Operator Mono SSm";
  font-size: 14px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  background: cadetblue;
  color: ivory;
}
```

In the ruleset above the `.btn` class is obscure. We cannot guarantee who the consumers – the HTML elements that use the `.btn` class – will be.

This means we cannot confidently predict all elements using the `.btn` class will look the same. This is because we have no insight or control into what other styles (user agent, our own, 3rd party) the element with the class `.btn` will have.

In addition styles specific to a certain element type are bundled into the `.btn` class – and therefore applied to all consumers – which introduces unnecessary bloat (deadcode). In the example above `text-decoration: none;` is only required for elements of type `a` using the `.btn` class.

<center>*</center>

When selectors include the element type it's easier to make connection between the CSS and HTML:

```css
a.btn,
button.btn {
  font-family: "Operator Mono SSm";
  font-size: 14px;
  background: cadetblue;
  color: ivory;
}

a.btn {
  text-decoration: none;
}

button.btn {
  border: none;
  cursor: pointer;
}
```

From the CSS it's easy to identify what elements consume the `.btn` class – we can clearly see `.btn` is used by elements of type `a` or `button`.

This also makes it easier to separate reusable styles from those specific to a certain element type – `text-decoration: none;` is only needed by `a` so is moved out into a ruleset of its own.

Not only does this separate concerns – it helps organise styles into smaller, manageable, and distinct chunks. It's easy to identify where to add/remove styles for `a`. Better still if elements of type `a` stop consuming the `.btn` class safely removing styles specific to them is a breeze.

<center>*</center>

Typed selectors are baked into immutable styles by default. Since JSX requires an element type it is impossible to have an immutable ruleset without an element type.

The equivalant ruleset for the `btn` class would be:

```jsx
<button className="btn">
  font-family: "Operator Mono SSm";
  font-size: 14px;
  border: none;
  cursor: pointer;
  background: cadetblue;
  color: ivory;
</button>
```

One of the caveats of JSX is a tag can only have one element type. This means grouped CSS selecters (such as `a.btn, button.btn {}`) are not *possible*. However immutable styles provides an equivalent to grouped selectors via [detached rulesets]().
