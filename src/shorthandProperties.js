// Thanks Mozilla 🙏 `https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties`

/* 
TODO: provide mixins that wrap longhand properties to save people the trouble, i.e:

function margin(top, right, bottom, left) {
  return `
    margin-top: ${top};
    margin-right: ${right};
    margin-bottom: ${bottom};
    margin-left: ${left};
  `;
}

Usage: 

<p>
  { margin(10px, 15px, 10px, 15px) }
</p>

*/

const borderLonghandProperties = [
  'border-top-width',
  'border-top-style',
  'border-top-color',
  'border-right-width',
  'border-right-width',
  'border-right-style',
  'border-bottom-style',
  'border-bottom-color',
  'border-bottom-color',
  'border-left-width',
  'border-left-style',
  'border-left-color'
];

module.exports = {
  'animation': [
    'animation-name', 
    'animation-duration', 
    'animation-timing-function', 
    'animation-delay', 
    'animation-iteration-count', 
    'animation-direction', 
    'animation-fill-mode', 
    'animation-play-state'
  ],
  'background': [
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
    'background-attachment'
  ],
  'border': borderLonghandProperties,
  'border-width': borderLonghandProperties,
  'border-style': borderLonghandProperties,
  'border-color': borderLonghandProperties,
  'border-top': borderLonghandProperties,
  'border-right': borderLonghandProperties,
  'border-bottom': borderLonghandProperties,
  'border-left': borderLonghandProperties,
  'border-radius': [
    'border-top-left-radius', 
    'border-top-right-radius', 
    'border-bottom-right-radius',
    'border-bottom-left-radius'
  ],
  'column-rule': [
    'column-rule-width', 
    'column-rule-style',
    'column-rule-color'
  ],
  'columns': [
    'column-width',
    'column-count'
  ],
  'flex': [
    'flex-grow', 
    'flex-shrink',
    'flex-basis'
  ],
  'flex-flow': [
    'flex-direction',
    'flex-wrap'
  ],
  'font': [
    'font-style', 
    'font-variant', 
    'font-weight', 
    'font-size', 
    'line-height', 
    'font-family'
  ],
  'grid': [
    'grid-template-rows', 
    'grid-template-columns', 
    'grid-template-areas',
    'grid-auto-rows', 
    'grid-auto-columns',
    'grid-auto-flow'
  ],
  'grid-area': [
    'grid-row-start', 
    'grid-column-start', 
    'grid-row-end',
    'grid-column-end'
  ],
  'grid-column': [
    'grid-column-start',
    'grid-column-end'
  ],
  'grid-row': [
    'grid-row-start',
    'grid-row-end'
  ],
  'grid-template': [
    'grid-template-rows', 
    'grid-template-columns',
    'grid-template-areas'
  ],
  'list-style': [
    'list-style-type', 
    'list-style-image', 
    'list-style-position'
  ],
  'margin': [
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left'
  ],
  'offset': [
    'offset-position',
    'offset-path',
    'offset-distance',
    'offset-anchor',
    'offset-rotate'
  ],
  'outline': [
    'outline-style', 
    'outline-width', 
    'outline-color'
  ],
  'overflow': [
    'overflow-x',
    'overflow-y'
  ],
  'padding': [
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left'
  ],
  'place-content': [
    'align-content',
    'justify-content '
  ],
  'place-items': [
    'align-items',
    'justify-items'
  ],
  'place-self': [
    'align-self',
    'justify-self'
  ],
  'text-decoration': [
    'text-decoration-line', 
    'text-decoration-color', 
    'text-decoration-style'
  ],
  'transition': [
    'transition-property', 
    'transition-duration', 
    'transition-timing-function',
    'transition-delay'
  ]
};