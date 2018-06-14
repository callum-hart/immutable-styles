/*
 Testing that styles can extend from a base class.
*/

const {
  createCSS,
  createStyle,
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
      'padding-top:20px;background-color:ivory;'
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
  padding-top:20px;background-color:ivory;
}
form[class="baseForm subForm"] {
  padding-top:20px;background-color:ivory;
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
      'padding-top:20px;background-color:ivory;'
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      'margin-top:15px;'
    )
  ];

  const output = `form[class="baseForm"] {
  padding-top:20px;background-color:ivory;
}
form[class="baseForm subForm"] {
  padding-top:20px;background-color:ivory;margin-top:15px;
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
      'padding-top:20px;background-color:ivory;'
    ),
    createStyle(
      'form',
      {
        className: 'baseForm.subForm'
      },
      'background-color:white;'
    )
  ];

  const output = `form[class="baseForm"] {
  padding-top:20px;background-color:ivory;
}
form[class="baseForm subForm"] {
  padding-top:20px;background-color:white /* (original value: ivory) */;
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
      'padding-top:20px;background-color:ivory;',
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
  padding-top:20px;background-color:ivory;
}
form[class="baseForm"] > input:not([class]) {
  font-size:16px;
}
form[class="baseForm subForm"] {
  padding-top:20px;background-color:ivory;
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
      'padding-top:20px;background-color:ivory;',
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
        'color: lightgrey;'
      )
    )
  ];

  const output = `form[class="baseForm"] {
  padding-top:20px;background-color:ivory;
}
form[class="baseForm"] > input:not([class]) {
  font-size:16px;
}
form[class="baseForm subForm"] {
  padding-top:20px;background-color:ivory;
}
form[class="baseForm subForm"] > input:not([class]) {
  font-size:16px;color:lightgrey;
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
      'padding-top:20px;background-color:ivory;',
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
  padding-top:20px;background-color:ivory;
}
form[class="baseForm"] > input:not([class]) {
  font-size:16px;
}
form[class="baseForm subForm"] {
  padding-top:20px;background-color:ivory;
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
