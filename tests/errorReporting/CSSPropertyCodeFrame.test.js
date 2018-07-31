const fs = require('fs');

const { saveSourceMap, CSSPropertyCodeFrame } = require('../../src/errorReporting');

const fileName = './tests/errorReporting/mocks/CSSPropertyCodeFrame.jsx';

beforeAll(() => saveSourceMap(fileName, fs.readFileSync(fileName, 'utf8')));


describe('CSS property', () => {
  const givenProperty = 'color';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 4}, givenProperty);

    expect(lineNumber).toBe(4);
    expect(colNumber).toBe(15);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 5}, givenProperty);

    expect(lineNumber).toBe(5);
    expect(colNumber).toBe(19);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 6}, givenProperty);

    expect(lineNumber).toBe(7);
    expect(colNumber).toBe(5);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 9}, givenProperty);

    expect(lineNumber).toBe(10);
    expect(colNumber).toBe(5);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 12}, givenProperty);

    expect(lineNumber).toBe(14);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 16}, givenProperty);

    expect(lineNumber).toBe(19);
    expect(colNumber).toBe(5);
  });
});


describe('CSS property with same name as attribute name', () => {
  const givenProperty = 'color';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 24}, givenProperty);

    expect(lineNumber).toBe(24);
    expect(colNumber).toBe(21);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 25}, givenProperty);

    expect(lineNumber).toBe(25);
    expect(colNumber).toBe(25);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 26}, givenProperty);

    expect(lineNumber).toBe(27);
    expect(colNumber).toBe(5);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 29}, givenProperty);

    expect(lineNumber).toBe(30);
    expect(colNumber).toBe(5);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 32}, givenProperty);

    expect(lineNumber).toBe(34);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 36}, givenProperty);

    expect(lineNumber).toBe(39);
    expect(colNumber).toBe(5);
  });
});


describe('CSS property with same name as attribute value', () => {
  const givenProperty = 'color';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 44}, givenProperty);

    expect(lineNumber).toBe(44);
    expect(colNumber).toBe(33);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 45}, givenProperty);

    expect(lineNumber).toBe(45);
    expect(colNumber).toBe(37);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 46}, givenProperty);

    expect(lineNumber).toBe(47);
    expect(colNumber).toBe(5);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 49}, givenProperty);

    expect(lineNumber).toBe(50);
    expect(colNumber).toBe(5);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 52}, givenProperty);

    expect(lineNumber).toBe(54);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 56}, givenProperty);

    expect(lineNumber).toBe(59);
    expect(colNumber).toBe(5);
  });
});


describe('CSS property with same name as JSX tag', () => {
  test('senarioOne', () => {
    const givenProperty = 'senarioOne';
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 64}, givenProperty);

    expect(lineNumber).toBe(64);
    expect(colNumber).toBe(15);
  });


  test('senarioTwo', () => {
    const givenProperty = 'senarioTwo';
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 65}, givenProperty);

    expect(lineNumber).toBe(65);
    expect(colNumber).toBe(19);
  });


  test('senarioThree', () => {
    const givenProperty = 'senarioThree';
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 66}, givenProperty);

    expect(lineNumber).toBe(67);
    expect(colNumber).toBe(5);
  });


  test('senarioFour', () => {
    const givenProperty = 'senarioFour';
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 69}, givenProperty);

    expect(lineNumber).toBe(70);
    expect(colNumber).toBe(5);
  });


  test('senarioFive', () => {
    const givenProperty = 'senarioFive';
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 72}, givenProperty);

    expect(lineNumber).toBe(74);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const givenProperty = 'senarioSix';
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 76}, givenProperty);

    expect(lineNumber).toBe(79);
    expect(colNumber).toBe(5);
  });
});


describe('CSS property that matches a comment', () => {
  const givenProperty = 'color';

  test('senarioOneDotOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 84}, givenProperty);

    expect(lineNumber).toBe(84);
    expect(colNumber).toBe(46);
  });


  test('senarioOneDotTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 85}, givenProperty);

    expect(lineNumber).toBe(85);
    expect(colNumber).toBe(21);
  });


  test('senarioTwoDotOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 86}, givenProperty);

    expect(lineNumber).toBe(86);
    expect(colNumber).toBe(50);
  });


  test('senarioTwoDotTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 87}, givenProperty);

    expect(lineNumber).toBe(87);
    expect(colNumber).toBe(25);
  });


  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 88}, givenProperty);

    expect(lineNumber).toBe(90);
    expect(colNumber).toBe(5);
  });


  test('senarioThreeDotTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 92}, givenProperty);

    expect(lineNumber).toBe(93);
    expect(colNumber).toBe(5);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 96}, givenProperty);

    expect(lineNumber).toBe(98);
    expect(colNumber).toBe(5);
  });


  test('senarioFourDotTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 100}, givenProperty);

    expect(lineNumber).toBe(101);
    expect(colNumber).toBe(5);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 104}, givenProperty);

    expect(lineNumber).toBe(107);
    expect(colNumber).toBe(5);
  });


  test('senarioFiveDotTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 109}, givenProperty);

    expect(lineNumber).toBe(111);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 114}, givenProperty);

    expect(lineNumber).toBe(118);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = CSSPropertyCodeFrame({fileName, lineNumber: 120}, givenProperty);

    expect(lineNumber).toBe(123);
    expect(colNumber).toBe(5);
  });
});


// describe('CSS property that partially matches another', () => {
// });


// describe('CSS property that matches CSS value', () => {
// });
