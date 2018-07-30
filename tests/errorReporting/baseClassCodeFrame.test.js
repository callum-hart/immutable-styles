const fs = require('fs');

const { saveSourceMap, baseClassCodeFrame } = require('../../src/errorReporting');

const fileName = './tests/errorReporting/mocks/baseClassCodeFrame.jsx';

beforeAll(() => saveSourceMap(fileName, fs.readFileSync(fileName, 'utf8')));


describe('unknown baseclass', () => {
  const givenBaseClass = 'unknownBaseClass';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 4}, givenBaseClass);

    expect(lineNumber).toBe(4);
    expect(colNumber).toBe(26);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 5}, givenBaseClass);

    expect(lineNumber).toBe(5);
    expect(colNumber).toBe(27);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 6}, givenBaseClass);

    expect(lineNumber).toBe(6);
    expect(colNumber).toBe(28);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 9}, givenBaseClass);

    expect(lineNumber).toBe(9);
    expect(colNumber).toBe(31);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 12}, givenBaseClass);

    expect(lineNumber).toBe(13);
    expect(colNumber).toBe(16);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 16}, givenBaseClass);

    expect(lineNumber).toBe(17);
    expect(colNumber).toBe(16);
  });
});


describe('unknown baseclass with same name as CSS property', () => {
  const givenBaseClass = 'color';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 24}, givenBaseClass);

    expect(lineNumber).toBe(24);
    expect(colNumber).toBe(26);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 25}, givenBaseClass);

    expect(lineNumber).toBe(25);
    expect(colNumber).toBe(27);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 26}, givenBaseClass);

    expect(lineNumber).toBe(26);
    expect(colNumber).toBe(28);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 29}, givenBaseClass);

    expect(lineNumber).toBe(29);
    expect(colNumber).toBe(31);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 32}, givenBaseClass);

    expect(lineNumber).toBe(33);
    expect(colNumber).toBe(16);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 36}, givenBaseClass);

    expect(lineNumber).toBe(37);
    expect(colNumber).toBe(16);
  });
});


describe('unknown baseclass with same name as subclass', () => {
  const givenBaseClass = 'subClass';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 44}, givenBaseClass);

    expect(lineNumber).toBe(44);
    expect(colNumber).toBe(26);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 45}, givenBaseClass);

    expect(lineNumber).toBe(45);
    expect(colNumber).toBe(27);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 46}, givenBaseClass);

    expect(lineNumber).toBe(46);
    expect(colNumber).toBe(28);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 49}, givenBaseClass);

    expect(lineNumber).toBe(49);
    expect(colNumber).toBe(31);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 52}, givenBaseClass);

    expect(lineNumber).toBe(53);
    expect(colNumber).toBe(16);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 56}, givenBaseClass);

    expect(lineNumber).toBe(57);
    expect(colNumber).toBe(16);
  });
});


describe('unknown baseclass with same name as attribute name', () => {
  const givenBaseClass = 'pseudo';

  test('senarioOneDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 64}, givenBaseClass);

    expect(lineNumber).toBe(64);
    expect(colNumber).toBe(48);
  });


  test('senarioOneDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 65}, givenBaseClass);

    expect(lineNumber).toBe(65);
    expect(colNumber).toBe(32);
  });


  test('senarioTwoDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 66}, givenBaseClass);

    expect(lineNumber).toBe(66);
    expect(colNumber).toBe(49);
  });


  test('senarioTwoDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 67}, givenBaseClass);

    expect(lineNumber).toBe(67);
    expect(colNumber).toBe(33);
  });


  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 68}, givenBaseClass);

    expect(lineNumber).toBe(69);
    expect(colNumber).toBe(16);
  });


  test('senarioThreeDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 72}, givenBaseClass);

    expect(lineNumber).toBe(72);
    expect(colNumber).toBe(34);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 76}, givenBaseClass);

    expect(lineNumber).toBe(77);
    expect(colNumber).toBe(20);
  });


  test('senarioFourDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 80}, givenBaseClass);

    expect(lineNumber).toBe(80);
    expect(colNumber).toBe(36);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 84}, givenBaseClass);

    expect(lineNumber).toBe(86);
    expect(colNumber).toBe(16);
  });


  test('senarioFiveDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 89}, givenBaseClass);

    expect(lineNumber).toBe(90);
    expect(colNumber).toBe(16);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 94}, givenBaseClass);

    expect(lineNumber).toBe(96);
    expect(colNumber).toBe(16);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 100}, givenBaseClass);

    expect(lineNumber).toBe(101);
    expect(colNumber).toBe(16);
  });
});


