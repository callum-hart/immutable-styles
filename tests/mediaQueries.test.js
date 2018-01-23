/*
 Testing media queries.
*/

const ImmutableStyles = require('../src/immutableStyles');

beforeEach(() => ImmutableStyles.clear());


test('[media] Cannot define nested media query', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'parentNode',
        minWidth: 300
      },
      'display: block;',
      ImmutableStyles.createStyle(
        'span',
        {
          className: 'childNode',
          minWidth: 600
        },
        'font-size: 14px;'
      )
    )
  ];

  const nestedMediaQuery = () => ImmutableStyles.createCSS(input);
  expect(nestedMediaQuery).toThrow('Nested media query found');
});


test('[media] Child nodes inherit breakpoint from parent node', () => {
  const input = [
    ImmutableStyles.createStyle(
      'div',
      {
        className: 'parentNode',
        minWidth: 300
      },
      'display: block;',
      ImmutableStyles.createStyle(
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

    expect(ImmutableStyles.createCSS(input)).toEqual(output);
});