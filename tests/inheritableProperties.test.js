/*
 Testing that inheritable properties only apply to elements that use them.
*/

const {
  createCSS,
  createStyle,
  tearDown
} = require('../src/immutableStyles');

beforeEach(() => tearDown());


test('[inheritance] textual styles can be applied to textual nodes', () => {
  const input = createStyle(
    'p',
    null,
    'font-size: 14px;'
  );

  const styles = () => createCSS(input);
  expect(styles).not.toThrow();
});


test('[inheritance] textual styles can not be applied to non-textual nodes', () => {
  const input = createStyle(
    'div',
    null,
    'font-size: 14px;'
  );

  const styles = () => createCSS(input);
  expect(styles).toThrow('The HTML element `div` (div) cannot use the property `font-size`');
});


test('[inheritance] list styles can be applied to list nodes', () => {
  const input = createStyle(
    'li',
    null,
    'list-style-type: disc;'
  );

  const styles = () => createCSS(input);
  expect(styles).not.toThrow();
});


test('[inheritance] list styles can not be applied to non-list nodes', () => {
  const input = createStyle(
    'div',
    {
      className: 'userList'
    },
    'list-style-type: disc;'
  );

  const styles = () => createCSS(input);
  expect(styles).toThrow('The HTML element `div` (div.userList) cannot use the property `list-style-type`');
});