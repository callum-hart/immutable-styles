/*
 Tests should cover:
 - formatting - are attributes found given a range of formatting scenarios
 - identity - is the correct attribute found

 Each formatting senario is assigned to a number (currently 1-6).
 Decimal numbers represent a variation of the formatting major (used when only the order of attributes is changed).
*/


const fs = require('fs');

const { saveSourceMap, invalidAttrCodeFrame } = require('../../src/errorReporting');

const fileName = './tests/errorReporting/mocks/invalidAttrCodeFrame.jsx';

beforeAll(() => saveSourceMap(fileName, fs.readFileSync(fileName, 'utf8')));


describe('invalid attribute', () => {
  const givenAttr = 'invalidAttr';

  test('senarioOne', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 4}, givenAttr);

    expect(lineNumber).toBe(4);
    expect(colNumber).toBe(15);
  });


  test('senarioTwo', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 5}, givenAttr);

    expect(lineNumber).toBe(5);
    expect(colNumber).toBe(16);
  });


  test('senarioThree', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 6}, givenAttr);

    expect(lineNumber).toBe(6);
    expect(colNumber).toBe(17);
  });


  test('senarioFour', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 9}, givenAttr);

    expect(lineNumber).toBe(9);
    expect(colNumber).toBe(20);
  });


  test('senarioFive', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 12}, givenAttr);

    expect(lineNumber).toBe(13);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 16}, givenAttr);

    expect(lineNumber).toBe(17);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute with same name as CSS property', () => {
  const givenAttr = 'color';

  test('senarioOne', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 24}, givenAttr);

    expect(lineNumber).toBe(24);
    expect(colNumber).toBe(15);
  });


  test('senarioTwo', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 25}, givenAttr);

    expect(lineNumber).toBe(25);
    expect(colNumber).toBe(16);
  });


  test('senarioThree', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 26}, givenAttr);

    expect(lineNumber).toBe(26);
    expect(colNumber).toBe(17);
  });


  test('senarioFour', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 29}, givenAttr);

    expect(lineNumber).toBe(29);
    expect(colNumber).toBe(20);
  });


  test('senarioFive', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 32}, givenAttr);

    expect(lineNumber).toBe(33);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 36}, givenAttr);

    expect(lineNumber).toBe(37);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute with same name as CSS className', () => {
  const givenAttr = 'aClass';

  test('senarioOneDotOne', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 44}, givenAttr);

    expect(lineNumber).toBe(44);
    expect(colNumber).toBe(40);
  });


  test('senarioOneDotTwo', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 45}, givenAttr);

    expect(lineNumber).toBe(45);
    expect(colNumber).toBe(21);
  });


  test('senarioTwoDotOne', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 46}, givenAttr);

    expect(lineNumber).toBe(46);
    expect(colNumber).toBe(41);
  });


  test('senarioTwoDotTwo', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 47}, givenAttr);

    expect(lineNumber).toBe(47);
    expect(colNumber).toBe(22);
  });


  test('senarioThreeDotOne', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 48}, givenAttr);

    expect(lineNumber).toBe(49);
    expect(colNumber).toBe(5);
  });


  test('senarioThreeDotTwo', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 52}, givenAttr);

    expect(lineNumber).toBe(52);
    expect(colNumber).toBe(23);
  });


  test('senarioFourDotOne', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 56}, givenAttr);

    expect(lineNumber).toBe(57);
    expect(colNumber).toBe(9);
  });


  test('senarioFourDotTwo', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 60}, givenAttr);

    expect(lineNumber).toBe(60);
    expect(colNumber).toBe(25);
  });


  test('senarioFiveDotOne', () => {
    const {
      lineNumber,
      colNumber
    } = invalidAttrCodeFrame({fileName, lineNumber: 64}, givenAttr);

    expect(lineNumber).toBe(66);
    expect(colNumber).toBe(5);
  });

  // TODO: continue from here... (senarioFiveDotTwo)
});


// describe('invalid attribute with same name as baseclass', () => {
// });


// describe('invalid attribute with same name as subclass', () => {
// });


// describe('invalid attribute that partially matches a valid attribute', () => {
// });


// describe('invalid attribute that matches name of JSX tag', () => {
// });
