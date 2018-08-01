/*
 Tests should cover:
 - formatting - are attributes found given a range of formatting scenarios
 - identity - is the correct attribute found

 Each formatting senario is assigned to a number (currently 1-6).
 Decimal numbers represent a variation of the formatting major (used only when the order of attributes changes).
*/


const fs = require('fs');

const { saveSourceMap, attributeCodeFrame } = require('../../src/errorReporting');

const fileName = './tests/errorReporting/mocks/attributeCodeFrame.jsx';

beforeAll(() => saveSourceMap(fileName, fs.readFileSync(fileName, 'utf8')));


describe('invalid attribute', () => {
  const givenAttr = 'invalidAttr';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 4}, givenAttr);

    expect(lineNumber).toBe(4);
    expect(colNumber).toBe(15);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 5}, givenAttr);

    expect(lineNumber).toBe(5);
    expect(colNumber).toBe(16);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 6}, givenAttr);

    expect(lineNumber).toBe(6);
    expect(colNumber).toBe(17);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 9}, givenAttr);

    expect(lineNumber).toBe(9);
    expect(colNumber).toBe(20);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 12}, givenAttr);

    expect(lineNumber).toBe(13);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 16}, givenAttr);

    expect(lineNumber).toBe(17);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute with same name as CSS property', () => {
  const givenAttr = 'color';

  test('senarioOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 24}, givenAttr);

    expect(lineNumber).toBe(24);
    expect(colNumber).toBe(15);
  });


  test('senarioTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 25}, givenAttr);

    expect(lineNumber).toBe(25);
    expect(colNumber).toBe(16);
  });


  test('senarioThree', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 26}, givenAttr);

    expect(lineNumber).toBe(26);
    expect(colNumber).toBe(17);
  });


  test('senarioFour', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 29}, givenAttr);

    expect(lineNumber).toBe(29);
    expect(colNumber).toBe(20);
  });


  test('senarioFive', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 32}, givenAttr);

    expect(lineNumber).toBe(33);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 36}, givenAttr);

    expect(lineNumber).toBe(37);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute with same name as CSS className', () => {
  const givenAttr = 'aClass';

  test('senarioOneDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 44}, givenAttr);

    expect(lineNumber).toBe(44);
    expect(colNumber).toBe(40);
  });


  test('senarioOneDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 45}, givenAttr);

    expect(lineNumber).toBe(45);
    expect(colNumber).toBe(21);
  });


  test('senarioTwoDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 46}, givenAttr);

    expect(lineNumber).toBe(46);
    expect(colNumber).toBe(41);
  });


  test('senarioTwoDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 47}, givenAttr);

    expect(lineNumber).toBe(47);
    expect(colNumber).toBe(22);
  });


  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 48}, givenAttr);

    expect(lineNumber).toBe(49);
    expect(colNumber).toBe(5);
  });


  test('senarioThreeDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 52}, givenAttr);

    expect(lineNumber).toBe(52);
    expect(colNumber).toBe(23);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 56}, givenAttr);

    expect(lineNumber).toBe(57);
    expect(colNumber).toBe(9);
  });


  test('senarioFourDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 60}, givenAttr);

    expect(lineNumber).toBe(60);
    expect(colNumber).toBe(25);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 64}, givenAttr);

    expect(lineNumber).toBe(66);
    expect(colNumber).toBe(5);
  });


  test('senarioFiveDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 69}, givenAttr);

    expect(lineNumber).toBe(70);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 74}, givenAttr);

    expect(lineNumber).toBe(76);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 80}, givenAttr);

    expect(lineNumber).toBe(81);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute with same name as baseclass', () => {
  const givenAttr = 'baseClass';

  test('senarioOneDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 89}, givenAttr);

    expect(lineNumber).toBe(89);
    expect(colNumber).toBe(52);
  });


  test('senarioOneDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 90}, givenAttr);

    expect(lineNumber).toBe(90);
    expect(colNumber).toBe(21);
  });


  test('senarioTwoDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 91}, givenAttr);

    expect(lineNumber).toBe(91);
    expect(colNumber).toBe(53);
  });


  test('senarioTwoDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 92}, givenAttr);

    expect(lineNumber).toBe(92);
    expect(colNumber).toBe(22);
  });


  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 93}, givenAttr);

    expect(lineNumber).toBe(94);
    expect(colNumber).toBe(5);
  });


  test('senarioThreeDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 97}, givenAttr);

    expect(lineNumber).toBe(97);
    expect(colNumber).toBe(23);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 101}, givenAttr);

    expect(lineNumber).toBe(102);
    expect(colNumber).toBe(9);
  });


  test('senarioFourDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 105}, givenAttr);

    expect(lineNumber).toBe(105);
    expect(colNumber).toBe(25);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 109}, givenAttr);

    expect(lineNumber).toBe(111);
    expect(colNumber).toBe(5);
  });


  test('senarioFiveDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 114}, givenAttr);

    expect(lineNumber).toBe(115);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 119}, givenAttr);

    expect(lineNumber).toBe(121);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 125}, givenAttr);

    expect(lineNumber).toBe(126);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute with same name as subclass', () => {
  const givenAttr = 'subClass';

  test('senarioOneDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 134}, givenAttr);

    expect(lineNumber).toBe(134);
    expect(colNumber).toBe(52);
  });


  test('senarioOneDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 135}, givenAttr);

    expect(lineNumber).toBe(135);
    expect(colNumber).toBe(21);
  });


  test('senarioTwoDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 136}, givenAttr);

    expect(lineNumber).toBe(136);
    expect(colNumber).toBe(53);
  });


  test('senarioTwoDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 137}, givenAttr);

    expect(lineNumber).toBe(137);
    expect(colNumber).toBe(22);
  });


  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 138}, givenAttr);

    expect(lineNumber).toBe(139);
    expect(colNumber).toBe(5);
  });


  test('senarioThreeDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 142}, givenAttr);

    expect(lineNumber).toBe(142);
    expect(colNumber).toBe(23);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 146}, givenAttr);

    expect(lineNumber).toBe(147);
    expect(colNumber).toBe(9);
  });


  test('senarioFourDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 150}, givenAttr);

    expect(lineNumber).toBe(150);
    expect(colNumber).toBe(25);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 154}, givenAttr);

    expect(lineNumber).toBe(156);
    expect(colNumber).toBe(5);
  });


  test('senarioFiveDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 159}, givenAttr);

    expect(lineNumber).toBe(160);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 164}, givenAttr);

    expect(lineNumber).toBe(166);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 170}, givenAttr);

    expect(lineNumber).toBe(171);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute that partially matches a valid attribute', () => {
  const givenAttr = 'pseu';

  test('senarioOneDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 179}, givenAttr);

    expect(lineNumber).toBe(179);
    expect(colNumber).toBe(37);
  });


  test('senarioOneDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 180}, givenAttr);

    expect(lineNumber).toBe(180);
    expect(colNumber).toBe(21);
  });


  test('senarioTwoDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 181}, givenAttr);

    expect(lineNumber).toBe(181);
    expect(colNumber).toBe(38);
  });


  test('senarioTwoDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 182}, givenAttr);

    expect(lineNumber).toBe(182);
    expect(colNumber).toBe(22);
  });


  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 183}, givenAttr);

    expect(lineNumber).toBe(184);
    expect(colNumber).toBe(5);
  });


  test('senarioThreeDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 187}, givenAttr);

    expect(lineNumber).toBe(187);
    expect(colNumber).toBe(23);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 191}, givenAttr);

    expect(lineNumber).toBe(192);
    expect(colNumber).toBe(9);
  });


  test('senarioFourDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 195}, givenAttr);

    expect(lineNumber).toBe(195);
    expect(colNumber).toBe(25);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 199}, givenAttr);

    expect(lineNumber).toBe(201);
    expect(colNumber).toBe(5);
  });


  test('senarioFiveDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 204}, givenAttr);

    expect(lineNumber).toBe(205);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 209}, givenAttr);

    expect(lineNumber).toBe(211);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 215}, givenAttr);

    expect(lineNumber).toBe(216);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute that matches name of JSX tag', () => {
  test('senarioOne', () => {
    const givenAttr = 'senarioOne';
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 224}, givenAttr);

    expect(lineNumber).toBe(224);
    expect(colNumber).toBe(15);
  });


  test('senarioTwo', () => {
    const givenAttr = 'senarioTwo';
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 225}, givenAttr);

    expect(lineNumber).toBe(225);
    expect(colNumber).toBe(16);
  });


  test('senarioThree', () => {
    const givenAttr = 'senarioThree';
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 226}, givenAttr);

    expect(lineNumber).toBe(226);
    expect(colNumber).toBe(17);
  });


  test('senarioFour', () => {
    const givenAttr = 'senarioFour';
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 229}, givenAttr);

    expect(lineNumber).toBe(229);
    expect(colNumber).toBe(20);
  });


  test('senarioFive', () => {
    const givenAttr = 'senarioFive';
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 232}, givenAttr);

    expect(lineNumber).toBe(233);
    expect(colNumber).toBe(5);
  });


  test('senarioSix', () => {
    const givenAttr = 'senarioSix';
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 236}, givenAttr);

    expect(lineNumber).toBe(237);
    expect(colNumber).toBe(5);
  });
});


describe('invalid attribute that matches a comment', () => {
  const givenAttr = 'invalidAttr';

  test('senarioThreeDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 244}, givenAttr);

    expect(lineNumber).toBe(245);
    expect(colNumber).toBe(5);
  });


  test('senarioFourDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 248}, givenAttr);

    expect(lineNumber).toBe(249);
    expect(colNumber).toBe(9);
  });


  test('senarioFiveDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 252}, givenAttr);

    expect(lineNumber).toBe(254);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotOne', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 257}, givenAttr);

    expect(lineNumber).toBe(259);
    expect(colNumber).toBe(5);
  });


  test('senarioSixDotTwo', () => {
    const { lineNumber, colNumber } = attributeCodeFrame({fileName, lineNumber: 263}, givenAttr);

    expect(lineNumber).toBe(264);
    expect(colNumber).toBe(5);
  });
});
