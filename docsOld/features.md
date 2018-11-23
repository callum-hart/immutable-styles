## Features

Since Immutable Styles is just JavaScript we get the niceties of CSS pre-processors for free. Leveraging ES6 template literals enables variables, detached rule-sets, mixins, and theming with little to no extra cost.

### Variables

```js
const brandColor = "#58CCFA";

createStyle(
 "nav",
 null,
 `background: ${brandColor};`
)

```

### Detached Rule-sets

```js
const mediumFont = `
  font-family: "Operator Mono";
  font-weight: 600;
  font-size: 2.1rem;
`;

createStyle(
  "h2",
  {
    className: "title"
  },
  mediumFont
)
```

### Mixins

You can create your own:

```js
function borderRadius(radius) {
  return `
    -webkit-border-radius: ${radius};
       -moz-border-radius: ${radius};
            border-radius: ${radius};
  `;
}

createStyle(
  "button",
  null,
  `padding: 10px 20px; ${borderRadius('4px')}`
)
```

Or use a library such as [polished-styles](https://github.com/styled-components/polished):

```js
const { lighten } = require('polished');

createStyle(
  "p",
  null,
  `color: ${lighten(0.3, '#000000')}`
)
```

### Themes

```js
const ACTIVE_THEME = "light";
const colorMap = {
  light: {
    appBackground: "FFFFFF"
  },
  dark: {
    appBackground: "#111111"
  }
}

createStyle(
  "main",
  {
    className: "app"
  },
  `background: ${colorMap[ACTIVE_THEME].appBackground};`
)
```

### Server-Side

Compiling Immutable Styles server-side (and of course infrastructure permitting) would enable more features such as:

- Styles based on experiments
- Styles specific to locale
- Styles specific to platform