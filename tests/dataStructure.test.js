/*
 Testing data structure returned by `createStyle`
*/

const { createStyle } = require('../src/immutableStyles');


test('[createStyle] Single node', () => {
  const input = createStyle(
    'h1',
    {
      className: 'pageTitle'
    },
    'font-size: 30px;'
  );

  const output = {
    element: 'h1',
    attrs: {
      className: 'pageTitle'
    },
    styles: 'font-size: 30px;',
    children: []
  };

  expect(input).toEqual(output);
});


test('[createStyle] Adjacent nodes', () => {
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

  const output = [
    {
      element: 'h1',
      attrs: {
        className: 'pageTitle'
      },
      styles: 'font-size: 30px;',
      children: []
    },
    {
      element: 'h2',
      attrs: {
        className: 'pageSubTitle'
      },
      styles: 'font-size: 25px;',
      children: []
    }
  ];

  expect(input).toEqual(output);
});


test('[createStyle] Child node', () => {
  const input = createStyle(
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
  );

  const output = {
    element: 'div',
    attrs: {
      className: 'grid'
    },
    styles: 'display: flex;',
    children: [
      {
        element: 'span',
        attrs: {
          className: 'col'
        },
        styles: 'flex: 1;',
        children: []
      }
    ]
  };

  expect(input).toEqual(output);
});


test('[createStyle] Child nodes', () => {
  const input = createStyle(
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
  );

  const output = {
    element: 'section',
    attrs: {
      className: 'container'
    },
    styles: 'display: flex;',
    children: [
      {
        element: 'div',
        attrs: {
          className: 'sideBar'
        },
        styles: 'flex: 1;',
        children: []
      },
      {
        element: 'div',
        attrs: {
          className: 'content'
        },
        styles: 'flex: 3;',
        children: []
      }
    ]
  };

  expect(input).toEqual(output);
});


test('[createStyle] Child nodes deep', () => {
  const input = createStyle(
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
  );

  const output = {
    element: 'nav',
    attrs: {
      className: 'navBar'
    },
    styles: 'display: flex; height: 80px;',
    children: [
      {
        element: 'ul',
        attrs: {
          className: 'navLinks'
        },
        styles: 'justify-content: flex-end;',
        children: [
          {
            element: 'li',
            attrs: {
              className: 'navLink'
            },
            styles: 'padding: 10px 20px;',
            children: []
          }
        ]
      }
    ]
  };

  expect(input).toEqual(output);
});


test('[createStyle] Media min-width', () => {
  const input = createStyle(
    'section',
    {
      className: 'sideBar',
      minWidth: 900
    },
    'display: block;'
  );

  const output = {
    element: 'section',
    attrs: {
      className: 'sideBar',
      minWidth: 900
    },
    styles: 'display: block;',
    children: []
  };

  expect(input).toEqual(output);
});


test('[createStyle] Media max-width', () => {
  const input = createStyle(
    'section',
    {
      className: 'sideBar',
      maxWidth: 899
    },
    'display: none;'
  );

  const output = {
    element: 'section',
    attrs: {
      className: 'sideBar',
      maxWidth: 899
    },
    styles: 'display: none;',
    children: []
  };

  expect(input).toEqual(output);
});


test('[createStyle] Media min-width and max-width', () => {
  const input = createStyle(
    'h1',
    {
      className: 'pageTitle',
      minWidth: 768,
      maxWidth: 1024
    },
    'font-size: 26px;'
  );

  const output = {
    element: 'h1',
    attrs: {
      className: 'pageTitle',
      minWidth: 768,
      maxWidth: 1024
    },
    styles: 'font-size: 26px;',
    children: []
  };

  expect(input).toEqual(output);
});


test('[createStyle] Node without attributes', () => {
  const input = createStyle(
    'p',
    null,
    'color: darkslategray;'
  );

  const output = {
    element: 'p',
    attrs: {},
    styles: 'color: darkslategray;',
    children: []
  };

  expect(input).toEqual(output);
});


test('[createStyle] Node without styles', () => {
  const input = createStyle(
    'div',
    {
      className: 'titleBar'
    }
  );

  const output = {
    element: 'div',
    attrs: {
      className: 'titleBar'
    },
    styles: '',
    children: []
  };

  expect(input).toEqual(output);
});


test('[createStyle] Node without attributes or styles', () => {
  const input = createStyle(
    'div'
  );

  const output = {
    element: 'div',
    attrs: {},
    styles: '',
    children: []
  };

  expect(input).toEqual(output);
});
