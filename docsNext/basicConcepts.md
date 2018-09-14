# Basic Concepts

## Written using JSX

- Represented using a [Tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) data structure DONE
- Share the same structure as HTML DONE
- Written using JSX (like React). DONE
- Like React components, an Immutable Style can have props.
- To distinguish between JSX properties and CSS properties, the JSX props exposed by Immutable Styles are referred to as **attributes**.
- There are {N} attributtes: className, pseudo, minWidth, maxWidth, (extendFrom?, modifierFor?)
- 💡Note: Unlike React, the props are predefined by the library. User–defined props are  [forbidden](). Other than using JSX the similarites between React and Immutable Styles end there. Immutable Styles is only concerned with styling web interfaces, not building them.

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

An immutable rule-set can contain both CSS declarations (as seen above) and/or other immutable rule-sets:

```jsx
<dl>
  <dt>
    flex-basis: 50%;
  </dt>
</dl>
```

The example above equates to a CSS rule-set that consists of two selectors – the first selector being `dl`, the second `dt`, and a declaration (`flex-basis`) that applies to elements matching the second selector only if the elements ancestor matches the first selector. In CSS this in known as decendant selectors.

### Props

So far we've only seen *type selectors* – selectors that match elements by HTML tag name.


Like React components, an immutable rule-set can have props. Unlike React, user–defined props are  [forbidden]().
