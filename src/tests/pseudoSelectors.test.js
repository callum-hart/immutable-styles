/*
 Testing pseudo selectors for pseudo-classes and pseudo-elements
*/

const {
  createCSS,
  createStyle,
  tearDown
} = require('../index.js');

beforeEach(() => tearDown());


test('[pseudo] Node with pseudo-class', () => {
  const input = createStyle(
    'a',
    {
      pseudo: ':hover'
    },
    'color: slategray;'
  );

  const output = 'a:not([class]):hover{color: slategray;}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with pseudo-element (CSS2)', () => {
  const input = createStyle(
    'a',
    {
      pseudo: ':after'
    },
    'content: "Hallo";'
  );

  const output = 'a:not([class]):after{content: "Hallo";}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with pseudo-element (CSS3)', () => {
  const input = createStyle(
    'a',
    {
      pseudo: '::after'
    },
    'content: "🐹";'
  );

  const output = 'a:not([class])::after{content: "🐹";}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with class and pseudo-class', () => {
  const input = createStyle(
    'a',
    {
      className: 'btn',
      pseudo: ':hover'
    },
    'opacity: 0.75;'
  );

  const output = 'a[class="btn"]:hover{opacity: 0.75;}';

  expect(createCSS(input)).toEqual(output);
});

// node with class and pseudo-element
test('[pseudo] Node with class and pseudo-element', () => {
  const input = createStyle(
    'a',
    {
      className: 'btn--withIcon',
      pseudo: '::before'
    },
    'content: "🐹";'
  );

  const output = 'a[class="btn--withIcon"]::before{content: "🐹";}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with pseudo-class and pseudo-element', () => {
  const input = createStyle(
    'a',
    {
      pseudo: ':hover::before'
    },
    'opacity: 0.75;'
  );

  const output = 'a:not([class]):hover::before{opacity: 0.75;}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with psuedo-classes and pseudo-element', () => {
  const input = createStyle(
    'a',
    {
      pseudo: ':visited:hover::before'
    },
    'opacity: 0.5;'
  );

  const output = 'a:not([class]):visited:hover::before{opacity: 0.5;}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with class, psuedo-class and pseudo-element', () => {
  const input = createStyle(
    'a',
    {
      className: 'btn--withIcon',
      pseudo: ':hover::before'
    },
    'opacity: 1;'
  );

  const output = 'a[class="btn--withIcon"]:hover::before{opacity: 1;}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with class, psuedo-class and pseudo-element', () => {
  const input = createStyle(
    'a',
    {
      className: 'btn--withIcon',
      pseudo: ':visited:hover::before'
    },
    'opacity: 0.5;'
  );

  const output = 'a[class="btn--withIcon"]:visited:hover::before{opacity: 0.5;}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Node with psuedo-class and child node', () => {
  const input = [
    createStyle(
      'div',
      {
        className: 'parent',
        pseudo: ':hover'
      },
      createStyle(
        'a',
        {
          className: 'child',
        },
        'text-decoration-line: underline;'
      )
    )
  ];

  const output = 'div[class="parent"]:hover > a[class="child"]{text-decoration-line: underline;}';

  expect(createCSS(input)).toEqual(output);
});


test('[pseudo] Child node with psuedo-class', () => {
  const input = [
    createStyle(
      'div',
      {
        className: 'parent'
      },
      createStyle(
        'a',
        {
          className: 'child',
          pseudo: ':hover'
        },
        'font-weight: bold;'
      )
    )
  ];

  const output = 'div[class="parent"] > a[class="child"]:hover{font-weight: bold;}';

  expect(createCSS(input)).toEqual(output);
});