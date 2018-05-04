/*
 Testing that styles can extend from a base class.
*/

const {
  createStyle,
  createCSS,
  tearDown
} = require('../src/immutableStyles');

beforeEach(() => tearDown());


test('[composition] Subclass inherits styles from base-class', () => {
  const input = [
    createStyle(
      'form',
      {
        className: 'baseForm'
      },
      'padding:20px;background:ivory;border:1px solid lightgrey;'
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      ''
    )
  ];

  const output = `form[class="baseForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm subForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[composition] Subclass can add its own styles to inherited styles', () => {
  const input = [
    createStyle(
      'form',
      {
        className: 'baseForm'
      },
      'padding:20px;background:ivory;border:1px solid lightgrey;'
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      'margin:15px;'
    )
  ];

  const output = `form[class="baseForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm subForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;margin:15px;
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[composition] Subclass can override an inherited style', () => {
  const input = [
    createStyle(
      'form',
      {
        className: 'baseForm'
      },
      'padding:20px;background:ivory;border:1px solid lightgrey;'
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      'background:white;'
    )
  ];

  const output = `form[class="baseForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm subForm"] {
  padding:20px;background:white /* (original value: ivory) */;border:1px solid lightgrey;
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[composition] Subclass inherits child node styles from base-class', () => {
  const input = [
    createStyle(
      'form',
      {
        className: 'baseForm'
      },
      'padding:20px;background:ivory;border:1px solid lightgrey;',
      createStyle(
        'input',
        null,
        'font-size:16px;'
      )
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      ''
    )
  ];

  const output = `form[class="baseForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm"] > input:not([class]) {
  font-size:16px;
}
form[class="baseForm subForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm subForm"] > input:not([class]) {
  font-size:16px;
}
`;

  expect(createCSS(input)).toEqual(output);
});



test('[composition] Subclass can add its own styles to child nodes', () => {
  const input = [
    createStyle(
      'form',
      {
        className: 'baseForm'
      },
      'padding:20px;background:ivory;border:1px solid lightgrey;',
      createStyle(
        'input',
        null,
        'font-size:16px;'
      )
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      '',
      createStyle(
        'input',
        null,
        'border:1px solid slategray;'
      )
    )
  ];

  const output = `form[class="baseForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm"] > input:not([class]) {
  font-size:16px;
}
form[class="baseForm subForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm subForm"] > input:not([class]) {
  font-size:16px;border:1px solid slategray;
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[composition] Subclass can override inherited child node styles', () => {
  const input = [
    createStyle(
      'form',
      {
        className: 'baseForm'
      },
      'padding:20px;background:ivory;border:1px solid lightgrey;',
      createStyle(
        'input',
        null,
        'font-size:16px;'
      )
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      '',
      createStyle(
        'input',
        null,
        'font-size:18px;'
      )
    )
  ];

  const output = `form[class="baseForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm"] > input:not([class]) {
  font-size:16px;
}
form[class="baseForm subForm"] {
  padding:20px;background:ivory;border:1px solid lightgrey;
}
form[class="baseForm subForm"] > input:not([class]) {
  font-size:18px /* (original value: 16px) */;
}
`;

  expect(createCSS(input)).toEqual(output);
});


test('[composition] Cannot extend a non-existent base-class', () => {
  const input = createStyle(
    'div',
    {
      className: 'modal.subModal'
    },
    ''
  );

  const unknownBaseClass = () => createCSS(input);
  expect(unknownBaseClass).toThrow('The base class `div.modal` does not exist');
});
