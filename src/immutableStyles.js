/**
 * Get first version of this done asap to test idea
 *
 * - Features:
 *   - Better logging
 *   - Validate attrs
 * - Add docs
 * - Caveats:
 *   - child nodes use child combinator selector (<)
 *   - element != element with class might feel unnatural
 * - Tests for jsx
 *
 */

const log = require('./log');
const propertyWhitelist = require('./propertyWhitelist');


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


const createStyle = (element, attrs, ...children) => {
  let styles = BLANK;
  const childNodes = [];

  // children can contain styles for current element or child nodes
  children.forEach(child => {
    if (child.element) {
      childNodes.push(child);
    } else {
      styles += child;
    }
  });

  // todo: validate attrs? only allow: `className`, `minWidth`, `maxWidth`, `pseudo`

  return {
    element,
    attrs: attrs || {},
    styles,
    children: childNodes
  }
}

const createCSS = (styles) => {
  styles.forEach(block => parseStyles(block));
  parseAst();
  return makeCSS();
}

const parseStyles = (block, parentRef = null, inheritedMedia = null) => {
  const ref = makeRef(block);
  const fullyQualifiedRef = parentRef ? `${parentRef}${SPACE}${ref}` : ref;
  const { minWidth, maxWidth, className } = block.attrs;

  if (inheritedMedia) {
    if (minWidth || maxWidth) {
      log.NESTED_MEDIA_QUERY(fullyQualifiedRef, inheritedMedia, minWidth, maxWidth);
      throw new Error('Nested media query found');
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
      log.UNKOWN_BASE_CLASS(fullyQualifiedRef, baseRef);
      throw new Error(`The base class \`${baseRef}\` does not exist`);
    }
  }

  saveRef(fullyQualifiedRef, block);

  if (block.children.length) {
    // save parent path for children
    if (parentRef) {
      parentRef += `${SPACE}${ref}`;
    } else {
      parentRef = ref;
    }

    // save inferred media queries if any
    if (minWidth || maxWidth) {
      inheritedMedia = {
        setBy: parentRef,
        ...minWidth && { minWidth },
        ...maxWidth && { maxWidth }
      }
    }

    // parse children
    block.children.forEach(child => parseStyles(child, parentRef, inheritedMedia));
  }
}

const cloneBaseStyles = (baseRef, clonedRef) => {
  for (var ref of AST.keys()) {
    // thought: could potentially clone all styles that include (not just start with) baseRef
    // i.e: `div.container form.base-form` => `div.container form.base-form.base-form--saving`
    // this would enable inheritance among nested nodes.
    if (ref === baseRef || ref.startsWith(`${baseRef}${SPACE}`)) {
      // clone and save base styles
      const fullyQualifiedClonedRef = ref.replace(baseRef, clonedRef);
      AST.set(fullyQualifiedClonedRef, AST.get(ref).map(style => ({...style})));
      AST.get(fullyQualifiedClonedRef).isCloned = true;
      AST.get(fullyQualifiedClonedRef)._clonedFrom = ref; // just for debugging
    }
  }
}

const isSubclass = (parentRef, className) => {
  // for now only support inheritance for:
  //  - top level nodes
  //  - single inheritance
  return parentRef === null &&
         className &&
         className.includes(DOT);
}

const parseAst = () => {
  for (var ref of AST.keys()) {
    const paths = ref.split(SPACE);
    let i = paths.length - 1;
    let accumulator = BLANK;

    // traverse tree (right to left) to see whether ref exists as part of another ref
    do {
      accumulator = (accumulator === BLANK) ? paths[i] : `${paths[i]}${SPACE}` + accumulator;

      if (ref !== accumulator && AST.has(accumulator)) {
        // ref exists as part of another ref, check if styles are unique
        AST.get(ref).forEach(existingStyle => {
          AST.get(accumulator).forEach(accumulatedStyle => {
            try {
              areStylesUnique(accumulatedStyle, existingStyle);
            } catch ({message, data}) {
              log.OVERRIDE_FOUND(accumulator, ref, data.property, data.styles, data.offendingStyles);
              throw new arguments.constructor(message);
            }
          });
        });
      }

      i--;
    } while (i >= 0);
  }
}

