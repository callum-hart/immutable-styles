/**
 * Get first version of this done asap to test idea
 *
 * - Features:
 *   - Psuedo selectors (:hover)
 *   - Psuedo elements (::after)
 *   - Override detection in same / detached rule-sets
 * - Add docs
 * - Caveats:
 *   - child nodes use child combinator selector (<)
 *   - element != element with class might feel unnatural
 * - Tests for jsx
 *
 */

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


class OverrideFound {
  constructor(message, data) {
    this.message = message;
    this.data = data;
  }
}

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
      logNestedMediaQuery(inheritedMedia, minWidth, maxWidth, fullyQualifiedRef);
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
      const errorMessage = `The base class \`${baseRef}\` does not exist`;
      console.log(errorMessage);
      throw new Error(errorMessage);
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
        try {
          AST.get(ref).forEach(existingStyle => {
            AST.get(accumulator).forEach(accumulatedStyle => stylesUnique(accumulatedStyle, existingStyle));
          });
        } catch (e) {
          const errorMessage = `[Override Found] \`${ref}\` overrides the property \`${e.data.property}\` set by \`${accumulator}\``;
          console.log(`\n${errorMessage}`);
          console.log(`\nExisting style (\`${accumulator}\`):\n   \`${e.data.control.styles}\``);
          console.log(`\nNew style (\`${ref}\`):\n   \`${e.data.comparison.styles}\``);
          throw new Error(errorMessage);
        }
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

// valid in regards to inheritance
const stylesValid = (ref, element, styles) => {
  propertyWhitelist.forEach(({elements, properties}) => {
    const whitelistedProperty = properties.find(property => styles.includes(property));

    if (whitelistedProperty && !elements.includes(element)) {
      const errorMessage = `The HTML element \`${element}\` (${ref}) cannot use the property \`${whitelistedProperty}\``;
      console.log(`\n${errorMessage}`);
      console.log(`\nThe property "${whitelistedProperty}" can only be used by the following elements:`);
      elements.forEach(element => console.log(`  - ${element}`));
      console.log('\n');
      throw new Error(errorMessage);
    }
  });

  return true;
}

const saveNewStyleForExistingRef = (newStyle, ref) => {
  try {
    AST.get(ref).forEach(existingStyle => stylesUnique(existingStyle, newStyle));
    AST.get(ref).push(newStyle); // save styles
  } catch (e) {
    const errorMessage = `The CSS property \`${e.data.property}\` has already been defined for \`${ref}\``;
    console.log(`\n${errorMessage}`);
    console.log(`\nExisting style (\`${ref}\`):\n   "${e.data.control.styles}"`);
    console.log(`\nNew style (\`${ref}\`):\n   "${e.data.comparison.styles}"`);
    throw new Error(errorMessage);
  }
}

const mergeNewStyleWithEquivalentStyle = (newStyle, equivalentStyle) => {
  const newStyles = stylesToObject(newStyle.styles);
  const equivalentStyles = stylesToObject(equivalentStyle.styles);

  for (var property in newStyles) {
    if (equivalentStyles[property]) {
      // style already exists, override it
      equivalentStyles[property] = `${newStyles[property]} /* (original value: ${equivalentStyles[property]}) */`;
    } else {
      // add style
      equivalentStyles[property] = `${newStyles[property]}`;
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

// unique in terms of CSS property (not including CSS value)
// todo: needs to handle short-hands (margin vs margin-top) or validate against short-hand usage
const stylesUnique = (control, comparison) => {
  if (breakpointsOverlap(control, comparison)) {
    console.log('breakpoints overlap');
    for (var property in stylesToObject(comparison.styles)) {
      if (stylesToObject(control.styles)[property]) {
        console.log('override found');
        throw new OverrideFound('Override found', {
          property,
          control,
          comparison
        });
      } else {
        console.log('no overrides found');
      }
    }
  } else {
    // overrides can't exist when breakpoints don't overlap
    console.log('breakpoints don\'t overlap');
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

const stylesToObject = stylesAsString => {
  const styleObj = {};

  stylesAsString.split(SEMI_COLON)
        .filter(res => res !== BLANK)
        .map(res => res.trim())
        .forEach(declaration => {
          const [property, value] = declaration.split(COLON).map(res => res.trim());
          styleObj[property.toLowerCase()] = value;
        });

  return styleObj;
}

const stylesToString = stylesAsObject => {
  let stylesStr = BLANK;

  for (var [property, value] of Object.entries(stylesAsObject)) {
    stylesStr += `${property}${COLON}${value}${SEMI_COLON}`;
  }

  return stylesStr;
}

const makeRef = ({element, attrs}) => {
  if (attrs && attrs.className) {
    return `${element}${DOT}${attrs.className}`;
  } else {
    return element;
  }
}

const makeSelectorFromRef = ref => {
  let selector = [];

  ref.split(SPACE).forEach(part => {
    if (part.includes(DOT)) {
      const isComposableClass = part.split(DOT).length === 3; // [element, baseClass, subClass]

      if (isComposableClass) {
        selector.push(makeComposableClassSelector(part));
      } else {
        selector.push(makeClassSelector(part));
      }
    } else {
      selector.push(makeTagOnlySelector(part));
    }
  });

  return(selector.join(`${SPACE}${CHILD_COMBINATOR}${SPACE}`));
}

const makeTagOnlySelector = element => {
  return `${element}:not([class])`;
}

const makeClassSelector = elementWithClass => {
  const [element, cssClass] = elementWithClass.split(DOT);
  return `${element}[class="${cssClass}"]`;
}

const makeComposableClassSelector = elementWithComposableClass => {
  const [element, baseClass, subClass] = elementWithComposableClass.split(DOT);
  return `${element}[class="${baseClass}${SPACE}${subClass}"]`;
}

const logNestedMediaQuery = (inheritedMedia, minWidth, maxWidth, fullyQualifiedRef) => {
  console.log(`\nMedia query already set by parent: "${inheritedMedia.setBy}"`);
  if (inheritedMedia.minWidth) {
    console.log(` - minWidth of: ${inheritedMedia.minWidth}`);
  }
  if (inheritedMedia.maxWidth) {
    console.log(` - maxWidth of: ${inheritedMedia.maxWidth}`);
  }
  console.log(`\nNested media query found in: "${fullyQualifiedRef}"`);
  if (minWidth) {
    console.log(` - minWidth: ${minWidth}`);
  }
  if (maxWidth) {
    console.log(` - maxWidth: ${maxWidth}`);
  }
  console.log(`\nNested media queries are not allowed\n`);
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