describe('unknown baseclass with same name as attribute value', () => {
  const givenBaseClass = 'hover';

  test('senarioOneDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 109}, givenBaseClass);

    expect(lineNumber).toBe(109);
    expect(colNumber).toBe(48);
  });


  test('senarioOneDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 110}, givenBaseClass);

    expect(lineNumber).toBe(110);
    expect(colNumber).toBe(32);
  });


  test('senarioTwoDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 111}, givenBaseClass);

    expect(lineNumber).toBe(111);
    expect(colNumber).toBe(49);
  });


  test('senarioTwoDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 112}, givenBaseClass);

    expect(lineNumber).toBe(112);
    expect(colNumber).toBe(33);
  });


  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 113}, givenBaseClass);

    expect(lineNumber).toBe(114);
    expect(colNumber).toBe(16);
  });


  test('senarioThreeDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 117}, givenBaseClass);

    expect(lineNumber).toBe(117);
    expect(colNumber).toBe(34);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 121}, givenBaseClass);

    expect(lineNumber).toBe(122);
    expect(colNumber).toBe(20);
  });


  test('senarioFourDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 125}, givenBaseClass);

    expect(lineNumber).toBe(125);
    expect(colNumber).toBe(36);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 129}, givenBaseClass);

    expect(lineNumber).toBe(131);
    expect(colNumber).toBe(16);
  });


  test('senarioFiveDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 134}, givenBaseClass);

    expect(lineNumber).toBe(135);
    expect(colNumber).toBe(16);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 139}, givenBaseClass);

    expect(lineNumber).toBe(141);
    expect(colNumber).toBe(16);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 145}, givenBaseClass);

    expect(lineNumber).toBe(146);
    expect(colNumber).toBe(16);
  });
});


describe('unknown baseclass with same name as JSX tag', () => {
  test('senarioOne', () => {
    const givenBaseClass = 'senarioOne';
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 154}, givenBaseClass);

    expect(lineNumber).toBe(154);
    expect(colNumber).toBe(26);
  });


  test('senarioTwo', () => {
    const givenBaseClass = 'senarioTwo';
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 155}, givenBaseClass);

    expect(lineNumber).toBe(155);
    expect(colNumber).toBe(27);
  });


  test('senarioThree', () => {
    const givenBaseClass = 'senarioThree';
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 156}, givenBaseClass);

    expect(lineNumber).toBe(156);
    expect(colNumber).toBe(28);
  });


  test('senarioFour', () => {
    const givenBaseClass = 'senarioFour';
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 159}, givenBaseClass);

    expect(lineNumber).toBe(159);
    expect(colNumber).toBe(31);
  });


  test('senarioFive', () => {
    const givenBaseClass = 'senarioFive';
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 162}, givenBaseClass);

    expect(lineNumber).toBe(163);
    expect(colNumber).toBe(16);
  });


  test('senarioSix', () => {
    const givenBaseClass = 'senarioSix';
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 166}, givenBaseClass);

    expect(lineNumber).toBe(167);
    expect(colNumber).toBe(16);
  });
});


describe('unknown baseclass that matches a comment', () => {
  const givenBaseClass = 'unknownBaseClass';

  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 174}, givenBaseClass);

    expect(lineNumber).toBe(175);
    expect(colNumber).toBe(16);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 178}, givenBaseClass);

    expect(lineNumber).toBe(179);
    expect(colNumber).toBe(20);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 182}, givenBaseClass);

    expect(lineNumber).toBe(184);
    expect(colNumber).toBe(16);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 187}, givenBaseClass);

    expect(lineNumber).toBe(189);
    expect(colNumber).toBe(16);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = baseClassCodeFrame({fileName, lineNumber: 193}, givenBaseClass);

    expect(lineNumber).toBe(194);
    expect(colNumber).toBe(16);
  });
});
