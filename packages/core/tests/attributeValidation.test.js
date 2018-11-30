/*
 Testing attributes are validated
*/

const {
  createCSS,
  createStyle,
  tearDown
} = require('../index.js');

beforeEach(() => tearDown());


test('[Attr Validation] Invalid attribute found', () => {
  const invalidAttr = () => {
    createCSS(createStyle(
      'h1',
      {
        id: 'anElementID'
      },
      'font-size: 30px;'
    ))
  }

  expect(invalidAttr).toThrow(`\`id\` is not a valid attribute`);
});


test('[Attr Validation] Node without attributes is valid', () => {
  const invalidAttr = () => {
    createCSS(createStyle(
      'h1',
      null,
      'font-size: 30px;'
    ))
  }

  expect(invalidAttr).not.toThrow();
});


test('[Attr Validation] Node with className is valid', () => {
  const invalidAttr = () => {
    createCSS(createStyle(
      'h1',
      {
        className: 'heading'
      },
      'font-size: 30px;'
    ))
  }

  expect(invalidAttr).not.toThrow();
});


test('[Attr Validation] Node with minWidth is valid', () => {
  const invalidAttr = () => {
    createCSS(createStyle(
      'h1',
      {
        minWidth: 360
      },
      'font-size: 30px;'
    ))
  }

  expect(invalidAttr).not.toThrow();
});


test('[Attr Validation] Node with maxWidth is valid', () => {
  const invalidAttr = () => {
    createCSS(createStyle(
      'h1',
      {
        maxWidth: 900
      },
      'font-size: 30px;'
    ))
  }

  expect(invalidAttr).not.toThrow();
});


test('[Attr Validation] Node with pseudo selector is valid', () => {
  const invalidAttr = () => {
    createCSS(createStyle(
      'a',
      {
        pseudo: ':hover'
      },
      'color: slategray;'
    ))
  }

  expect(invalidAttr).not.toThrow();
});


test('[Attr Validation] Node with multiple attributes is valid', () => {
  const invalidAttr = () => {
    createCSS(createStyle(
      'a',
      {
        className: 'link',
        pseudo: ':hover',
        minWidth: 300,
        maxWidth: 900
      },
      'color: slategray;'
    ))
  }

  expect(invalidAttr).not.toThrow();
});