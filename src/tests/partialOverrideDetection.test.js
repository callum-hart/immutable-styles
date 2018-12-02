/*
 Testing partial detection among immutable styles
*/

const {
  createCSS,
  createStyle,
  tearDown
} = require('../index.js');

beforeEach(() => tearDown());


test('Shorthand property overriden by longhand property in same ruleset', () => {
  const input = createStyle(
    'h1',
    null,
    `margin: 10px;
    margin-top: 20px;`
  );

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `margin` is overridden by `margin-top`'
  );
});


test('Longhand property overriden by shorthand property in same ruleset', () => {
  const input = createStyle(
    'h1',
    null,
    `padding-top: 20px;
    padding: 10px;`
  );

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `padding-top` is overridden by `padding`'
  );
});


test('Shorthand property overriden by longhand property in different ruleset', () => {
  const input = [
    createStyle(
      'button',
      null,
      'border-radius: 3px;'
    ),
    createStyle(
      'nav',
      null,
      createStyle(
        'button',
        null,
        'border-top-left-radius: 6px;'
      )
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border-radius` is overridden by `border-top-left-radius`'
  );
});


test('Longhand property overriden by shorthand property in different ruleset', () => {
  const input = [
    createStyle(
      'button',
      null,
      'border-top-left-radius: 6px;'
    ),
    createStyle(
      'nav',
      null,
      createStyle(
        'button',
        null,
        'border-radius: 3px;'
      )
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border-top-left-radius` is overridden by `border-radius`'
  );
});


test('[Border] border-top cannot override border', () => {
  const input = [
    createStyle(
      'button',
      null,
      `border: 1px solid cadetblue;
      border-top: 2px solid coral`
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border` is overridden by `border-top`'
  );
});


test('[Border] border cannot override border-top', () => {
  const input = [
    createStyle(
      'button',
      null,
      `border-top: 1px solid cadetblue;
      border: 2px solid coral`
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border-top` is overridden by `border`'
  );
});


test('[Border] border-top-width cannot override border-top', () => {
  const input = [
    createStyle(
      'button',
      null,
      `border-top: 1px solid cadetblue;
      border-top-width: 2px`
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border-top` is overridden by `border-top-width`'
  );
});


test('[Border] border-top cannot override border-top-width', () => {
  const input = [
    createStyle(
      'button',
      null,
      `border-top-width: 2px;
      border-top: 1px solid cadetblue`
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border-top-width` is overridden by `border-top`'
  );
});


test('[Border] border-top-width cannot override border', () => {
  const input = [
    createStyle(
      'button',
      null,
      `border: 1px solid cadetblue;
      border-top-width: 2px`
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border` is overridden by `border-top-width`'
  );
});


test('[Border] border cannot override border-top-width', () => {
  const input = [
    createStyle(
      'button',
      null,
      `border-top-width: 2px;
      border: 1px solid cadetblue`
    )
  ];

  const partialOverrideFound = () => createCSS(input);
  expect(partialOverrideFound).toThrow(
    '[Partial Override Found] The property `border-top-width` is overridden by `border`'
  );
});
