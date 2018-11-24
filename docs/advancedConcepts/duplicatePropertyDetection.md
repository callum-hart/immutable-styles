# Duplicate Property Detection

Duplicate property detection prevents overrides from happening within the same ruleset. Overrides of this nature are generally more accidental than intensional, for example:

```jsx
<section className="hero">
  background: ivory;
  display: flex;
  background: coral;
</section>
```

In the example above the `background` property has been defined twice in the same ruleset. A compile time error catches the duplicate property and throws the following:

*DuplicateCSSPropertyTwo.png*

<center>*</center>

It should be noted that if a property *partially overrides* another property in the *same ruleset* a partial override error is thrown:

```jsx
<h1 className="heading">
  margin: 0px;
  color: dimgray;
  margin-bottom: 10px;
</h1>
```

In the example above both `margin` and `margin-bottom` have been used. Since the longhand property `margin-bottom` overrides the shorthand property `margin` a partial override error is thrown:

*PartialOverrideFoundTwo.png*

More information on partial overrides can be [found here]().