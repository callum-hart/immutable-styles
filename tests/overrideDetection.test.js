/*
 Testing override detection among immutable styles
*/

const ImmutableStyles = require('../src/immutableStyles');

beforeEach(() => ImmutableStyles.clear());


test('Override found from adjacent node', () => {
  const input = [
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 30px;'
    ),
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 28px;'
    )
  ];

  const overrideFound = () => ImmutableStyles.createCSS(input);
  expect(overrideFound).toThrow('The CSS property `font-size` has already been defined for `h1.pageTitle`');
});


test('Override found from child node', () => {
  const input = [
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 30px;'
    ),
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'titleBar'
      },
      '',
      ImmutableStyles.createStyle(
        'h1',
        {
          className: 'pageTitle'
        },
        'font-size: 20px;'
      )
    )
  ];

  const overrideFound = () => ImmutableStyles.createCSS(input);
  expect(overrideFound).toThrow('[Override Found] `div.titleBar h1.pageTitle` overrides the property `font-size` set by `h1.pageTitle`');
});


test('Override found from adjacent child nodes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'parent'
      },
      '',
      ImmutableStyles.createStyle(
        'span',
        {
          className: 'child'
        },
        'color: cadetblue;'
      )
    ),
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'parent'
      },
      '',
      ImmutableStyles.createStyle(
        'span',
        {
          className: 'child'
        },
        'color: forestgreen;'
      )
    )
  ];

  const overrideFound = () => ImmutableStyles.createCSS(input);
  expect(overrideFound).toThrow('The CSS property `color` has already been defined for `div.parent span.child`');
});


test('Override not found when elements are not equal', () => {
  const input = [
    ImmutableStyles.createStyle(
      'h1',
      null,
      'font-size: 30px;'
    ),
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-size: 20px;'
    )
  ];

  const overrideNotFound = () => ImmutableStyles.createCSS(input);
  expect(overrideNotFound).not.toThrow();
});


test('Override found when breakpoints are indiscrete', () => {
  const input = [
    ImmutableStyles.createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 300
      },
      'display: block;'
    ),
    ImmutableStyles.createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 900
      },
      'display: block;'
    )
  ];

  const overrideFound = () => ImmutableStyles.createCSS(input);
  expect(overrideFound).toThrow('The CSS property `display` has already been defined for `section.sideBar`');
});


test('Override not found when breakpoints are discrete', () => {
  const input = [
    ImmutableStyles.createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 300,
        maxWidth: 899
      },
      'display: block;'
    ),
    ImmutableStyles.createStyle(
      'section',
      {
        className: 'sideBar',
        minWidth: 900
      },
      'display: block;'
    )
  ];

  const overrideNotFound = () => ImmutableStyles.createCSS(input);
  expect(overrideNotFound).not.toThrow();
});


test('Override not found when equal child nodes have different parent', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'parentOne'
      },
      '',
      ImmutableStyles.createStyle(
        'span',
        {
          className: 'child'
        },
        'color: cadetblue;'
      )
    ),
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'parentTwo'
      },
      '',
      ImmutableStyles.createStyle(
        'span',
        {
          className: 'child'
        },
        'color: forestgreen;'
      )
    )
  ];

  const overrideNotFound = () => ImmutableStyles.createCSS(input);
  expect(overrideNotFound).not.toThrow();
});


test.skip('Override found in same rule-set', () => {
  const input = [
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      'font-family: "Fira Code"; font-size: 30px; font-weight: bold; font-size: 20px;'
    )
  ];

  const overrideNotFound = () => ImmutableStyles.createCSS(input);
  expect(overrideNotFound).toThrow('The CSS property `font-size` has already been defined for `h1.pageTitle`');
});


test.skip('Override found in detached CSS rule-set', () => {
  const headingStyles = 'font-family: "Fira Code"; font-size: 30px; font-weight: bold;';

  const input = [
    ImmutableStyles.createStyle(
      'h1',
      {
        className: 'pageTitle'
      },
      `${headingStyles} font-size: 20px;`
    )
  ];

  const overrideNotFound = () => ImmutableStyles.createCSS(input);
  expect(overrideNotFound).toThrow('The CSS property `font-size` has already been defined for `h1.pageTitle`');
});