const color = "ORANGE";

module.exports = (ImmutableStyles) => [
  ImmutableStyles.createStyle(
    "span",
    {
      className: "errorMessage",
      minWidth: 300,
      maxWidth: 600
    },
    `color: ${color}; background: red;`
  ),

  ImmutableStyles.createStyle(
    "span",
    {
      className: "errorMessage",
      minWidth: 601,
      maxWidth: 900
    },
    "color: blue;"
  ),

  ImmutableStyles.createStyle(
    "span",
    {
      className: "errorMessage",
      minWidth: 300,
      maxWidth: 500
    },
    "font-size: 12px;"
  ),

  ImmutableStyles.createStyle(
    "span",
    {
      className: "errorMessage",
      maxWidth: 200
    },
    "font-weight: bold;"
  ),

  ImmutableStyles.createStyle(
    "span",
    {
      className: "errorMessage"
    },
    "font-style: italic;"
  ),

  ImmutableStyles.createStyle(
    "a",
    {
      className: "link",
      maxWidth: 900
    },
    "color: cadetblue;"
  ),

  ImmutableStyles.createStyle(
    "div",
    {
      minWidth: 901
    },
    "height: 100px;",
    ImmutableStyles.createStyle(
      "span",
      {
        className: "errorMessage"
      },
      "line-height: 100; text-transform: uppercase;",
      ImmutableStyles.createStyle(
        "a",
        {
          className: "link"
        },
        "color: red"
      )
    ),
    ImmutableStyles.createStyle(
      "span",
      {
        className: "errorMessage"
      },
      "float: left;"
    )
  )
];