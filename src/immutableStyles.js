const elementPropertyWhitelist = require('./elementPropertyWhitelist');
const shorthandProperties = require('./shorthandProperties')
const shorthandHelpers = require('./shorthandHelpers');


const BLANK             = '';
const SPACE             = ' ';
const DOT               = '.';
const COLON             = ':';
const SEMI_COLON        = ';';
const CHILD_COMBINATOR  = '>';
const OPEN_PARENTHESIS  = '(';
const CLOSE_PARENTHESIS = ')';
const OPEN_BRACE        = '{';
const CLOSE_BRACE       = '}';
const ZERO              = 0;
const MEDIA_UNIT        = 'px';

const AST = new Map();
const SOURCE_MAPS = new Map();


function createStyle(element, attrs, ...children) {
  let styles = BLANK;
  const childNodes = [];
  // children can contain styles for current element or child nodes
  children.forEach(child => child.element
    ? childNodes.push(child)
    : styles += child);

  // todo: return Object.freeze({...});
  return {
    element,
    attrs: attrs || {},
    styles,
    children: childNodes
  }
}

function attrsValid(attrs) {
  if (attrs) {
    const permittedAttrs = [
      'className',
      'minWidth',
      'maxWidth',
      'pseudo',
      '__source' // generated by `transform-react-jsx-source`
    ];

    Object.keys(attrs).forEach(attr => {
      if (!permittedAttrs.includes(attr)) {
        console.log('invalid attr source', attrs.__source);

        throw new ErrorWithData(
          `\`${attr}\` is not a valid attribute`,
          {
            attr,
            attrValue: attrs[attr],
            permittedAttrs
          }
        );
      }
    });
  }

  return true;
}

function createCSS(styles) {
  Array.isArray(styles)
      ? styles.forEach(block => parseStyles(block))
      : parseStyles(styles);

  parseAst();
  return makeCSS();
}

function parseStyles(block, parentRef = null, inheritedMedia = null) {
  if (attrsValid(block.attrs)) {
    const ref = makeRef(block);
    const fullyQualifiedRef = parentRef
      ? `${parentRef}${SPACE}${ref}`
      : ref;
    const {
      minWidth,
      maxWidth,
      className,
      __source
    } = block.attrs;

    if (inheritedMedia) {
      if (
        minWidth ||
        maxWidth
      ) {
        console.log('parent source', inheritedMedia.__source);
        console.log('nested source', __source);
        throw new ErrorWithData(
          `[Nested Media Query] Nested media query found in "${inheritedMedia.setBy}"`,
          {
            fullyQualifiedRef,
            inheritedMedia,
            minWidth,
            maxWidth
          }
        );
      } else {
        // add inherited media queries to child block
        block.attrs = {
          ...block.attrs,
          ...inheritedMedia.minWidth && { minWidth: inheritedMedia.minWidth },
          ...inheritedMedia.maxWidth && { maxWidth: inheritedMedia.maxWidth }
        }
      }
    }

    if (isSubclass(parentRef, className)) {
      const baseClass = className.match(/^.+(?=(\.))/)[0]; // upto (but not including) dot
      const baseRef = `${block.element}${DOT}${baseClass}`;

      if (AST.has(baseRef)) {
        cloneBaseStyles(baseRef, fullyQualifiedRef);
        // todo: generate run-time validations
      } else {
        console.log('Base class source', __source);
        throw new ErrorWithData(
          `The base class \`${baseRef}\` does not exist`,
          {
            fullyQualifiedRef,
            baseRef
          }
        );
      }
    }

    saveRef(fullyQualifiedRef, block);

    if (block.children.length) {
      // save parent path for children
      parentRef
        ? parentRef += `${SPACE}${ref}`
        : parentRef = ref;

      // save inferred media queries if any
      if (
        minWidth ||
        maxWidth
      ) {
        inheritedMedia = {
          ...minWidth && { minWidth },
          ...maxWidth && { maxWidth },
          setBy: parentRef,
          __source
        }
      }

      // parse children
      block.children.forEach(child => parseStyles(child, parentRef, inheritedMedia));
    }
  }
}

