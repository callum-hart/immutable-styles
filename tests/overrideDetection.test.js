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


test('Override not found for inequal elements', () => {
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
  expect(overrideNotFound).not.toThrow('[Override Found] `div.titleBar h1.pageTitle` overrides the property `font-size` set by `h1.pageTitle`');
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
  expect(overrideNotFound).not.toThrow('The CSS property `display` has already been defined for `section.sideBar`');
});