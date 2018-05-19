/*
 Testing CSS returned by `createCSS`
*/

const { createStyle, createCSS } = require('../src/immutableStyles');


test('[createCSS] Single node', () => {
  const input = createStyle(
    'h1',
    {
      className: 'pageTitle'
    },
    'font-size: 30px;'
  );

  const output = `h1[class="pageTitle"] {
  font-size: 30px;
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Adjacent nodes', () => {
  const input = [
    createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 30px;'
    ),
    createStyle(
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

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Child node', () => {
  const input = [
    createStyle(
      'div',
      {
        className: 'grid'
      },
      'display: flex;',
      createStyle(
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

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Child nodes', () => {
  const input = [
    createStyle(
      'section',
      {
        className: 'container'
      },
      'display: flex;',
      createStyle(
        'div',
        {
          className: 'sideBar'
        },
        'flex: 1;'
      ),
      createStyle(
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

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Child nodes deep', () => {
  const input = [
    createStyle(
      'nav',
      {
        className: 'navBar'
      },
      'display: flex; height: 80px;',
      createStyle(
        'ul',
        {
          className: 'navLinks'
        },
        'justify-content: flex-end;',
        createStyle(
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

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Media min-width', () => {
  const input = createStyle(
    'section',
    {
      className: 'sideBar',
      minWidth: 900
    },
    'display: block;'
  );

  const output = `@media (min-width:900px) {
  section[class="sideBar"] {
    display: block;
  }
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Media max-width', () => {
  const input = createStyle(
    'section',
    {
      className: 'sideBar',
      maxWidth: 899
    },
    'display: none;'
  );

  const output = `@media (max-width:899px) {
  section[class="sideBar"] {
    display: none;
  }
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Media min-width and max-width', () => {
  const input = createStyle(
    'h1',
    {
      className: 'pageTitle',
      minWidth: 768,
      maxWidth: 1024
    },
    'font-size: 26px;'
  );

  const output = `@media (min-width:768px) and (max-width:1024px) {
  h1[class="pageTitle"] {
    font-size: 26px;
  }
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Node without attributes', () => {
  const input = createStyle(
    'p',
    null,
    'color: darkslategray;'
  );

  const output = `p:not([class]) {
  color: darkslategray;
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Node without styles', () => {
  const input = createStyle(
    'div',
    {
      className: 'titleBar'
    }
  );

  const output = '';

  expect(createCSS(input)).toEqual(output);
});


test('[createCSS] Node without attributes or styles', () => {
  const input = createStyle(
    'div',
    null
  );

  const output = '';

  expect(createCSS(input)).toEqual(output);
});