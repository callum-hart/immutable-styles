/*
 Testing that ambiguous properties are not allowed.
*/

const {
  createCSS,
  createStyle,
  tearDown
} = require('../src/immutableStyles');

beforeEach(() => tearDown());


test('[ambiguous propeties] shorthand properties should not be allowed', () => {
  const input = createStyle(
    'div',
    null,
    'background: cadetblue;'
  );

  const styles = () => createCSS(input);
  expect(styles).toThrow('[Ambiguous property] "div" uses the shorthand property "background"');
});


test('[ambiguous propeties] longhand properties should be allowed', () => {
  const input = createStyle(
    'div',
    null,
    'background-color: cadetblue;'
  );

  const styles = () => createCSS(input);
  expect(styles).not.toThrow();
});
