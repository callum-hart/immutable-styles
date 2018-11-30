/*
 Testing that nodes without a class are treated differently to nodes
 of same type with a class, i.e: `span` != `span.icon`
*/

const { createStyle, tearDown } = require('../index.js');

beforeEach(() => tearDown());


test('[nodeEquality] Elements of different type without class are not equal', () => {
  const firstElement = createStyle(
    'p',
    null,
    'color: darkslategray;'
  );

  const secondElement = createStyle(
    'span',
    null,
    'color: darkslategray;'
  );

  expect(firstElement).not.toEqual(secondElement);
});


test('[nodeEquality] Elements of same type without class are equal', () => {
  const firstElement = createStyle(
    'p',
    null,
    'color: darkslategray;'
  );

  const secondElement = createStyle(
    'p',
    null,
    'color: darkslategray;'
  );

  expect(firstElement).toEqual(secondElement);
});


test('[nodeEquality] Elements of different type with same class are not equal', () => {
  const firstElement = createStyle(
    'p',
    {
      className: 'description'
    },
    'color: darkslategray;'
  );

  const secondElement = createStyle(
    'span',
    {
      className: 'description'
    },
    'color: darkslategray;'
  );

  expect(firstElement).not.toEqual(secondElement);
});


test('[nodeEquality] Elements of same type with same class are equal', () => {
  const firstElement = createStyle(
    'p',
    {
      className: 'description'
    },
    'color: darkslategray;'
  );

  const secondElement = createStyle(
    'p',
    {
      className: 'description'
    },
    'color: darkslategray;'
  );

  expect(firstElement).toEqual(secondElement);
});