const {
  createCSS,
  createStyle,
  tearDown
} = require('../index.js');

beforeEach(() => tearDown());


describe('Multiple class separated with space', () => {
  test('Should generate correct CSS', () => {
    const input = createStyle(
      'button',
      {
        className: 'btn btn--loading'
      },
      'background: slategray;'
    );

    const output = 'button[class="btn btn--loading"]{background: slategray;}';

    expect(createCSS(input)).toEqual(output);
  });

  test('Should detect override', () => {
    const input = [
      createStyle(
        'button',
        {
          className: 'btn btn--loading'
        },
        'background: cadetblue;'
      ),
      createStyle(
        'button',
        {
          className: 'btn btn--loading'
        },
        'background: forestgreen;'
      )
    ];

    const overrideFound = () => createCSS(input);
    expect(overrideFound).toThrow('[Override Found] The property `background` has already been defined');
  });
});


describe('Multiple class separated with dot (backwards compatible < v1.0.51)', () => {
  test('Should generate correct CSS', () => {
    const input = createStyle(
      'button',
      {
        className: 'btn.btn--loading'
      },
      'background: slategray;'
    );

    const output = 'button[class="btn btn--loading"]{background: slategray;}';

    expect(createCSS(input)).toEqual(output);
  });

  test('Should detect override', () => {
    const input = [
      createStyle(
        'button',
        {
          className: 'btn.btn--loading'
        },
        'background: cadetblue;'
      ),
      createStyle(
        'button',
        {
          className: 'btn.btn--loading'
        },
        'background: forestgreen;'
      )
    ];

    const overrideFound = () => createCSS(input);
    expect(overrideFound).toThrow('[Override Found] The property `background` has already been defined');
  });
});
