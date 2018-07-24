const fs = require('fs');

const { saveSourceMap, invalidAttrCodeFrame } = require('../../src/errorReporting');

const givenFileName = './tests/errorReporting/mocks/invalidAttrCodeFrame.jsx';

beforeAll(() => saveSourceMap(givenFileName, fs.readFileSync(givenFileName, 'utf8')));


test('Locate attr on same line as opening tag', () => {
  const givenAttr = 'foo';
  const { 
    lineNumber, 
    colNumber 
  } = invalidAttrCodeFrame({fileName: givenFileName, lineNumber: 2}, givenAttr);
  
  expect(lineNumber).toBe(2);
  expect(colNumber).toBe(6);
});

test('Locate attr on line below opening tag', () => {
  const givenAttr = 'bar';
  const { 
    lineNumber, 
    colNumber 
  } = invalidAttrCodeFrame({fileName: givenFileName, lineNumber: 6}, givenAttr);
  
  expect(lineNumber).toBe(7);
  expect(colNumber).toBe(5);
});
