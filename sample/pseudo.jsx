module.exports = (ImmutableStyles) => [
  <a className="aLink" pseudo=":hover">
    color: blue;
  </a>,

  <a className="aLink" pseudo="::after">
    content: '';
    padding: 10px;
    display: inline-block;
    background: grey;
  </a>,

  <a className="aLink" pseudo=":hover::after">
    background: red;
  </a>,

  <a className="aLink" pseudo=":visited:hover::after">
    background: blue;
  </a>
]