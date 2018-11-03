const {
  BLANK,
  SPACE,
  TAB,
  DOT,
  COMMA
} = require('./constants');


const SOURCE_MAPS = new Map();

const END_FORMAT = '\x1b[0m';

const color = {
  red: text => `\x1b[31m${text}${END_FORMAT}`,
  dim: text => `\x1b[2m${text}${END_FORMAT}`
}

const text = {
  bold: text => `\x1b[1m${text}${END_FORMAT}`,
  underline: text => `\x1b[4m${text}${END_FORMAT}`
}

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

function chunkArray(array, chunk = 10) {
  if (array.length === 0) {
    return [];
  } else {
    return [array.slice(0,chunk)].concat(chunkArray(array.slice(chunk), chunk));
  }
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

        return `${color.red('>')}${SPACE}${lineNumber}${loc}`.concat(
          `\n${TAB}${SPACE.repeat(lineNumber.length + match.index)}${color.red('^').repeat(fragment.length)}`
        );
      }
      return `${TAB}${color.dim(`${lineNumber}${loc}`)}`;
  })
  .join('\n');

  return {
    lineNumber: problemLineNumber,
    colNumber: problemColNumber,
    codeFrame
  }
}

function attributeCodeFrame(source, attr) {
  return getCodeFrame(
    forAttr(source),
    source.lineNumber,
    `${attr}(?!\\w|"|')`,
    attr
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

function logHeading(errorName) {
  console.log(`\n${color.red(text.bold(`[${errorName}]`))}`);
}

function logFile(filePath, lineNumber, colNumber) {
  // filePath = 'aFileWithoutPath.iss.jsx';
  const [fullPath, pathToFile, fileName] = filePath.match(/(.+[\/])(.+)/) || [null, null, filePath];

  console.log(`${TAB}`.concat(pathToFile
    ? color.dim(pathToFile)
    : BLANK
  )
  .concat(text.bold(fileName))
  .concat(lineNumber && colNumber
    ? text.bold(color.dim(`:${lineNumber}:${colNumber}`))
    : BLANK
  ));
}

function logInvalidAttribute(source, attr, permittedAttrs) {
  if (shouldLogErrorReport(source)) {
    const { lineNumber, colNumber, codeFrame } = attributeCodeFrame(source, attr);

    logHeading('Invalid Attribute');
    logFile(source.fileName, lineNumber, colNumber);
    console.log(`\n\`${attr}\` is not a valid attribute:\n`)
    console.log(codeFrame);
    console.log(`\nOnly the following attributes are permitted:\n`);
    chunkArray(permittedAttrs.filter(attr => attr !== '__source'))
      .map(chunk => chunk.join(`${COMMA}${SPACE}`))
      .forEach(chunk => console.log(`${TAB}${chunk}`));
    console.log(`\n`
      .concat(attr === 'id'
        ? `${text.underline('Hint')}: IDs cannot be used for styling, use className instead.\n`
        : BLANK
      )
      .concat(attr === 'class'
        ? `${text.underline('Hint')}: perhaps you meant className?\n`
        : BLANK
      )
    );
  }
}

function logDuplicateProperty(source, property, value) {
  if (shouldLogErrorReport(source)) {
    const { lineNumber, colNumber, codeFrame } = CSSPropertyCodeFrame(source, property, value);

    logHeading('Duplicate Property');
    logFile(source.fileName, lineNumber, colNumber);
    console.log(`\nThe property \`${property}\` has been defined twice:\n`)
    console.log(codeFrame);
    console.log('\nThe first occurrence is overridden by the second.');
    console.log(`\n${text.underline('Hint')}: remove either one.\n`);
  }
}

function logExactOverrideFound(overriddenSource, overridingSource, property) {
  if (
    shouldLogErrorReport(overriddenSource) &&
    shouldLogErrorReport(overridingSource)
  ) {
    const overriddenCodeFrame = CSSPropertyCodeFrame(overriddenSource, property)
    const overridingCodeFrame = CSSPropertyCodeFrame(overridingSource, property);

    logHeading('Override Found');
    console.log(`\nThe property \`${property}\` is defined here:`);
    logFile(overriddenSource.fileName, overriddenCodeFrame.lineNumber, overriddenCodeFrame.colNumber);
    console.log(`\n${overriddenCodeFrame.codeFrame}`);
    console.log('\nAnd again here:');
    logFile(overridingSource.fileName, overridingCodeFrame.lineNumber, overridingCodeFrame.colNumber);
    console.log(`\n${overridingCodeFrame.codeFrame}`);
    console.log('\nThe first occurrence is overridden by the second.\n');
  }
}

function logPartialOverrideFound(overriddenSource, overridingSource, overriddenProperty, overridingProperty) {
  if (
    shouldLogErrorReport(overriddenSource) &&
    shouldLogErrorReport(overridingSource)
  ) {
  const overriddenCodeFrame = CSSPropertyCodeFrame(overriddenSource, overriddenProperty)
  const overridingCodeFrame = CSSPropertyCodeFrame(overridingSource, overridingProperty);

  logHeading('Partial Override Found');
  console.log(`\nThe property \`${overriddenProperty}\` is defined here:`);
  logFile(overriddenSource.fileName, overriddenCodeFrame.lineNumber, overriddenCodeFrame.colNumber);
  console.log(`\n${overriddenCodeFrame.codeFrame}`);
  console.log(`\nWhich is overridden by \`${overridingProperty}\`:`);
  logFile(overridingSource.fileName, overridingCodeFrame.lineNumber, overridingCodeFrame.colNumber);
  console.log(`\n${overridingCodeFrame.codeFrame}`);
  console.log('\nThe first occurrence is overridden by the second.\n');
 }
}

function logNestedMediaQuery(outerMediaSource, outerMinWidthIfAny, innerMediaSource, innerMinWidthIfAny) {
  if (
    shouldLogErrorReport(outerMediaSource) &&
    shouldLogErrorReport(innerMediaSource)
  ) {
    const outerMediaCodeFrame = attributeCodeFrame(
      outerMediaSource,
      outerMinWidthIfAny ? 'minWidth' : 'maxWidth'
    );
    const innerMediaCodeFrame = attributeCodeFrame(
      innerMediaSource,
      innerMinWidthIfAny ? 'minWidth' : 'maxWidth'
    );

    logHeading('Nested Media Query');
    console.log('\nA media query cannot be nested inside another media query.\n');
    console.log('Outer media query:');
    logFile(outerMediaSource.fileName, outerMediaCodeFrame.lineNumber, outerMediaCodeFrame.colNumber);
    console.log(`\n${outerMediaCodeFrame.codeFrame}`);
    console.log('\nInner media query:');
    logFile(innerMediaSource.fileName, innerMediaCodeFrame.lineNumber, innerMediaCodeFrame.colNumber);
    console.log(`\n${innerMediaCodeFrame.codeFrame}\n`);
  }
}

function logUnknownBaseClass(source, baseClass) {
  if (shouldLogErrorReport(source)) {
    const { lineNumber, colNumber, codeFrame } = baseClassCodeFrame(source, baseClass);

    logHeading('Unknown Base Class');
    logFile(source.fileName, lineNumber, colNumber);
    console.log(`\nThe base class \`${baseClass}\` does not exist:\n`);
    console.log(`${codeFrame}\n`);
  }
}

function logNestedSubclass(source, className) {
  if (shouldLogErrorReport(source)) {
    const baseClass = className.split(DOT)[0];
    const { lineNumber, colNumber, codeFrame } = baseClassCodeFrame(source, baseClass);

    logHeading('Nested Subclass');
    logFile(source.fileName, lineNumber, colNumber);
    console.log('\nA subclass cannot be nested:\n');
    console.log(codeFrame);
    console.log('\nA subclass can only be defined by root nodes.\n');
  }
}

function logElementPropertyMismatch(source, element, property, permittedElements) {
  if (shouldLogErrorReport(source)) {
    const { lineNumber, colNumber, codeFrame } = CSSPropertyCodeFrame(source, property);

    logHeading('Element Property Mismatch');
    logFile(source.fileName, lineNumber, colNumber);
    console.log(`\nThe element <${element}> cannot use the property \`${property}\`:\n`);
    console.log(codeFrame);
    console.log(`\n\`${property}\` can only be used by the following elements:\n`);
    chunkArray(permittedElements, 8)
      .map(chunk => chunk.map(element => `<${element}>`))
      .map(chunk => chunk.join(`${COMMA}${SPACE}`))
      .forEach(chunk => console.log(`${TAB}${chunk}`));
    console.log('\n');
  }
}

function logBuildError(fileName, errorName, errorMessage) {
  logHeading(errorName);
  logFile(fileName, null, null);
  console.log(`\n${errorMessage}\n`);
}

function logEnableWebpackSourceMaps() {
  logHeading('Missing Source Maps');
  console.log('\nPlease enable source maps in your `webpack.config.js`:\n');
  console.log(`${TAB}${color.dim(`devtool: "source-map"`)}`);
  console.log(
    `\n${text.underline('Hint')}: more info can be found here:`.concat(
      `${text.underline('https://webpack.js.org/configuration/devtool')}\n`
    )
  );
}

module.exports = {
  saveSourceMap,
  clearSourceMaps,
  shouldLogErrorReport,
  attributeCodeFrame,
  baseClassCodeFrame,
  CSSPropertyCodeFrame,
  logInvalidAttribute,
  logDuplicateProperty,
  logExactOverrideFound,
  logPartialOverrideFound,
  logNestedMediaQuery,
  logUnknownBaseClass,
  logNestedSubclass,
  logElementPropertyMismatch,
  logBuildError,
  logEnableWebpackSourceMaps
}
