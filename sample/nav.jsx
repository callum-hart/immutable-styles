var textColor = "purple";
var fontWeight = 600;

var detatchedRuleSet = "color: red; font-size: 20px;";

module.exports = (ImmutableStyles) => [
  <nav className="someNav">
    float: left;
    clear: both;
    background: red;

    <a className="someLink" on="hover">
      color: blue;
    </a>

    <hr>
      border-top: 0px;
    </hr>

    <p className="bar">
      font-size: 13px;
      font-weight: {fontWeight};
      text-transform: uppercase;
      color: {textColor};
      line-height: 20px;

      <span className="foo">
        height: 20px;
        font-weight: {fontWeight};
        float: left;
        {detatchedRuleSet}
        color: green; {/* shouldn't be allowed, color set in detached rule-set */}
      </span>
    </p>
  </nav>
]