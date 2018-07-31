const BLANK = '';
const SPACE = ' ';
const TAB = SPACE.repeat(2);
const SOURCE_MAPS = new Map();


function saveSourceMap(fileName, fileSource) {
  SOURCE_MAPS.set(fileName, fileSource);
}

function clearSourceMaps() {
  SOURCE_MAPS.clear();
}

function shouldLogErrorReport(attrs) {
  return typeof(attrs) !== 'undefined' &&
    typeof(attrs.fileName) !== 'undefined' &&
    typeof(attrs.lineNumber) !== 'undefined';
}

function getCodeFromLine({fileName, lineNumber}) {
  return SOURCE_MAPS.get(fileName)
          .split(/\n/)
          .slice(lineNumber - 1)
          .join('\n');
}

function forAttr(source) {
  // from the opening < to the first occurance of the closing >
  return getCodeFromLine(source).match(/^\s*<([\s\S]*?)>/)[0];
}

function forDeclaration(source, CSSProperty, CSSValue) {
  return getCodeFromLine(source).match(
    new RegExp(`[\\s\\S]*?${declarationMatcher(CSSProperty, CSSValue)}`, 'm')
  )[0];
}

function declarationMatcher(CSSProperty, CSSValue = BLANK) {
  // lookahead to ensure property is not within a comment
  return `${CSSProperty}(?!.+})\\s*:\\s+${CSSValue}.*$`;
}

function getCodeFrame(code, startingLineNumber, matcher, fragment) {
  let problemLineNumber;
  let problemColNumber;
  // prefix each loc with line number & point to the error with carets
  const codeFrame = code.split(/\n/)
    .map((loc, i) => {
      const lineNumber = `${startingLineNumber + i}${SPACE}|${SPACE}`;
      const match = new RegExp(matcher).exec(loc);

      if (match) {
        problemLineNumber = startingLineNumber + i;
        problemColNumber = match.index + 1;

        return `>${SPACE}${lineNumber}${loc}\n${TAB}${SPACE.repeat(lineNumber.length + match.index)}${'^'.repeat(fragment.length)}`;
      }
      return `${TAB}${lineNumber}${loc}`;
  })
  .join('\n');

  return {
    lineNumber: problemLineNumber,
    colNumber: problemColNumber,
    codeFrame
  }
}

function invalidAttrCodeFrame(source, attr) {
  return getCodeFrame(
    forAttr(source),
    source.lineNumber,
    `${attr}(?!\\w|"|')`,
    attr
  );
}

// TODO: could this be deprecated in favour of `invalidAttrCodeFrame`?
// i.e: invalidAttrCodeFrame(source, minWidthIfAny ? 'minWidth' : 'maxWidth')
function mediaQueryCodeFrame(source, minWidthIfAny) {
  return getCodeFrame(
    forAttr(source),
    source.lineNumber,
    minWidthIfAny ? 'minWidth' : 'maxWidth',
    minWidthIfAny ? 'minWidth' : 'maxWidth'
  );
}

function baseClassCodeFrame(source, baseClass) {
  return getCodeFrame(
    forAttr(source),
    source.lineNumber,
    `${baseClass}\\.`,
    baseClass
  );
}

function CSSPropertyCodeFrame(source, CSSProperty, CSSValue) {
  return getCodeFrame(
    forDeclaration(source, CSSProperty, CSSValue),
    source.lineNumber,
    declarationMatcher(CSSProperty),
    CSSProperty
  );
}

module.exports = {
  saveSourceMap,
  clearSourceMaps,
  shouldLogErrorReport,
  invalidAttrCodeFrame,
  mediaQueryCodeFrame,
  baseClassCodeFrame,
  CSSPropertyCodeFrame
}
