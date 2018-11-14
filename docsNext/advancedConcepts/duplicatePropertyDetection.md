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

```
[Duplicate Property]
  /Users/callum-hart/Desktop/testingISS/src/beginnerTutorial/RestaurantCard.iss.jsx:8:5

The property `background` has been defined twice:

  5 |   <div>
> 6 |     background: ivory;
          ^^^^^^^^^^
  7 |     display: flex;
> 8 |     background: coral;
          ^^^^^^^^^^

The first occurrence is overridden by the second.

Hint: remove either one.
```

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

```
[Partial Override Found]

The property `margin` is defined here:
  /Users/callum-hart/Desktop/testingISS/src/beginnerTutorial/RestaurantCard.iss.jsx:6:5

  5 |   <h1 className="heading">
> 6 |     margin: 0px;
          ^^^^^^

Which is overridden by `margin-bottom`:
  /Users/callum-hart/Desktop/testingISS/src/beginnerTutorial/RestaurantCard.iss.jsx:8:5

  5 |   <h1 className="heading">
  6 |     margin: 0px;
  7 |     color: dimgray;
> 8 |     margin-bottom: 10px;
          ^^^^^^^^^^^^^

The first occurrence is overridden by the second.
```

More information on partial overrides can be [found here]().