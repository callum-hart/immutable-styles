/*
  UNKOWN_ATTRIBUTE

  <h1 foo="invalidAttr">
    color: #333;
    font-size: 20px;
    color: red;
  </h1>
 */


/*
  ELEMENT_CANNOT_USE_PROPERTY

  <div>
    font-size: 20px;
  </div>
 */


/*
  OVERRIDE_FOUND

  <p className="foo">
    font-size: 20px;
  </p>,

  <p className="foo">
    color: red;
    font-size: 10px;
  </p>

  <p className="child">
    color: black;
  </p>,

  <div className="parent">
    <p className="child">
      font-size: 10px;
      color: white;
    </p>
  </div>
 */


/*
  NESTED_MEDIA_QUERY

  <section className="foo" minWidth="400">
    <p minWidth="500">
      font-size: 12px;
    </p>
  </section>
 */


/*
  UNKOWN_BASE_CLASS

  <form className="baseClass.subClass">
    padding: 20px;
  </form>
 */


/*
  DUPLICATE_PROPERTY

  <h1>
    color: #333;
    font-size: 20px;
    color: red;
  </h1>
 */


module.exports = (ImmutableStyles) => [
  <h1 foo="invalidAttr">
    color: #333;
    font-size: 20px;
    color: red;
  </h1>
]