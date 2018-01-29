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
  console.log('Nested media query found.');
  console.log(`\nMedia query already set by parent: "${inheritedMedia.setBy}"`);
  if (inheritedMedia.minWidth) {
    console.log(` - minWidth of: ${inheritedMedia.minWidth}`);
  }
  if (inheritedMedia.maxWidth) {
    console.log(` - maxWidth of: ${inheritedMedia.maxWidth}`);
  }
  console.log(`\nNested media query found in: "${ref}"`);
  if (minWidth) {
    console.log(` - minWidth: ${minWidth}`);
  }
  if (maxWidth) {
    console.log(` - maxWidth: ${maxWidth}`);
  }
  console.log(`\nNested media queries are not allowed\n`);
}


/**
 * Subclass extends an unkown base class.
 *
 * @param  {String} ref       - Style ID
 * @param  {String} baseClass - The unkown base class
 */
const UNKOWN_BASE_CLASS = (ref, baseClass) => {
  console.log(`The base class "${baseClass}" does not exist for "${ref}"`);
}


/**
 * Property defined more than once in same rule-set.
 *
 * @param  {[type]} ref      - Style ID
 * @param  {[type]} property - Duplicated property
 * @param  {[type]} styles   - Styles containing duplicate property
 */
const DUPLICATE_PROPERTY = (ref, property, styles) => {
  console.log('\nDuplicate property found.');
  console.log(`The property "${property}" has been defined more than once by "${ref}"`);
  console.log(styles);
}


module.exports = {
  ELEMENT_CANNOT_USE_PROPERTY,
  OVERRIDE_FOUND,
  NESTED_MEDIA_QUERY,
  UNKOWN_BASE_CLASS,
  DUPLICATE_PROPERTY
}