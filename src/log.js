const BLANK = '';
const SPACE = ' ';
const TAB = SPACE.repeat(2);
const SEMI_COLON = ';';
const COMMA = ',';


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

const logMediaQuery = (minWidth, maxWidth) => {
  console.log(`\n`
    .concat(minWidth ?
      `${TAB}min-width of ${minWidth}` :
      BLANK)
    .concat(maxWidth ?
      `${minWidth ? ' and' : BLANK} max-width of ${maxWidth}` :
      BLANK)
    );
}

const chunkArray = (array, chunk = 10) => {
  if (array.length === 0) {
    return [];
  } else {
    return [array.slice(0,chunk)].concat(chunkArray(array.slice(chunk), chunk));
  }
}


/**
 * Unkown attribute is used.
 *
 * @param  {String} attr           - Invalid attribute
 * @param  {String} attrValue      - Value of the invalid attribute
 * @param  {Array} permittedAttrs  - List of attributes that can be used
 */
const UNKOWN_ATTRIBUTE = (attr, attrValue, permittedAttrs) => {
  console.log(`\n[Unkown Attribute] "${attr}" is not a valid attribute`);
  console.log(`\nOccurrence found:`);
  console.log(`\n${TAB}${attr}="${attrValue}"`);
  console.log("\nOnly the following attributes are permitted:\n");
  chunkArray(permittedAttrs)
    .map(chunk => chunk.join(`${COMMA}${SPACE}`))
    .forEach(chunk => console.log(`${TAB}${chunk}`));

  console.log(`\n`
    .concat(attr === "id" ?
      'Note: IDs cannot be used for styling\n' :
      BLANK)
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

const ELEMENT_CANNOT_USE_PROPERTY = (ref, property, styles, element, permittedElements) => {
  console.log(`\n[Element Property Mismatch] The element <${element}> cannot use the property "${property}"`);
  console.log(`\nOccurrence found ("${ref}"):`);
  logStyles(styles);
  console.log(`"${property}" can only be used by the following elements:\n`);
  chunkArray(permittedElements)
    .map(chunk => chunk.map(element => `<${element}>`))
    .map(chunk => chunk.join(`${COMMA}${SPACE}`))
    .forEach(chunk => console.log(`${TAB}${chunk}`));
  console.log('\n');
}


/**
 * One style overrides another style.
 *
 * @param {String} ref             - Style ID for styles
 * @param {String} offendingRef    - Style ID for offendingStyles
 * @param {String} property        - Property that is being overridden
 * @param {String} styles          - Contains rule that is being overridden
 * @param {String} offendingStyles - Contains the overriding rule
 */
const OVERRIDE_FOUND = (ref, offendingRef, property, styles, offendingStyles) => {
  console.log(`\n[Override Found]`
    .concat(ref !== offendingRef ?
      ` "${offendingRef}" overrides the "${property}" set by "${ref}"` :
      ` the "${property}" of "${ref}" has already been defined`)
    );

  if (ref !== offendingRef) {
    console.log(`\nOveridden styles ("${ref}"):`);
    logStyles(styles);
    console.log(`Overriding styles ("${offendingRef}"):`);
    logStyles(offendingStyles);
  } else {
    console.log(`\nThe "${property}" of "${ref}" is defined here:`);
    logStyles(styles);
    console.log('and again here:');
    logStyles(offendingStyles);
  }

  console.log(`The "${property}" of "${ref}" cannot be overridden`);
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
  console.log(`\n[Nested Media Query] Nested media query found in "${inheritedMedia.setBy}"`);
  console.log(`\nOuter media query ("${inheritedMedia.setBy}"):`);
  logMediaQuery(inheritedMedia.minWidth, inheritedMedia.maxWidth);
  console.log(`\nInner media query ("${ref}"):`);
  logMediaQuery(minWidth, maxWidth);
  console.log('\nMedia queries cannot be nested within other media queries\n');
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
 * @param  {String} ref      - Style ID
 * @param  {String} property - Duplicated property
 * @param  {String} styles   - Styles containing duplicate property
 */
const DUPLICATE_PROPERTY = (ref, property, styles) => {
  console.log(`\n[Duplicate CSS Property] The property "${property}" has been defined more than once by "${ref}"`);
  logStyles(styles);
}


module.exports = {
  UNKOWN_ATTRIBUTE,
  ELEMENT_CANNOT_USE_PROPERTY,
  OVERRIDE_FOUND,
  NESTED_MEDIA_QUERY,
  UNKOWN_BASE_CLASS,
  DUPLICATE_PROPERTY
}