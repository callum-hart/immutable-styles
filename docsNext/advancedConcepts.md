# Advanced Concepts

🚫 Partial Overrides
📱 Discrete Breakpoints
👪 Strict CSS Inheritance (use what-the-font netflix screenshot as example)
🕵🏻 Duplicate Property Detection
⛱️ Runtime Override Protection
🏫 Strict Type Selectors
🗿 Immutable Mixins (sharing styles, modifier classes)

## Partial Overrides

A partial override occurs when two or more rulesets containing related, but not *identical* declarations target the same element. This happens when a shorthand property overrides a longhand property – or visa versa:

```jsx
1| <img className="gravatar">
2|  border: 1px solid gainsboro;
3| </img>,
4|
5| <div className="feed">
6|  <img className="gravatar">
7|    border-left-color: tomato;
8|  </img>
9| </div>
```

In the example above the first ruleset uses the `border` shorthand property (line 2) which translated to computed styles results in:

```css
border-top-width: 1px;
border-top-style: solid;
border-top-color: gainsboro;
border-right-width: 1px;
border-right-style: solid;
border-right-color: gainsboro;
border-bottom-width: 1px;
border-bottom-style: solid;
border-bottom-color: gainsboro;
border-left-width: 1px;
border-left-style: solid;
border-left-color: gainsboro;
```

The second ruleset applies a `border-left-color` of `tomato` (line 7) however the left border colour of the gravatar has already been defined (with the colour `gainsboro`) and cannot be overriden. Immutable styles detects the partial override and throws the following compile time error:

```
[Partial Override Found]

The property `border` is defined here:
  /Users/callum-hart/Desktop/testingISS/src/beginnerTutorial/RestaurantCard.iss.jsx:6:5

  5 |   <img className="gravatar">
> 6 |     border: 1px solid gainsboro;
          ^^^^^^

Which is overridden by `border-left-color`:
  /Users/callum-hart/Desktop/testingISS/src/beginnerTutorial/RestaurantCard.iss.jsx:11:7

  10 |     <img className="gravatar">
> 11 |       border-left-color: tomato;
             ^^^^^^^^^^^^^^^^^

The first occurrence is overridden by the second.
```

## Discrete Breakpoints

Discrete breakpoints are a design pattern that ensure styles in one media query do not override styles in another media query. This means two or more media queries cannot overlap if they contain rulesets that override each other. The rationale behind this is best illustrated using regular CSS:

```css
@media (min-width: 500px) {
  a.logo {
    font-size: 16px;
  }
}

@media (min-width: 1000px) {
  a.logo {
    font-size: 18px;
  }
}
```

In the example above the media queries rely on their position in the cascade to produce the expected behaviour – with the last in the cascade taking effect. On screens wider than 1000px the bottom ruleset overrides the other, so the `font-size` of `a.logo` will be 18px.

Reshuffling the order of the rulesets produces a different result:

```css
@media (min-width: 1000px) {
  a.logo {
    font-size: 18px;
  }
}

@media (min-width: 500px) {
  a.logo {
    font-size: 16px;
  }
}
```

Once again the last ruleset in the cascade takes effect, and on screens wider than 1000px the `font-size` of `a.logo` will be 16px. Unintuitively it is the **cascade and not the breakpoint size** that determines the `font-size` of the logo.

Media queries are also dependant on specificity:

```css
nav a.logo {
  font-size: 14px;
}

@media (min-width: 1000px) {
  a.logo {
    font-size: 18px;
  }
}

@media (min-width: 500px) {
  a.logo {
    font-size: 16px;
  }
}
```

In the example above the ruleset with the strongest specificity out-competes the others, regardless of their position in the cascade or breakpoint size. On all screen-sizes the `font-size` of `a.logo` will be 14px, since `nav a.logo` has the highest specificity.

<center>*</center>

Discrete breakpoints remove the dependency media queries have on cascade and specificity. In immutable styles the compiler identifies any overlapping media queries, and then checks if they contain any overriding rulesets.

The equivalent immutable ruleset would be:

```jsx
<a className="logo" minWidth="500">
  font-size: 16px;
</a>,

<a className="logo" minWidth="1000">
  font-size: 16px;
</a>
```

Which throws a compile time error, since on screens wider than 1000px the logos `font-size` is applied twice:

```
[Override Found]

The property `font-size` is defined here:
  /Users/callum-hart/Desktop/testingISS/src/beginnerTutorial/RestaurantCard.iss.jsx:6:5

  5 |   <a className="logo" minWidth="500">
> 6 |     font-size: 16px;
          ^^^^^^^^^

And again here:
  /Users/callum-hart/Desktop/testingISS/src/beginnerTutorial/RestaurantCard.iss.jsx:10:5

  9 |   <a className="logo" minWidth="1000">
> 10 |     font-size: 16px;
           ^^^^^^^^^

The first occurrence is overridden by the second.
```

The solution is to partition the media queries into distinct ranges:

```jsx
<a className="logo" minWidth="500" maxWidth="999">
  font-size: 16px;
</a>,

<a className="logo" minWidth="1000">
  font-size: 16px;
</a>
```

With the media queries no longer overlapping...