function cloneBaseStyles(baseRef, clonedRef) {
  for (var ref of AST.keys()) {
    if (
      ref === baseRef ||
      ref.startsWith(`${baseRef}${SPACE}`)
    ) {
      // clone and save base styles
      const fullyQualifiedClonedRef = ref.replace(baseRef, clonedRef);
      AST.set(fullyQualifiedClonedRef, AST.get(ref).map(style => ({...style})));
      AST.get(fullyQualifiedClonedRef).isCloned = true;
    }
  }
}

function isSubclass(parentRef, className) {
  // for now only support inheritance for:
  //  - top level nodes
  //  - single inheritance
  return parentRef === null &&
         className &&
         className.includes(DOT);
}

function parseAst() {
  for (var ref of AST.keys()) {
    const paths = ref.split(SPACE);
    let i = paths.length - 1;
    let accumulator = BLANK;

    // traverse tree (right to left) to see whether ref exists as part of another ref
    do {
      accumulator = (accumulator === BLANK)
        ? paths[i]
        : `${paths[i]}${SPACE}` + accumulator;

      if (
        ref !== accumulator &&
        AST.has(accumulator)
      ) {
        // ref exists as part of another ref, check if styles are unique
        AST.get(ref).forEach(existingStyle => {
          AST.get(accumulator).forEach(accumulatedStyle => {
            try {
              areStylesUnique(accumulatedStyle, existingStyle);
            } catch (e) {
              const {
                overriddenProperty,
                overriddenStyles,
                overridingStyles
              } = e.data;

              console.log('overriddenStyles source', overriddenStyles.__source);
              console.log('overridingStyles source', overridingStyles.__source);
              throw new ErrorWithData(
                `[Override Found] "${ref}" overrides the "${overriddenProperty}" set by "${accumulator}"`,
                {
                  overriddenRef: accumulator,
                  overridingRef: ref
                }
              );
            }
          });
        });
      }

      i--;
    } while (i >= 0);
  }
}

function makeCSS() {
  let CSS = BLANK;

  for (var ref of AST.keys()) {
    const selector = makeSelectorFromRef(ref);

    AST.get(ref).filter(({styles}) => styles !== BLANK)
                .forEach(({styles, minWidth, maxWidth}) => {
      if (
        minWidth === ZERO &&
        maxWidth === Infinity
      ) {
        CSS += `${selector}${SPACE}${OPEN_BRACE}\n`;
        CSS += `${SPACE.repeat(2)}${styles}\n`;
      } else {
        // optimization: one media query per unique range containing all styles for that range
        const ranges = [];

        if (minWidth !== ZERO) {
          ranges.push(`${OPEN_PARENTHESIS}min-width:${minWidth}${MEDIA_UNIT}${CLOSE_PARENTHESIS}`);
        }

        if (maxWidth !== Infinity) {
          ranges.push(`${OPEN_PARENTHESIS}max-width:${maxWidth}${MEDIA_UNIT}${CLOSE_PARENTHESIS}`);
        }

        CSS += `@media${SPACE}${ranges.join(`${SPACE}and${SPACE}`)}${SPACE}${OPEN_BRACE}\n`;
        CSS += `${SPACE.repeat(2)}${selector}${SPACE}${OPEN_BRACE}\n`;
        CSS += `${SPACE.repeat(4)}${styles}\n`;
        CSS += `${SPACE.repeat(2)}${CLOSE_BRACE}\n`;
      }

      CSS += `${CLOSE_BRACE}\n`;
    });
  }

  // console.log(CSS);
  return CSS;
}

