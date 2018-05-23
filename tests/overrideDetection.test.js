/*
 Testing override detection among immutable styles
*/

const { createStyle, createCSS } = require('../src/immutableStyles');


test('Override found from adjacent node', () => {
  const input = [
    createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 30px;'
    ),
    createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 28px;'
    )
  ];

  const overrideFound = () => createCSS(input);
  expect(overrideFound).toThrow('[Override Found] the "font-size" of "h1.pageTitle" has already been defined');
});


test('Override found from child node', () => {
  const input = [
    createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 30px;'
    ),
    createStyle(
      'div',
      {
        className: 'titleBar'
      },
      '',
      createStyle(
        'h1',
        {
          className: 'pageTitle'
        },
        'font-size: 20px;'
      )
    )
  ];

  const overrideFound = () => createCSS(input);
  expect(overrideFound).toThrow('[Override Found] "div.titleBar h1.pageTitle" overrides the "font-size" set by "h1.pageTitle"');
});


test('Override found from adjacent child nodes', () => {
  const input = [
    createStyle(
      'div',
      {
        className: 'parent'
      },
      '',
      createStyle(
        'span',
        {
          className: 'child'
        },
        'color: cadetblue;'
      )
    ),
    createStyle(
      'div',
      {
        className: 'parent'
      },
      '',
      createStyle(
        'span',
        {
          className: 'child'
        },
        'color: forestgreen;'
      )
    )
  ];

  const overrideFound = () => createCSS(input);
  expect(overrideFound).toThrow('[Override Found] the "color" of "div.parent span.child" has already been defined');
});


test('Override not found when elements are not equal', () => {
  const input = [
    createStyle(
      'h1',
      null,
      'font-size: 30px;'
    ),
    createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 20px;'
    )
  ];

  const overrideNotFound = () => createCSS(input);
  expect(overrideNotFound).not.toThrow();
});


test('Override found when breakpoints are indiscrete', () => {
  const input = [
    createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 300
      },
      'display: block;'
    ),
    createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 900
      },
      'display: block;'
    )
  ];

  const overrideFound = () => createCSS(input);
  expect(overrideFound).toThrow('[Override Found] the "display" of "section.sideBar" has already been defined');
});


test('Override not found when breakpoints are discrete', () => {
  const input = [
    createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 300,
        maxWidth: 899
      },
      'display: block;'
    ),
    createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 900
      },
      'display: block;'
    )
  ];

  const overrideNotFound = () => createCSS(input);
  expect(overrideNotFound).not.toThrow();
});


test('Override not found when equal child nodes have different parent', () => {
  const input = [
    createStyle(
      'div',
      {
        className: 'parentOne'
      },
      '',
      createStyle(
        'span',
        {
          className: 'child'
        },
        'color: cadetblue;'
      )
    ),
    createStyle(
      'div',
      {
        className: 'parentTwo'
      },
      '',
      createStyle(
        'span',
        {
          className: 'child'
        },
        'color: forestgreen;'
      )
    )
  ];

  const overrideNotFound = () => createCSS(input);
  expect(overrideNotFound).not.toThrow();
});


test('Override found in same rule-set', () => {
  const input = createStyle(
    'h1',
    {
      className: 'pageTitle'
    },
    'font-family: "Fira Code"; font-size: 30px; font-weight: bold; font-size: 20px;'
  );

  const overrideNotFound = () => createCSS(input);
  expect(overrideNotFound).toThrow('The CSS property `font-size` is defined twice by `h1.pageTitle`');
});


test('Override found in detached CSS rule-set', () => {
  const headingStyles = 'font-family: "Fira Code"; font-size: 30px; font-weight: bold;';
  const input = createStyle(
    'h1',
    {
      className: 'pageTitle'
    },
    `${headingStyles} font-size: 20px;`
  );

  const overrideNotFound = () => createCSS(input);
  expect(overrideNotFound).toThrow('The CSS property `font-size` is defined twice by `h1.pageTitle`');
});