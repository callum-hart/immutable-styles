## Single Inheritance Model

Usually CSS overrides are used to allow styles to be reused and repurposed across similar but not identical interfaces. In order to achieve the same effect without permitting overrides Immutable Styles implements a **[single inheritance model](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)#Types)**. This allows a style to acquire the properties from another style, where the subclass inherits all styles from its superclass.

Superclasses look like any other Immutable Style:

```js
createStyle(
  "form",
  {
    className: "baseForm"
  },
  `padding: 20px;
  background: ivory;
  border: 1px solid lightgray;`
)
```

Dot notation is used to indicate that a subclass extends a superclass (`className: <superclass>.<subclass>`). In the following examples each subclass extends `baseForm`.

A subclass **inherits all styles** from its superclass:

```
------------------------------------------------------------------------
Subclass                              | Applied Styles
------------------------------------------------------------------------
                                      |
createStyle(                          | /* inherited styles */
  "form",                             | padding: 20px
  {                                   | background: ivory
    className: "baseForm.loginForm"   | border: 1px solid lightgray
  }                                   |
)                                     |
                                      |
------------------------------------------------------------------------
```

A subclass can **define its own styles** which get merged with the styles it inherits:

```
------------------------------------------------------------------------
Subclass                              | Applied Styles
------------------------------------------------------------------------
                                      |
createStyle(                          | /* inherited styles */
  "form",                             | padding: 20px
  {                                   | background: ivory
    className: "baseForm.loginForm"   | border: 1px solid lightgray
  },                                  | /* own styles */
  `width: 60%;                        | width: 60%
  display: block;                     | display: block
  margin: 0 auto;                     | margin: 0 auto
  border-radius: 4px;`                | border-radius: 4px
)                                     |
                                      |
------------------------------------------------------------------------
```

A subclass can **redefine any styles it inherits** from its superclass:

```
------------------------------------------------------------------------
Subclass                              | Applied Styles
------------------------------------------------------------------------
                                      |
createStyle(                          | /* inherited styles */
  "form",                             | padding: 20px
  {                                   | border: 1px solid lightgray
    className: "baseForm.loginForm"   |
  },                                  | /* redefined styles */
  'background: cornflowerblue;'       | background: cornflowerblue
)                                     |
                                      |
------------------------------------------------------------------------
```