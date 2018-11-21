# Sharing Styles

Immutable styles provides a couple of ways to share common styles among similar rulesets:

1. [Mixins]()
2. [Detached Rulesets]()

Mixins are used to share styles among rulesets with the *same* element type. Whilst detached rulesets are used to share styles among rulesets with *different* element types. 

This guide will feature an example of sharing styles for each approach.

### Mixin Example

For mixins we will extend the button example first introduced in ["The Basics"]() guide.

The designer has returned to the styleguide and added a few different button variations. In addition each variation has four UI states: a default, hover, focussed, and disabled state.

Here is our fictitious styleguide:

*screenshot of styleguide*

From the styleguide above we can identify common declarations shared among all buttons - each of which have the same:

- `padding`
- `border-width`
- `border-style`
- `border-radius`
- `font-size`
- `font-family`
- `cursor`

In contrast each button variation has unique declarations for the following:

- `background`
- `border-color`
- `color`

The common declarations for the default state can be put into a mixin:

```jsx
/** @jsx createStyle */
import { createStyle, createMixin } from 'immutable-styles';

const button = {
  default: createMixin(
    <button>
      padding: 10px 30px;
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      font-size: 1rem;
      font-family: 'Open Sans', sans-serif;
      cursor: pointer;
    </button>
  )
};
```

Each button variation can now use the `button` mixin, and apply the declarations specific to each variation:

```jsx
/** @jsx createStyle */
import { createStyle, createMixin } from 'immutable-styles';

const button = {
  /* ... */
};

module.exports = [
  <button.default className="btn-primary">
    background: #4A96F8;
    border-color: #3B7AC9;
    color: #FFFFFF;
  </button.default>,

  <button.default className="btn-secondary">
    background: #D5DFEB;
    border-color: #BFCDDD;
    color: #3D4247;
  </button.default>,

  <button.default className="btn-brand">
    background: #F2C07C;
    border-color: #DFAD70;
    color: #44321B;
  </button.default>
];
```

We can use the same approach for the different UI states:

```jsx
/** @jsx createStyle */
import { createStyle, createMixin } from 'immutable-styles';

const button = {
  default: createMixin(
    /* ... */
  ),
  hover: createStyle(
    <button pseudo=":hover">
      cursor: pointer;
    </button>
  ),
  focus: createMixin(
    <button pseudo=":focus">
      outline: none;
      box-shadow: 0 0 0 3px #A8CBF5;
    </button>
  ),
  disabled: createMixin(
    <button pseudo=":disabled">
      opacity: 0.6;
      pointer-events: none;
    </button>
  )
};

module.exports = [
  // Primary Button

  <button.default className="btn-primary">
    {/* ... */}
  </button.default>,
  <button.hover className="btn-primary">
    background: #3B7AC9;
  </button.hover>,
  <button.focus className="btn-primary" />,
  <button.disabled className="btn-primary" />,

  // Secondary Button

  <button.default className="btn-secondary">
    {/* ... */}
  </button.default>,
  <button.hover className="btn-secondary">
    background: #BFCDDD;
  </button.hover>,
  <button.focus className="btn-secondary" />,
  <button.disabled className="btn-secondary" />,

  // Brand Button

  <button.default className="btn-brand">
    {/* ... */}
  </button.default>,
  <button.hover className="btn-brand">
    background: #DFAD70;
  </button.hover>,
  <button.focus className="btn-brand" />,
  <button.disabled className="btn-brand" />
];
```
