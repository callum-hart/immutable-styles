# The Basics

## Written using JSX

- Represented using a [Tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) data structure DONE
- Share the same structure as HTML DONE
- Written using JSX (like React). DONE
- Like React components, an Immutable Style can have props.
- To distinguish between JSX properties and CSS properties, the JSX props exposed by Immutable Styles are referred to as **attributes**.
- There are {N} attributtes: className, pseudo, minWidth, maxWidth, (extendFrom?, modifierFor?)
- 💡Note: Unlike React, the props are predefined by the library. User–defined props are  [forbidden]().
- 💡Note: Other than using JSX the similarites between React and Immutable Styles end there. Immutable Styles is only concerned with styling web interfaces, not building them.

---

### Data Structure

Immutable Styles are represented using a [Tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) – the same data structure as HTML – and are written using JSX (like React). Here is an immutable style in its simplest form:

```jsx
<h1>
  font-family: "Operator Mono";
  font-weight: 600;
  font-size: 2rem;
</h1>
```

The example above is the equivalant of a CSS rule-set. It consists of a *selector* – in this case the `h1` tag, and contains three CSS declarations: `font-family`, `font-weight` and `font-size`. In immutable styles this is known as an **immutable rule-set**.

An immutable rule-set can contain other immutable rule-sets:

```jsx
<dl>
  <dt>
    flex-basis: 50%;
  </dt>
</dl>
```

The example above equates to a CSS rule-set that consists of two selectors. The `flex-basis` declaration will apply to elements matching the second selector – the `dt` tag, only when the ancestor element matches the first selector – the `dl` tag. In CSS these are known as *decendant selectors*.

An immutable rule-set can contain both CSS declarations and other immutable rule-sets:

```jsx
<dl>
  display: flex;
  flex-wrap: wrap;
  <dt>
    flex-basis: 50%;
  </dt>
</dl>
```

The example above includes CSS declarations for both the first selector – the `dl` tag – and the second selector – the `dt` tag.

As with CSS there is no limit to the number of decendants in a given selector. In the example above the second rule-set could contain a thrid rule-set, which in turn could contain a forth rule-set, and so on.

```jsx
<dl>
  display: flex;
  flex-wrap: wrap;
  <dt>
    flex-basis: 50%;
    <span>
      text-transform: uppercase;
    </span>
  </dt>
</dl>
```

> 💡Note: other than using JSX the similarites between React and Immutable Styles end there. Immutable Styles is only concerned with styling web interfaces and *not* building them.

### Immutable Selectors

So far we've only seen *type selectors* – selectors that match elements by their HTML tag name. However it is common for CSS selectors to match elements with a specific class name.

In immutable styles this is achieved using the JSX `className` prop provided by the library:

```jsx
<div className="sideBar">
  height: 100%;
  overflow hidden;
</div>
```

The example above is the equivalant of a CSS rule-set whose *selector* matches HTML elements of type `div` which have the class `sideBar`.
