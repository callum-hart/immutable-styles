let combinations = {};

function saveCombination(key, value) {
  combinations[key] ? combinations[key].push(value) : combinations[key] = [value];
}

function buildAnyCombinations(property, index, properties) {
  combinations[property] = properties.filter(prop => prop !== property);
}

function buildShortAndLongHandCombinations(shorthand, longhand) {
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
].forEach(property => buildShortAndLongHandCombinations('margin', property));

[
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left'
].forEach(property => buildShortAndLongHandCombinations('padding', property));

[
  'border-top',
  'border-right',
  'border-bottom',
  'border-left'
].forEach(property => buildShortAndLongHandCombinations('border', property));

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

[
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius'
].forEach(property => buildShortAndLongHandCombinations('border-radius', property));

[
  'column-rule-width',
  'column-rule-style',
  'column-rule-color'
].forEach(property => buildShortAndLongHandCombinations('column-rule', property));

[
  'column-width',
  'column-count'
].forEach(property => buildShortAndLongHandCombinations('columns', property));

[
  'flex-grow',
  'flex-shrink',
  'flex-basis'
].forEach(property => buildShortAndLongHandCombinations('flex', property));

[
  'flex-direction',
  'flex-wrap'
].forEach(property => buildShortAndLongHandCombinations('flex-flow', property));

[
  'font-style',
  'font-variant',
  'font-weight',
  'font-size',
  'line-height',
  'font-family'
].forEach(property => buildShortAndLongHandCombinations('font', property));

[
  'grid-template-rows',
  'grid-template-columns',
  'grid-template-areas',
  'grid-auto-rows',
  'grid-auto-columns',
  'grid-auto-flow'
].forEach(property => buildShortAndLongHandCombinations('grid', property));

[
  'grid-row-start',
  'grid-column-start',
  'grid-row-end',
  'grid-column-end'
].forEach(property => buildShortAndLongHandCombinations('grid-area', property));

[
  'grid-column-start',
  'grid-column-end'
].forEach(property => buildShortAndLongHandCombinations('grid-column', property));

[
  'grid-row-start',
  'grid-row-end'
].forEach(property => buildShortAndLongHandCombinations('grid-row', property));

[
  'grid-template-rows',
  'grid-template-columns',
  'grid-template-areas'
].forEach(property => buildShortAndLongHandCombinations('grid-template', property));

[
  'list-style-type',
  'list-style-image',
  'list-style-position'
].forEach(property => buildShortAndLongHandCombinations('list-style', property));

[
  'offset-position',
  'offset-path',
  'offset-distance',
  'offset-anchor',
  'offset-rotate'
].forEach(property => buildShortAndLongHandCombinations('offset', property));

[
  'outline-style',
  'outline-width',
  'outline-color'
].forEach(property => buildShortAndLongHandCombinations('outline', property));

[
  'overflow-x',
  'overflow-y'
].forEach(property => buildShortAndLongHandCombinations('overflow', property));

[
  'align-content',
  'justify-content'
].forEach(property => buildShortAndLongHandCombinations('place-content', property));

[
  'align-items',
  'justify-items'
].forEach(property => buildShortAndLongHandCombinations('place-items', property));

[
  'align-self',
  'justify-self'
].forEach(property => buildShortAndLongHandCombinations('place-self', property));

[
  'text-decoration-line',
  'text-decoration-color',
  'text-decoration-style'
].forEach(property => buildShortAndLongHandCombinations('text-decoration', property));

[
  'transition-property',
  'transition-duration',
  'transition-timing-function',
  'transition-delay'
].forEach(property => buildShortAndLongHandCombinations('transition', property));

[
  'animation-name',
  'animation-duration',
  'animation-timing-function',
  'animation-delay',
  'animation-iteration-count',
  'animation-direction',
  'animation-fill-mode',
  'animation-play-state'
].forEach(property => buildShortAndLongHandCombinations('animation', property));

// TODO:
// - skip any failing errorReporting tests
// - rename elementPropertyWhitelist to forbiddenElementPropertyCombinations

module.exports = combinations;
