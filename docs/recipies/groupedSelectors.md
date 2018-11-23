# Grouped Selectors

> ⚗️ Experimental.

```html
<button className="btn">btn</button>
<a href="#" className="btn">btn</a>
```

```jsx
/** @jsx createStyle */
import { createStyle, createMixin } from 'immutable-styles';

const createGroup = Tag => createMixin(
  <Tag>
    padding: 8px 12px;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    background: cadetblue;
    color: ivory;
  </Tag>
);

const groups = {
  button: createGroup('button'),
  link: createGroup('a')
};

module.exports = [
  <groups.button className="btn" />,
  <button className="btn">
    border: none;
    cursor: pointer;
  </button>,

  <groups.link className="btn" />,
  <a className="link">
    text-decoration: none;
  </a>
];
```