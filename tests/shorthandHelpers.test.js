/*
 Testing shorthand helpers.
*/

const {
  margin,
  padding,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  border
} = require('../src/immutableStyles');


test('[shorthand helpers] margin', () => {
  expect(margin('10px')).toEqual(
    'margin-top: 10px;margin-right: 10px;margin-bottom: 10px;margin-left: 10px;'
  );
  expect(margin('10px', '20px')).toEqual(
    'margin-top: 10px;margin-right: 20px;margin-bottom: 10px;margin-left: 20px;'
  );
  expect(margin('10px', '20px', '30px')).toEqual(
    'margin-top: 10px;margin-right: 20px;margin-bottom: 30px;margin-left: 20px;'
  );
  expect(margin('10px', '20px', '30px', '40px')).toEqual(
    'margin-top: 10px;margin-right: 20px;margin-bottom: 30px;margin-left: 40px;'
  );
});


test('[shorthand helpers] padding', () => {
  expect(padding('10px')).toEqual(
    'padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;'
  );
  expect(padding('10px', '20px')).toEqual(
    'padding-top: 10px;padding-right: 20px;padding-bottom: 10px;padding-left: 20px;'
  );
  expect(padding('10px', '20px', '30px')).toEqual(
    'padding-top: 10px;padding-right: 20px;padding-bottom: 30px;padding-left: 20px;'
  );
  expect(padding('10px', '20px', '30px', '40px')).toEqual(
    'padding-top: 10px;padding-right: 20px;padding-bottom: 30px;padding-left: 40px;'
  );
});


test('[shorthand helpers] borderTop', () => {
  expect(borderTop('1px', 'solid', 'cadetblue')).toEqual(
    'border-top-width: 1px;border-top-style: solid;border-top-color: cadetblue;'
  );
});


test('[shorthand helpers] borderRight', () => {
  expect(borderRight('1px', 'solid', 'cadetblue')).toEqual(
    'border-right-width: 1px;border-right-style: solid;border-right-color: cadetblue;'
  );
});


test('[shorthand helpers] borderBottom', () => {
  expect(borderBottom('1px', 'solid', 'cadetblue')).toEqual(
    'border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: cadetblue;'
  );
});


test('[shorthand helpers] borderLeft', () => {
  expect(borderLeft('1px', 'solid', 'cadetblue')).toEqual(
    'border-left-width: 1px;border-left-style: solid;border-left-color: cadetblue;'
  );
});


test('[shorthand helpers] border', () => {
  expect(border('1px', 'solid', 'cadetblue')).toEqual(
    'border-top-width: 1px;border-top-style: solid;border-top-color: cadetblue;' +
    'border-right-width: 1px;border-right-style: solid;border-right-color: cadetblue;' +
    'border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: cadetblue;' +
    'border-left-width: 1px;border-left-style: solid;border-left-color: cadetblue;'
  );
});