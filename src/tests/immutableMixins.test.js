const {
  createCSS,
  createStyle,
  createMixin,
  tearDown
} = require('../index.js');

beforeEach(() => tearDown());


describe('Simple mixin', () => {
  const givenMixin = createMixin(
    createStyle(
      'button',
      null,
      'padding: 10px 30px;'
    )
  );

  test('should generate the correct object', () => {
    const expectedObject = {
      element: 'button',
      attrs: {},
      children: [],
      styles: 'padding: 10px 30px;',
    };

    expect(givenMixin).toEqual(expectedObject);
  });

  describe('when used', () => {
    describe('and attrs are present', () => {
      test('should generate the correct object with expected attrs', () => {
        const givenUsage = createStyle(
          givenMixin,
          {
            className: 'btn-primary'
          },
          'background: cadetblue;'
        );
        const expectedObject = {
          element: 'button',
          attrs: {
            className: 'btn-primary'
          },
          children: [],
          styles: 'padding: 10px 30px;background: cadetblue;',
        };

        expect(givenUsage).toEqual(expectedObject);
      });
    });

    describe('and style overrides style in mixin', () => {
      test('should throw Duplicate Property error', () => {
        const givenUsage = createStyle(
          givenMixin,
          {
            className: 'btn-secondary'
          },
          'padding: 0;'
        );

        const overrideFound = () => createCSS(givenUsage);
        expect(overrideFound).toThrow('[Duplicate Property] The CSS property `padding` is defined twice by `button.btn-secondary`');
      });
    });
  });
});


describe('Mixin with attrs', () => {
  const givenMixin = createMixin(
    createStyle(
      'button',
      {
        pseudo: ':hover'
      },
      'cursor: pointer;'
    )
  );

  test('should generate the correct object', () => {
    const expectedObject = {
      element: 'button',
      attrs: {
        pseudo: ':hover'
      },
      children: [],
      styles: 'cursor: pointer;',
    };

    expect(givenMixin).toEqual(expectedObject);
  });

  describe('when used', () => {
    describe('and attrs are present', () => {
      test('should generate the correct object with expected attrs', () => {
        const givenUsage = createStyle(
          givenMixin,
          {
            className: 'btn-primary'
          },
          'background: cadetblue;'
        );
        const expectedObject = {
          element: 'button',
          attrs: {
            pseudo: ':hover',
            className: 'btn-primary'
          },
          children: [],
          styles: 'cursor: pointer;background: cadetblue;',
        };

        expect(givenUsage).toEqual(expectedObject);
      });
    });

    describe('and style overrides style in mixin', () => {
      test('should throw Duplicate Property error', () => {
        const givenUsage = createStyle(
          givenMixin,
          {
            className: 'btn-secondary'
          },
          'cursor: not-allowed;'
        );

        const overrideFound = () => createCSS(givenUsage);
        expect(overrideFound).toThrow('[Duplicate Property] The CSS property `cursor` is defined twice by `button.btn-secondary:hover`');
      });
    });
  });
});


describe('Mixin with child node', () => {
  const givenMixin = createMixin(
    createStyle(
      'button',
      null,
      createStyle(
        'span',
        {
          className: 'btn__icon'
        },
        'display: inline-block;'
      )
    )
  );

  test('should generate the correct object', () => {
    const expectedObject = {
      element: 'button',
      attrs: {},
      children: [
        {
          element: 'span',
          attrs: {
            className: 'btn__icon'
          },
          children: [],
          styles: 'display: inline-block;'
        }
      ],
      styles: ''
    };

    expect(givenMixin).toEqual(expectedObject);
  });

  describe('when used', () => {
    describe('and attrs are present', () => {
      test('should generate the correct object with expected attrs', () => {
        const givenUsage = createStyle(
          givenMixin,
          {
            className: 'btn-primary'
          },
          'background: cadetblue;',
          createStyle(
            'span',
            {
              className: 'btn__icon'
            },
            'color: ivory;'
          )
        );
        const expectedObject = {
          element: 'button',
          attrs: {
            className: 'btn-primary'
          },
          children: [
            {
              element: 'span',
              attrs: {
                className: 'btn__icon'
              },
              children: [],
              styles: 'display: inline-block;'
            },
            {
              element: 'span',
              attrs: {
                className: 'btn__icon'
              },
              children: [],
              styles: 'color: ivory;'
            }
          ],
          styles: 'background: cadetblue;'
        };

        expect(givenUsage).toEqual(expectedObject);
      });
    });

    describe('and style overrides style in mixin', () => {
      test('should throw Override Found error', () => {
        const givenUsage = createStyle(
          givenMixin,
          {
            className: 'btn-secondary'
          },
          createStyle(
            'span',
            {
              className: 'btn__icon'
            },
            'display: none;'
          )
        );

        const overrideFound = () => createCSS(givenUsage);
        expect(overrideFound).toThrow('[Override Found] The property `display` has already been defined');
      });
    });
  });
});
