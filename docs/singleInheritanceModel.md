## Single Inheritance Model

Usually CSS overrides are used to allow styles to be reused and repurposed across *similar* but not identical interfaces. In order to achieve the same effect without overrides Immutable Styles implements a single inheritance model. This allows a style to acquire the properties from another style (subclass inherits styles from superclass), for example:

```jsx
<form className="form">
 padding: 20px;
 background: ivory;
 border: 1px solid lightgray;
</form>,

<form className="form.form--withError">
 border: 1px solid lightcoral;
</form>
```

`form--withError` extends `form` so inherits the `padding` and `background` properties. `form--withError` provides its own implementation of `border` overriding the color from `lightgray` to `lightcoral`. *Note:* this override happens at compile-time not run-time. The generated CSS is:

```css
form[class="form"] {
 padding: 20px;
 background: ivory;
 border: 1px solid lightgray;
}

form[class="form form--withError"] {
 padding: 20px;
 background: ivory;
 border: 1px solid lightcoral /* (original value: 1px solid lightgray) */;
}
```

The single inheritance model also works with nested elements:

```jsx
<form className="form">
 <span className="form__error">
  display: none;
 </span>
</form>,

<form className="form.form--withError">
 <span className="form__error">
  display: block;
  color: indianred;
 </span>
</form>
```

Generated CSS:

```css
form[class="form"] > span[class="form__error"] {
  display: none;
}

form[class="form form--withError"] > span[class="form__error"] {
  display: block /* (original value: none) */;
  color: indianred;
}
```