function saveRef(ref, {element, attrs, styles}) {
  if (stylesValid(ref, element, attrs, styles)) {
    if (AST.has(ref)) {
      // ref already exists
      const newStyle = createStyleEntry(styles, attrs);

      if (AST.get(ref).isCloned) {
        // find existing style whose min & max width are equal to new style (if any)
        const equivalentStyle = AST.get(ref).find(({minWidth, maxWidth}) => minWidth === newStyle.minWidth && maxWidth === newStyle.maxWidth);

        if (equivalentStyle) {
          // merge new style with an equivalent style
          mergeNewStyleWithEquivalentStyle(newStyle, equivalentStyle);
        } else {
          // treat new style as a new entry in AST
          saveNewStyleForExistingRef(newStyle, ref);
        }
      } else {
        // merge new styles with existing styles if no overrides present
        saveNewStyleForExistingRef(newStyle, ref);
      }
    } else {
      AST.set(ref, [createStyleEntry(styles, attrs)]);
    }
  }
}

/**
 * @param reas composed of ref, element, attrs, styles
 */
function stylesValid(...reas) {
  return propertiesAreUnique(...reas) &&
         elementCanUseProperty(...reas) &&
         noAmbiguousProperties(...reas);
}

function propertiesAreUnique(ref, element, attrs, styles) {
  try {
    stylesAsMap(styles, attrs, ref);
  } catch (e) {
    throw e;
  }

  return true;
}

function elementCanUseProperty(ref, element, attrs, styles) {
  elementPropertyWhitelist.forEach(({elements, properties}) => {
    const whitelistedProperty = properties.find(property => stylesAsMap(styles).get(property));

    if (
      whitelistedProperty &&
      !elements.includes(element)
    ) {
      console.log('whitelistedProperty source', attrs.__source);
      throw new ErrorWithData(
        `The HTML element \`${element}\` (${ref}) cannot use the property \`${whitelistedProperty}\``,
        {
          ref,
          whitelistedProperty,
          styles,
          element,
          elements,
          __source: attrs.__source
        }
      );
    }
  });

  return true;
}

function noAmbiguousProperties(ref, element, attrs, styles) {
  for (var property of stylesAsMap(styles).keys()) {
    const ambiguousProperty = Object.keys(shorthandProperties).includes(property);

    if (ambiguousProperty) {
      console.log('ambiguousProperty source', attrs.__source);
      console.log('please use unambiguous properties:', shorthandProperties[property].suggestions);
      if (shorthandProperties[property].helper) {
        const { name, example} = shorthandProperties[property].helper;
        console.log('or use the helper:', name, example);
      }

      throw new ErrorWithData(
        `[Ambiguous property] "${ref}" uses the shorthand property "${property}"`,
        {
          ref,
          property,
          styles,
          element,
          __source: attrs.__source
        }
      );
    }
  }

  return true;
}

function saveNewStyleForExistingRef(newStyle, ref) {
  AST.get(ref).forEach(existingStyle => {
    try {
      areStylesUnique(existingStyle, newStyle);
    } catch (e) {
      const {
        overriddenProperty,
        overriddenStyles,
        overridingStyles
      } = e.data;

      console.log('overriddenStyles source', overriddenStyles.__source);
      console.log('overridingStyles source', overridingStyles.__source);
      debugger;
      throw new ErrorWithData(
        `[Override Found] the "${overriddenProperty}" of "${ref}" has already been defined`,
        {
          overriddenRef: ref,
          overridingRef: ref
        }
      );
    }
  });

  AST.get(ref).push(newStyle); // save styles
}

function mergeNewStyleWithEquivalentStyle(newStyle, equivalentStyle) {
  const newStyles = stylesAsMap(newStyle.styles);
  const equivalentStyles = stylesAsMap(equivalentStyle.styles);

  for (var property of newStyles.keys()) {
    if (equivalentStyles.has(property)) {
      // style already exists, override it
      equivalentStyles.set(
        property,
        `${newStyles.get(property)} /* (original value: ${equivalentStyles.get(property)}) */`
      );
    } else {
      // add style
      equivalentStyles.set(property, `${newStyles.get(property)}`);
    }
  }

  equivalentStyle.styles = stylesToString(equivalentStyles);
}

function createStyleEntry(styles, {minWidth, maxWidth, __source}) {
  return {
    styles,
    minWidth: minWidth ? minWidth : ZERO,
    maxWidth: maxWidth ? maxWidth : Infinity,
    __source
  }
}

