let combinations = {};

function saveCombination(key, value) {
  combinations[key] ? combinations[key].push(value) : combinations[key] = [value];
}

function buildAnyCombinations(property, index, properties) {
  combinations[property] = properties.filter(prop => prop !== property);
}

function buildTrblCombinations(shorthand, longhand) {
  saveCombination(shorthand, longhand);
  combinations[longhand] = [shorthand];
}

function buildBorderCombinations(borderSide, property) {
  saveCombination('border', property);
  saveCombination(borderSide, property);
  combinations[property] = ['border', borderSide];
}

[
  'background',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',
  'background-attachment'
].forEach(buildAnyCombinations);

[
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left'
].forEach(property => buildTrblCombinations('margin', property));

[
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left'
].forEach(property => buildTrblCombinations('padding', property));

[
  'border-top',
  'border-right',
  'border-bottom',
  'border-left'
].forEach(property => buildTrblCombinations('border', property));

[
  'border-top-width',
  'border-top-style',
  'border-top-color'
].forEach(property => buildBorderCombinations('border-top', property));

[
  'border-right-width',
  'border-right-style',
  'border-right-color'
].forEach(property => buildBorderCombinations('border-right', property));

[
  'border-bottom-width',
  'border-bottom-style',
  'border-bottom-color'
].forEach(property => buildBorderCombinations('border-bottom', property));

[
  'border-left-width',
  'border-left-style',
  'border-left-color'
].forEach(property => buildBorderCombinations('border-left', property));

// TODO: add the rest...

module.exports = combinations;
