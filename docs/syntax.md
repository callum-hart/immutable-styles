## Syntax

A simple rule-set:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "p",                     | p {
 null,                    |  color: cadetblue;
 "color: cadetblue;"      | }
)                         |
                          |
--------------------------------------------------------
```

A rule-set with attributtes:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "button",                | button.btn:hover {
 {                        |  opacity: 0.75;
   className: "btn",      | }
   pseudo: ":hover"       |
 },                       |
 "opacity: 0.75;"         |
)                         |
                          |
--------------------------------------------------------
```

A rule-set with child element:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "section",               | section.row {
 {                        |  display: flex;
  className: "row"        | }
 },                       |
 "display: flex;",        | section.row div.col {
 createStyle(             |  flex: 1;
  "div",                  | }
  {                       |
    className: "col"      |
  },                      |
  "flex: 1;"              |
 )                        |
)                         |
                          |
--------------------------------------------------------
```

A rule-set with media query:

```
--------------------------------------------------------
Immutable Styles          | Equivalent CSS
--------------------------------------------------------
                          |
createStyle(              |
 "h1",                    | @media (max-width:680px) {
 {                        |  h1 {
  maxWidth: 680           |   font-size: 1.6em;
 },                       |  }
 "font-size: 1.6em;"      | }
)                         |
                          |
--------------------------------------------------------
```