function areStylesUnique(control, comparison) {
  if (breakpointsOverlap(control, comparison)) {
    for (var property of stylesAsMap(comparison.styles).keys()) {
      if (stylesAsMap(control.styles).get(property)) {
        throw new ErrorWithData(
          `Override found. The property \`${property}\` has already been defined`,
          {
            overriddenProperty: property,
            overriddenStyles: control,
            overridingStyles: comparison
          }
        );
      }
    }
  }

  return true;
}

function breakpointsOverlap(controlRange, comparisonRange) {
  const rangeBelow = (comparisonRange.minWidth < controlRange.minWidth) &&
                     (comparisonRange.maxWidth < controlRange.minWidth);
  const rangeAbove = (comparisonRange.minWidth > controlRange.maxWidth) &&
                     (comparisonRange.maxWidth > controlRange.maxWidth);

  if (
    rangeBelow ||
    rangeAbove
  ) {
    return false;
  } else {
    return true;
  }
}

function stylesAsMap(stylesAsString, attrs = null, ref = null) {
  const styles = new Map();

  stylesAsString.split(SEMI_COLON)
    .filter(res => res !== BLANK)
    .map(res => res.trim())
    .forEach(declaration => {
      const [property, value] = declaration.split(COLON).map(res => res.trim().toLowerCase());

      if (styles.has(property)) {
        console.log('Duplicate property source', attrs.__source);
        throw new ErrorWithData(
          `The CSS property \`${property}\` is defined twice by \`${ref}\``,
          {
            ref,
            property,
            stylesAsString
          }
        );
      } else {
        styles.set(property, value);
      }
    });

  return styles;
}

function stylesToString(stylesAsMap) {
  return [...stylesAsMap].reduce((acc, [property, value]) => {
    return acc += `${property}${COLON}${value}${SEMI_COLON}`;
  }, BLANK);
}

function makeRef({element, attrs}) {
  const { className, pseudo } = attrs;

  return element.concat(className ? `${DOT}${className}` : BLANK)
                .concat(pseudo ? pseudo : BLANK);
}

function makeSelectorFromRef(ref) {
  return ref.split(SPACE)
    .reduce((acc, selector) => {
      let pseudoSelector = BLANK;

      if (selector.includes(COLON)) {
        pseudoSelector = selector.match(/:.+/)[0];
        selector = selector.replace(pseudoSelector, BLANK);
      }

      if (selector.includes(DOT)) {
        const isSubclass = selector.split(DOT).length === 3; // [element, baseClass, subClass]

        if (isSubclass) {
          return acc.concat(`${makeSubclassSelector(selector)}${pseudoSelector}`);
        } else {
          return acc.concat(`${makeClassSelector(selector)}${pseudoSelector}`);
        }
      } else {
        return acc.concat(`${makeTagOnlySelector(selector)}${pseudoSelector}`);
      }
    }, [])
    .join(`${SPACE}${CHILD_COMBINATOR}${SPACE}`);
}

function makeTagOnlySelector(element) {
  return `${element}:not([class])`;
}

function makeClassSelector(elementWithClass) {
  const [element, cssClass] = elementWithClass.split(DOT);
  return `${element}[class="${cssClass}"]`;
}

function makeSubclassSelector(elementWithSubclass) {
  const [element, baseClass, subClass] = elementWithSubclass.split(DOT);
  return `${element}[class="${baseClass}${SPACE}${subClass}"]`;
}

function saveSourceMap(fileName, fileSource) {
  SOURCE_MAPS.set(fileName, fileSource);
}

// for testing / build tools
function tearDown() {
  AST.clear();
  SOURCE_MAPS.clear();
}

class ErrorWithData extends Error {
  constructor(message, data) {
    super(message);
    this.message = message;
    this.data = data;
    // console.log(SOURCE_MAPS);
  }
}

module.exports = {
  createStyle,
  createCSS,
  saveSourceMap,
  tearDown,
  ErrorWithData,
  ...shorthandHelpers
};