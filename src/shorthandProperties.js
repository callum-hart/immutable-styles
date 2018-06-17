// Thanks Mozilla 🙏 `https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties`

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
  'animation': {
    suggestions: [
      'animation-name', 
      'animation-duration', 
      'animation-timing-function', 
      'animation-delay', 
      'animation-iteration-count', 
      'animation-direction', 
      'animation-fill-mode', 
      'animation-play-state'
    ]
  },
  'background': {
    suggestions: [
      'background-clip',
      'background-color',
      'background-image',
      'background-origin',
      'background-position',
      'background-repeat',
      'background-size',
      'background-attachment'
    ]
  },
  'border': {
    suggestions: borderLonghandProperties,
    helper: {
      name: 'border',
      example: "border('1px', 'solid', 'cadetblue')"
    }
  },
  'border-width': {
    suggestions: borderLonghandProperties
  },
  'border-style': {
    suggestions: borderLonghandProperties
  },
  'border-color': {
    suggestions: borderLonghandProperties
  },
  'border-top': {
    suggestions: borderLonghandProperties,
    helper: {
      name: 'borderTop',
      example: "borderTop('1px', 'solid', 'cadetblue')"
    }
  },
  'border-right': {
    suggestions: borderLonghandProperties,
    helper: {
      name: 'borderRight',
      example: "borderRight('1px', 'solid', 'cadetblue')"
    }
  },
  'border-bottom': {
    suggestions: borderLonghandProperties,
    helper: {
      name: 'borderBottom',
      example: "borderBottom('1px', 'solid', 'cadetblue')"
    }
  },
  'border-left': {
    suggestions: borderLonghandProperties,
    helper: {
      name: 'borderLeft',
      example: "borderLeft('1px', 'solid', 'cadetblue')"
    }
  },
  'border-radius': {
    suggestions: [
      'border-top-left-radius', 
      'border-top-right-radius', 
      'border-bottom-right-radius',
      'border-bottom-left-radius'
    ],
    helper: {
      name: 'borderRadius',
      example: "borderRadius('5px')"
    }
  },
  'column-rule': {
    suggestions: [
      'column-rule-width', 
      'column-rule-style',
      'column-rule-color'
    ]
  },
  'columns': {
    suggestions: [
      'column-width',
      'column-count'
    ]
  },
  'flex': {
    suggestions: [
      'flex-grow', 
      'flex-shrink',
      'flex-basis'
    ]
  },
  'flex-flow': {
    suggestions: [
      'flex-direction',
      'flex-wrap'
    ]
  },
  'font': {
    suggestions: [
      'font-style', 
      'font-variant', 
      'font-weight', 
      'font-size', 
      'line-height', 
      'font-family'
    ]
  },
  'grid': {
    suggestions: [
      'grid-template-rows', 
      'grid-template-columns', 
      'grid-template-areas',
      'grid-auto-rows', 
      'grid-auto-columns',
      'grid-auto-flow'
    ]
  },
  'grid-area': {
    suggestions: [
      'grid-row-start', 
      'grid-column-start', 
      'grid-row-end',
      'grid-column-end'
    ]
  },
  'grid-column': {
    suggestions: [
      'grid-column-start',
      'grid-column-end'
    ]
  },
  'grid-row': {
    suggestions: [
      'grid-row-start',
      'grid-row-end'
    ]
  },
  'grid-template': {
    suggestions: [
      'grid-template-rows', 
      'grid-template-columns',
      'grid-template-areas'
    ]
  },
  'list-style': {
    suggestions: [
      'list-style-type', 
      'list-style-image', 
      'list-style-position'
    ]
  },
  'margin': {
    suggestions: [
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left'
    ],
    helper: {
      name: 'margin',
      example: "margin('10px', '20px')"
    }
  },
  'offset': {
    suggestions: [
      'offset-position',
      'offset-path',
      'offset-distance',
      'offset-anchor',
      'offset-rotate'
    ]
  },
  'outline': {
    suggestions: [
      'outline-style', 
      'outline-width', 
      'outline-color'
    ]
  },
  'overflow': {
    suggestions: [
      'overflow-x',
      'overflow-y'
    ]
  },
  'padding': {
    suggestions: [
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left'
    ],
    helper: {
      name: 'padding',
      example: "padding('10px', '20px')"
    }
  },
  'place-content': {
    suggestions: [
      'align-content',
      'justify-content '
    ]
  },
  'place-items': {
    suggestions: [
      'align-items',
      'justify-items'
    ]
  },
  'place-self': {
      suggestions: [
      'align-self',
      'justify-self'
    ]
  },
  'text-decoration': {
    suggestions: [
      'text-decoration-line', 
      'text-decoration-color', 
      'text-decoration-style'
    ]
  },
  'transition': {
      suggestions: [
      'transition-property', 
      'transition-duration', 
      'transition-timing-function',
      'transition-delay'
    ]
  }
};