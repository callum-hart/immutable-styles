const BLANK = '';
const SPACE = ' ';
const TAB = SPACE.repeat(2);
const SEMI_COLON = ';';

const logStyles = styles => {
  console.log('\n' +
    styles.split(SEMI_COLON)
      .filter(style => style !== BLANK)
      .map(style => style.trim())
      .map(style => `${TAB}${style}${SEMI_COLON}`)
      .join('\n')
      .concat('\n')
      );
}


/**
 * Inheritable property is used by a whitelisted element.
 *
 * @param {String} ref              - Style ID
 * @param {String} property         - Offending property
 * @param {String} element          - Offending element
 * @param {Array} permittedElements - List of elements that can use property
 */

const ELEMENT_CANNOT_USE_PROPERTY = (ref, property, element, permittedElements) => {
  console.log(`The element ${element} (${ref}) cannot use the property ${property}`);
  console.log(`\nThe property ${property} can only be used by the following elements:`);
  permittedElements.forEach(element => console.log(`  - ${element}`));
}


/**
 * One style overrides another style.
 *
 * @param {String} ref             - Style ID for styles
 * @param {String} offendingRef    - Style ID for offendingStyles
 * @param {String} property        - Property that is being overriden
 * @param {String} styles          - Contains rule that is being overriden
 * @param {String} offendingStyles - Contains the overriding rule
 */
const OVERRIDE_FOUND = (ref, offendingRef, property, styles, offendingStyles) => {
  console.log(`The property ${property} has already been defined for ${ref}`);
  console.log(`\nCurrent: ${ref !== offendingRef ? ref: ''}\n   ${styles}`);
  console.log(`\nNew: ${ref !== offendingRef ? offendingRef: ''}\n   "${offendingStyles}"`);
}


/**
 * Media query nested in another media query.
 *
 * @param  {String} ref            - Style ID
 * @param  {Object} inheritedMedia - Parent media query
 * @param  {String} minWidth       - Nested min-width (if any)
 * @param  {String} maxWidth       - Nested max-width (if any)
 */
const NESTED_MEDIA_QUERY = (ref, inheritedMedia, minWidth, maxWidth) => {
  console.log(`\n[Nested Media Query] Nested media query set by "${ref}"`);

  if (minWidth) {
    console.log(`${TAB}- min-width: ${minWidth}`);
  }
  if (maxWidth) {
    console.log(`${TAB} - max-width: ${maxWidth}`);
  }

  console.log(`\n"${ref}" inherits`
    .concat(`${inheritedMedia.minWidth ? ` a min-width of ${inheritedMedia.minWidth}` : BLANK }`)
    .concat(`${inheritedMedia.maxWidth ? `${inheritedMedia.minWidth ? ' and' : BLANK} a max-width of ${inheritedMedia.maxWidth}` : BLANK }`)
    .concat(` from "${inheritedMedia.setBy}"\n`)
    );
}


/**
 * Subclass extends an unkown base class.
 *
 * @param  {String} ref       - Style ID
 * @param  {String} baseClass - The unkown base class
 */
const UNKOWN_BASE_CLASS = (ref, baseClass) => {
  console.log(`\n[Unkown Base Class] The base class "${baseClass}" does not exist`);
  console.log(`\n${TAB}"${ref}"\n`);
}


/**
 * Property defined more than once in same rule-set.
 *
 * @param  {[type]} ref      - Style ID
 * @param  {[type]} property - Duplicated property
 * @param  {[type]} styles   - Styles containing duplicate property
 */
const DUPLICATE_PROPERTY = (ref, property, styles) => {
  console.log(`\n[Duplicate Property] The property "${property}" has been defined more than once by "${ref}"`);
  logStyles(styles);
}


module.exports = {
  ELEMENT_CANNOT_USE_PROPERTY,
  OVERRIDE_FOUND,
  NESTED_MEDIA_QUERY,
  UNKOWN_BASE_CLASS,
  DUPLICATE_PROPERTY
}