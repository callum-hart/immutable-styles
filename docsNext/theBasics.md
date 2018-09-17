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

The example above equates to a CSS rule-set that consists of two selectors. The `flex-basis` declaration will apply to elements matching the second selector – the `dt` tag *only* when the ancestor element matches the first selector – the `dl` tag. This is the equivalant of a CSS *decendant selector*.

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

The example above includes CSS declarations for both the first selector – the `dl` tag – and the second selector – the `dt` tag. As with CSS there is no limit to the number of decendants in a given selector. In the example above the second rule-set could contain a thrid rule-set, which in turn could contain a forth rule-set, and so on:

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

> 💡Note: other than using JSX the similarites between React and Immutable Styles end there. Immutable Styles is only concerned with *styling* web interfaces and not *building* them.

### JSX Attributes

So far we've only seen *type selectors* – selectors that match elements by their HTML tag name. However it is common for CSS selectors to match elements based on a specific class name, pseudo class/element, and or screen-size.

In immutable styles these are achieved using JSX attributtes. Similar to props in React – immutable attributtes are defined on the opening JSX tag.

**`className`**

```jsx
<div className="sideBar">
  height: 100%;
  overflow hidden;
</div>
```

The example above is the equivalant of a CSS rule-set whose *selector* matches HTML elements of type `div` *and* have the class `sideBar`.

**`pseudo`**

```jsx
<a pseudo=":hover">
	color: darkblue;
</a>
```

The example above is the equivalant of a CSS selector using the *pseudo-class* keyword that matches HTML elements of type `a` in a specific state – in this case `hover`.

Likewise the `pseudo` attribute is also used for *pseudo-elements* :

```jsx
<span pseudo="::before">
	content: "🐹";
</span>
```

> 💡Note: the `pseudo` JSX attribute supports both CSS2 (`:before`) and CSS3 (`::before`) syntax.

**`minWidth`**

```jsx
<body minWidth="900">
	font-size: 1rem;
</body> 
```

The example above is the equivalant of a CSS rule-set defined within a `media-query`. In this case the selector targets the HTML element `body` on screen-sizes wider than 900px.


**`maxWidth`**

```jsx
<body maxWidth="350">
	font-size: 1.4rem;
</body> 
```

The example above is the equivalant of a CSS *media-query* targeting screens less than 350px wide.

> 💡Note: the unit for media-queries is predefined by immutable styles – all media queries  default to pixels – `maxWidth="350"` equates to 350px. Supporting units other than pixels is something that could change in future.

<center>*</center>

Any combination of the JSX attributes can be used together:

```jsx
<div className="sideBar" maxWidth="350">
	width: 150px;
	<span className="icon">
		
	</span>
</div>
```

> 💡Note: it should be noted that *unlike* props in React – only JSX attributes predefined by immutable styles are allowed.