const makeCSS = () => {
  let CSS = BLANK;

  for (var ref of AST.keys()) {
    const selector = makeSelectorFromRef(ref);

    AST.get(ref).filter(({styles}) => styles !== BLANK)
                .forEach(({styles, minWidth, maxWidth}) => {
      if (minWidth === ZERO && maxWidth === Infinity) {
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

  console.log(CSS);
  return CSS;
}

const saveRef = (ref, {element, attrs, styles}) => {
  if (stylesValid(ref, element, styles)) {
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

const stylesValid = (ref, element, styles) => {
  return elementCanUseProperty(ref, element, styles) &&
         propertiesAreUnique(ref, element, styles);
}

const elementCanUseProperty = (ref, element, styles) => {
  propertyWhitelist.forEach(({elements, properties}) => {
    const whitelistedProperty = properties.find(property => styles.includes(property));

    if (whitelistedProperty && !elements.includes(element)) {
      log.ELEMENT_CANNOT_USE_PROPERTY(ref, whitelistedProperty, element, elements);
      throw new Error(`The HTML element \`${element}\` (${ref}) cannot use the property \`${whitelistedProperty}\``);
    }
  });

  return true;
}

const propertiesAreUnique = (ref, element, styles) => {
  try {
    stylesAsMap(styles, ref);
  } catch (e) {
    throw e.constructor(e.message);
  }

  return true;
}

const saveNewStyleForExistingRef = (newStyle, ref) => {
  AST.get(ref).forEach(existingStyle => {
    try {
      areStylesUnique(existingStyle, newStyle);
    } catch ({message, data}) {
      log.OVERRIDE_FOUND(ref, ref, data.property, data.styles, data.offendingStyles);
      throw new arguments.constructor(message);
    }
  });

  AST.get(ref).push(newStyle); // save styles
}

const mergeNewStyleWithEquivalentStyle = (newStyle, equivalentStyle) => {
  const newStyles = stylesAsMap(newStyle.styles);
  const equivalentStyles = stylesAsMap(equivalentStyle.styles);

  for (var property of newStyles.keys()) {
    if (equivalentStyles.has(property)) {
      // style already exists, override it
      equivalentStyles.set(property, `${newStyles.get(property)} /* (original value: ${equivalentStyles.get(property)}) */`);
    } else {
      // add style
      equivalentStyles.set(property, `${newStyles.get(property)}`);
    }
  }

  equivalentStyle.styles = stylesToString(equivalentStyles);
}

const createStyleEntry = (styles, {minWidth, maxWidth}) => {
  return {
    styles,
    minWidth: minWidth ? minWidth : ZERO,
    maxWidth: maxWidth ? maxWidth : Infinity
  }
}

// todo: needs to handle short-hands (margin vs margin-top) or validate against short-hand usage
const areStylesUnique = (control, comparison) => {
  if (breakpointsOverlap(control, comparison)) {
    for (var property of stylesAsMap(comparison.styles).keys()) {
      if (stylesAsMap(control.styles).get(property)) {
        throw new ErrorWithData(
          `Override found. The property \`${property}\` has already been defined`,
          {
            property,
            styles: control.styles,
            offendingStyles: comparison.styles
          }
        );
      }
    }
  }

  return true;
}

const breakpointsOverlap = (controlRange, comparisonRange) => {
  const rangeBelow = (comparisonRange.minWidth < controlRange.minWidth) &&
                     (comparisonRange.maxWidth < controlRange.minWidth);
  const rangeAbove = (comparisonRange.minWidth > controlRange.maxWidth) &&
                     (comparisonRange.maxWidth > controlRange.maxWidth);

  if (rangeBelow || rangeAbove) {
    return false;
  } else {
    return true;
  }
}

const stylesAsMap = (stylesAsString, ref = null) => {
  const styles = new Map();

  stylesAsString.split(SEMI_COLON)
    .filter(res => res !== BLANK)
    .map(res => res.trim())
    .forEach(declaration => {
      const [property, value] = declaration.split(COLON).map(res => res.trim().toLowerCase());

      if (styles.has(property)) {
        log.DUPLICATE_PROPERTY(ref, property, stylesAsString);
        throw new Error(`The CSS property \`${property}\` is defined twice by \`${ref}\``);
      } else {
        styles.set(property, value);
      }
    });

  return styles;
}

const stylesToString = stylesAsMap => {
  let styles = BLANK;

  stylesAsMap.forEach((value, property) => {
    styles += `${property}${COLON}${value}${SEMI_COLON}`;
  });

  return styles;
}

const makeRef = ({element, attrs}) => {
  const { className, pseudo } = attrs;

  return element.concat(className ? `${DOT}${className}` : BLANK)
                .concat(pseudo ? pseudo : BLANK);
}

const makeSelectorFromRef = ref => {
  const finalSelector = [];

  ref.split(SPACE).forEach(part => {
    let selector = part;
    let pseudoSelector = BLANK;

    if (selector.includes(COLON)) {
      pseudoSelector = selector.match(/:.+/)[0];
      selector = selector.replace(pseudoSelector, BLANK);
    }

    if (selector.includes(DOT)) {
      const isSubclass = selector.split(DOT).length === 3; // [element, baseClass, subClass]

      if (isSubclass) {
        finalSelector.push(`${makeSubclassSelector(selector)}${pseudoSelector}`);
      } else {
        finalSelector.push(`${makeClassSelector(selector)}${pseudoSelector}`);
      }
    } else {
      finalSelector.push(`${makeTagOnlySelector(selector)}${pseudoSelector}`);
    }
  });

  return(finalSelector.join(`${SPACE}${CHILD_COMBINATOR}${SPACE}`));
}

const makeTagOnlySelector = element => {
  return `${element}:not([class])`;
}

const makeClassSelector = elementWithClass => {
  const [element, cssClass] = elementWithClass.split(DOT);
  return `${element}[class="${cssClass}"]`;
}

const makeSubclassSelector = elementWithSubclass => {
  const [element, baseClass, subClass] = elementWithSubclass.split(DOT);
  return `${element}[class="${baseClass}${SPACE}${subClass}"]`;
}

class ErrorWithData {
  constructor(message, data) {
    this.message = message;
    this.data = data;
  }
}

// for testing
const tearDown = () => {
  AST.clear();
}

module.exports = {
  createStyle,
  createCSS,
  tearDown
};