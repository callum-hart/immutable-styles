var dynamicClass = "dynamicClassName";

module.exports = (ImmutableStyles) => [
  <footer className={dynamicClass}>
    float: left;
    clear: both;

    <p className="shshs">
      font-size: 12px;
    </p>
  </footer>,

  <span className="title">
    font-weight: bold /* this is a user defined comment */;
    color: red;
  </span>,
]