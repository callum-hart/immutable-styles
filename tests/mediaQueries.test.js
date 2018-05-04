/*
 Testing media queries.
*/

const {
  createStyle,
  createCSS,
  tearDown
} = require('../src/immutableStyles');

beforeEach(() => tearDown());


test('[media] Cannot define nested media query', () => {
  const input = [
    createStyle(
      'div',
      {
        className: 'parentNode',
        minWidth: 300
      },
      'display: block;',
      createStyle(
        'span',
        {
          className: 'childNode',
          minWidth: 600
        },
        'font-size: 14px;'
      )
    )
  ];

  const nestedMediaQuery = () => createCSS(input);
  expect(nestedMediaQuery).toThrow('Nested media query found');
});


test('[media] Child nodes inherit breakpoint from parent node', () => {
  const input = [
    createStyle(
      'div',
      {
        className: 'parentNode',
        minWidth: 300
      },
      'display: block;',
      createStyle(
        'span',
        {
          className: 'childNode'
        },
        'font-size: 14px;'
      )
    )
  ];

    const output = `@media (min-width:300px) {
  div[class="parentNode"] {
    display: block;
  }
}
@media (min-width:300px) {
  div[class="parentNode"] > span[class="childNode"] {
    font-size: 14px;
  }
}
`;

    expect(createCSS(input)).toEqual(output);
});