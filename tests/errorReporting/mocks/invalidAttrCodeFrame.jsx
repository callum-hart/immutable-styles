module.exports = [
  // invalid attribute:

  <senarioOne invalidAttr>color: cadetblue;</senarioOne>,
  <senarioTwo  invalidAttr  > color : cadetblue;</senarioTwo>,
  <senarioThree invalidAttr>
    color: cadetblue;
  </senarioThree>,
    <senarioFour   invalidAttr >
    color: cadetblue;
  </senarioFour>,
  <senarioFive
    invalidAttr  >
    color : cadetblue;
  </senarioFive>,
  <senarioSix
    invalidAttr
  >
    color : cadetblue;
  </senarioSix>,

  // invalid attribute with same name as CSS property:

  <senarioOne color>color: cadetblue;</senarioOne>,
  <senarioTwo  color  > color : cadetblue;</senarioTwo>,
  <senarioThree color>
    color : cadetblue;
  </senarioThree>,
    <senarioFour   color >
    color : cadetblue;
  </senarioFour>,
  <senarioFive
    color  >
    color : cadetblue;
  </senarioFive>,
  <senarioSix
    color
  >
    color : cadetblue;
  </senarioSix>,

  // invalid attribute with same name as CSS className:

  <senarioOneDotOne className="aClass" aClass>color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo aClass className="aClass">color: cadetblue;</senarioOneDotTwo>,
  <senarioTwoDotOne  className="aClass" aClass  > color : cadetblue;</senarioTwoDotOne>,
  <senarioTwoDotTwo  aClass className="aClass"  > color : cadetblue;</senarioTwoDotTwo>,
  <senarioThreeDotOne className="aClass"
    aClass>
    color : cadetblue;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo aClass
    className="aClass">
    color : cadetblue;
  </senarioThreeDotTwo>,
    <senarioFourDotOne  className="aClass"
        aClass >
    color : cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo  aClass
        className="aClass" >
    color : cadetblue;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
    className="aClass"
    aClass  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
    aClass
    className="aClass"  >
    color : cadetblue;
  </senarioFiveDotTwo>,
  <senarioSixDotOne
    className="aClass"
    aClass
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    aClass
    className="aClass"
  >
    color : cadetblue;
  </senarioSixDotTwo>,

  // invalid attribute with same name as baseclass:

  <senarioOneDotOne className="baseClass.subClass" baseClass>color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo baseClass className="baseClass.subClass">color: cadetblue;</senarioOneDotTwo>,
  <senarioTwoDotOne  className="baseClass.subClass" baseClass  > color : cadetblue;</senarioTwoDotOne>,
  <senarioTwoDotTwo  baseClass className="baseClass.subClass"  > color : cadetblue;</senarioTwoDotTwo>,
  <senarioThreeDotOne className="baseClass.subClass"
    baseClass>
    color : cadetblue;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo baseClass
    className="baseClass.subClass">
    color : cadetblue;
  </senarioThreeDotTwo>,
    <senarioFourDotOne  className="baseClass.subClass"
        baseClass >
    color : cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo  baseClass
        className="baseClass.subClass" >
    color : cadetblue;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
    className="baseClass.subClass"
    baseClass  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
    baseClass
    className="baseClass.subClass"  >
    color : cadetblue;
  </senarioFiveDotTwo>,
  <senarioSixDotOne
    className="baseClass.subClass"
    baseClass
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    baseClass
    className="baseClass.subClass"
  >
    color : cadetblue;
  </senarioSixDotTwo>,

  // invalid attribute with same name as subclass:

  <senarioOneDotOne className="baseClass.subClass" subClass>color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo subClass className="baseClass.subClass">color: cadetblue;</senarioOneDotTwo>,
  <senarioTwoDotOne  className="baseClass.subClass" subClass  > color : cadetblue;</senarioTwoDotOne>,
  <senarioTwoDotTwo  subClass className="baseClass.subClass"  > color : cadetblue;</senarioTwoDotTwo>,
  <senarioThreeDotOne className="baseClass.subClass"
    subClass>
    color : cadetblue;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo subClass
    className="baseClass.subClass">
    color : cadetblue;
  </senarioThreeDotTwo>,
    <senarioFourDotOne  className="baseClass.subClass"
        subClass >
    color : cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo  subClass
        className="baseClass.subClass" >
    color : cadetblue;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
    className="baseClass.subClass"
    subClass  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
    subClass
    className="baseClass.subClass"  >
    color : cadetblue;
  </senarioFiveDotTwo>,
  <senarioSixDotOne
    className="baseClass.subClass"
    subClass
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    subClass
    className="baseClass.subClass"
  >
    color : cadetblue;
  </senarioSixDotTwo>,

  // invalid attribute that partially matches a valid attribute:

  <senarioOneDotOne pseudo=":hover" pseu>color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo pseu pseudo=":hover">color: cadetblue;</senarioOneDotTwo>,
  <senarioOneDotTwo  pseudo=":hover" pseu  > color : cadetblue;</senarioOneDotTwo>,
  <senarioTwoDotTwo  pseu pseudo=":hover"  > color : cadetblue;</senarioTwoDotTwo>,
  <senarioThreDotOne pseudo=":hover"
    pseu>
    color : cadetblue;
  </senarioThreDotOne>,
  <senarioThreeDotTwo pseu
    pseudo=":hover">
    color : cadetblue;
  </senarioThreeDotTwo>,
    <senarioFourDotOne  pseudo=":hover"
        pseu >
    color : cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo  pseu
        pseudo=":hover" >
    color : cadetblue;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
    pseudo=":hover"
    pseu  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
    pseu
    pseudo=":hover"  >
    color : cadetblue;
  </senarioFiveDotTwo>,
  <senarioSixDotOne
    pseudo=":hover"
    pseu
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    pseu
    pseudo=":hover"
  >
    color : cadetblue;
  </senarioSixDotTwo>,

  // invalid attribute that matches name of JSX tag

  <senarioOne senarioOne>color: cadetblue;</senarioOne>,
  <senarioTwo  senarioOne  > color : cadetblue;</senarioTwo>,
  <senarioThree senarioOne>
    color: cadetblue;
  </senarioThree>,
    <senarioFour   senarioOne >
    color: cadetblue;
  </senarioFour>,
  <senarioFive
    senarioOne  >
    color : cadetblue;
  </senarioFive>,
  <senarioSix
    senarioOne
  >
    color : cadetblue;
  </senarioSix>,

  // invalid attribute that matches a comment:

  <senarioThreeDotOne // invalidAttr
    invalidAttr>
    color : cadetblue;
  </senarioThreeDotOne>,
    <senarioFourDotOne  // invalidAttr
        invalidAttr >
    color : cadetblue;
  </senarioFourDotOne>,
  <senarioFiveDotOne
    // invalidAttr
    invalidAttr  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioSixDotOne
    // invalidAttr
    invalidAttr
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    invalidAttr
    // invalidAttr
  >
    color : cadetblue;
  </senarioSixDotTwo>
];
