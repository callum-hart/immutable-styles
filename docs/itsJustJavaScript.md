# It's Just JavaScript

Since immutable styles is just JavaScript it gets the niceties of CSS pre-processors for free. Leveraging everyday JavaScript enables variables, detached rulesets, *pre-processor* mixins, and theming with little to no extra cost.

## Variables

```jsx
const brandColor = 'plum';

// usage:

<nav>
  background: { brandColor };
</nav>
```

## Detached Rulesets

```jsx
const fontMedium = `
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 2.1rem;
`;

// usage:

<h1>
  { fontMedium }
</h1>
```

## Pre-processor Mixins

You can create your own:

```jsx
const borderRadius = radius => (`
  -webkit-border-radius: ${radius};
     -moz-border-radius: ${radius};
          border-radius: ${radius};
`);

// usage:

<button>
  { borderRadius('4px') }
</button>
```

Or use a library such as [polished-styles](https://github.com/styled-components/polished):

```jsx
const { lighten } = require('polished');

// usage :

<a pseudo=":hover">
  color: { lighten(0.2, 'dogerblue') };
</a>
```

*Not to be confused with [immutable mixins]()*.

## Themes

```jsx
const ACTIVE_THEME = 'light';
const themes = {
  light: {
    appBackground: 'ghostwhite'
  },
  dark: {
    appBackground: 'midnightblue'
  }
}

// usage:

<body>
  background: { themes[ACTIVE_THEME].appBackground };
</body>
```

## Server-side

Compiling immutable styles server-side – and of course infrastructure permitting – would enable futher functionality, such as generating CSS specific to:

- ⚗️ Experiments (AB testing)
- 🎌 Locale
- 📱 Platform

> ###### Note on Support

> Whilst this is technically possible now an official server-side compiler hasn't been released. *Official* support for server-side compilation could be added in future releases.


