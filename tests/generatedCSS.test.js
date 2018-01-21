/*
 Testing CSS returned by `ImmutableStyles.createCSS`
*/

const ImmutableStyles = require('../src/immutableStyles');

beforeEach(() => ImmutableStyles.clear());


test('[createCSS] Single node', () => {
  const input = [
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 30px;'
    )
  ];

  const output = `h1[class="pageTitle"] {
  font-size: 30px;
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Adjacent nodes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 30px;'
    ),
    ImmutableStyles.createStyle(
      'h2',
      {
        className: 'pageSubTitle'
      },
      'font-size: 25px;'
    )
  ];

  const output = `h1[class="pageTitle"] {
  font-size: 30px;
}
h2[class="pageSubTitle"] {
  font-size: 25px;
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Child node', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'grid'
      },
      'display: flex;',
      ImmutableStyles.createStyle(
        'span',
        {
          className: 'col'
        },
        'flex: 1;'
      )
    )
  ];

  const output = `div[class="grid"] {
  display: flex;
}
div[class="grid"] > span[class="col"] {
  flex: 1;
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Child nodes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'section',
      {
        className: 'container'
      },
      'display: flex;',
      ImmutableStyles.createStyle(
        'div',
        {
          className: 'sideBar'
        },
        'flex: 1;'
      ),
      ImmutableStyles.createStyle(
        'div',
        {
          className: 'content'
        },
        'flex: 3;'
      )
    )
  ];

  const output = `section[class="container"] {
  display: flex;
}
section[class="container"] > div[class="sideBar"] {
  flex: 1;
}
section[class="container"] > div[class="content"] {
  flex: 3;
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Child nodes deep', () => {
  const input = [
    ImmutableStyles.createStyle(
      'nav',
      {
        className: 'navBar'
      },
      'display: flex; height: 80px;',
      ImmutableStyles.createStyle(
        'ul',
        {
          className: 'navLinks'
        },
        'justify-content: flex-end;',
        ImmutableStyles.createStyle(
          'li',
          {
            className: 'navLink'
          },
          'padding: 10px 20px;'
        )
      )
    )
  ];

  const output = `nav[class="navBar"] {
  display: flex; height: 80px;
}
nav[class="navBar"] > ul[class="navLinks"] {
  justify-content: flex-end;
}
nav[class="navBar"] > ul[class="navLinks"] > li[class="navLink"] {
  padding: 10px 20px;
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Media min-width', () => {
  const input = [
    ImmutableStyles.createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 900
      },
      'display: block;'
    )
  ];

  const output = `@media (min-width:900px) {
  section[class="sideBar"] {
    display: block;
  }
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Media max-width', () => {
  const input = [
    ImmutableStyles.createStyle(
      'section',
      {
        className: 'sideBar',
        maxWidth: 899
      },
      'display: none;'
    )
  ];

  const output = `@media (max-width:899px) {
  section[class="sideBar"] {
    display: none;
  }
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Media min-width and max-width', () => {
  const input = [
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle',
        minWidth: 768,
        maxWidth: 1024
      },
      'font-size: 26px;'
    )
  ];

  const output = `@media (min-width:768px) and (max-width:1024px) {
  h1[class="pageTitle"] {
    font-size: 26px;
  }
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


test('[createCSS] Node without attributes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'p',
      null,
      'color: darkslategray;'
    )
  ];

  const output = `p:not([class]) {
  color: darkslategray;
}
`;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


// todo: only return CSS when styles are present
test.skip('[createCSS] Node without styles', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'titleBar'
      },
      ''
    )
  ];

  const output = ``;

  expect(ImmutableStyles.createCSS(input)).toEqual(output);
});


// todo: only return CSS when styles are present
test.skip('[createCSS] Node without attributes or styles', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      null,
      ''
    )
  ];

  const output = ``;

  expect(input).toEqual(output);
});