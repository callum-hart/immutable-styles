/*
 Testing that inheritable properties only apply to elements that use them.
*/

const ImmutableStyles = require('../src/immutableStyles');

beforeEach(() => ImmutableStyles.tearDown());


test('[inheritance] textual styles can be applied to textual nodes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'p',
      null,
      'font-size: 14px;'
    )
  ];

  const styles = () => ImmutableStyles.createCSS(input);
  expect(styles).not.toThrow();
});


test('[inheritance] textual styles can not be applied to non-textual nodes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      null,
      'font-size: 14px;'
    )
  ];

  const styles = () => ImmutableStyles.createCSS(input);
  expect(styles).toThrow('The HTML element `div` (div) cannot use the property `font-size`');
});


test('[inheritance] list styles can be applied to list nodes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'li',
      null,
      'list-style: disc;'
    )
  ];

  const styles = () => ImmutableStyles.createCSS(input);
  expect(styles).not.toThrow();
});


test('[inheritance] list styles can not be applied to non-list nodes', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'userList'
      },
      'list-style: disc;'
    )
  ];

  const styles = () => ImmutableStyles.createCSS(input);
  expect(styles).toThrow('The HTML element `div` (div.userList) cannot use the property `list-style`');
});