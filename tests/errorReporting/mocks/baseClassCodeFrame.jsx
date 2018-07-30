module.exports = [
  // unknown baseclass:

  <senarioOne className="unknownBaseClass.subClass">color: cadetblue;</senarioOne>,
  <senarioTwo  className="unknownBaseClass.subClass"  > color : cadetblue;</senarioTwo>,
  <senarioThree className="unknownBaseClass.subClass">
    color: cadetblue;
  </senarioThree>,
    <senarioFour   className="unknownBaseClass.subClass" >
    color: cadetblue;
  </senarioFour>,
  <senarioFive
    className="unknownBaseClass.subClass"  >
    color : cadetblue;
  </senarioFive>,
  <senarioSix
    className="unknownBaseClass.subClass"
  >
    color : cadetblue;
  </senarioSix>,

  // unknown baseclass with same name as CSS property:

  <senarioOne className="color.subClass">color: cadetblue;</senarioOne>,
  <senarioTwo  className="color.subClass"  > color : cadetblue;</senarioTwo>,
  <senarioThree className="color.subClass">
    color : cadetblue;
  </senarioThree>,
    <senarioFour   className="color.subClass" >
    color : cadetblue;
  </senarioFour>,
  <senarioFive
    className="color.subClass"  >
    color : cadetblue;
  </senarioFive>,
  <senarioSix
    className="color.subClass"
  >
    color : cadetblue;
  </senarioSix>,

  // unknown baseclass with same name as subclass:

  <senarioOne className="subClass.subClass">color: cadetblue;</senarioOne>,
  <senarioTwo  className="subClass.subClass"  > color : cadetblue;</senarioTwo>,
  <senarioThree className="subClass.subClass">
    color : cadetblue;
  </senarioThree>,
    <senarioFour   className="subClass.subClass" >
    color : cadetblue;
  </senarioFour>,
  <senarioFive
    className="subClass.subClass"  >
    color : cadetblue;
  </senarioFive>,
  <senarioSix
    className="subClass.subClass"
  >
    color : cadetblue;
  </senarioSix>,

  // unknown baseclass with same name as attribute name:

  <senarioOneDotOne pseudo=":hover" className="pseudo.subClass">color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo className="pseudo.subClass" pseudo=":hover">color: cadetblue;</senarioOneDotTwo>,
  <senarioOneDotTwo  pseudo=":hover" className="pseudo.subClass"  > color : cadetblue;</senarioOneDotTwo>,
  <senarioTwoDotTwo  className="pseudo.subClass" pseudo=":hover"  > color : cadetblue;</senarioTwoDotTwo>,
  <senarioThreeDotOne pseudo=":hover"
    className="pseudo.subClass">
    color : cadetblue;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo className="pseudo.subClass"
    pseudo=":hover">
    color : cadetblue;
  </senarioThreeDotTwo>,
    <senarioFourDotOne  pseudo=":hover"
        className="pseudo.subClass" >
    color : cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo  className="pseudo.subClass"
        pseudo=":hover" >
    color : cadetblue;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
    pseudo=":hover"
    className="pseudo.subClass"  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
    className="pseudo.subClass"
    pseudo=":hover"  >
    color : cadetblue;
  </senarioFiveDotTwo>,
  <senarioSixDotOne
    pseudo=":hover"
    className="pseudo.subClass"
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    className="pseudo.subClass"
    pseudo=":hover"
  >
    color : cadetblue;
  </senarioSixDotTwo>,

  // unknown baseclass with same name as attribute value:

  <senarioOneDotOne pseudo=":hover" className="hover.subClass">color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo className="hover.subClass" pseudo=":hover">color: cadetblue;</senarioOneDotTwo>,
  <senarioOneDotTwo  pseudo=":hover" className="hover.subClass"  > color : cadetblue;</senarioOneDotTwo>,
  <senarioTwoDotTwo  className="hover.subClass" pseudo=":hover"  > color : cadetblue;</senarioTwoDotTwo>,
  <senarioThreeDotOne pseudo=":hover"
    className="hover.subClass">
    color : cadetblue;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo className="hover.subClass"
    pseudo=":hover">
    color : cadetblue;
  </senarioThreeDotTwo>,
    <senarioFourDotOne  pseudo=":hover"
        className="hover.subClass" >
    color : cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo  className="hover.subClass"
        pseudo=":hover" >
    color : cadetblue;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
    pseudo=":hover"
    className="hover.subClass"  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
    className="hover.subClass"
    pseudo=":hover"  >
    color : cadetblue;
  </senarioFiveDotTwo>,
  <senarioSixDotOne
    pseudo=":hover"
    className="hover.subClass"
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    className="hover.subClass"
    pseudo=":hover"
  >
    color : cadetblue;
  </senarioSixDotTwo>,

  // unknown baseclass with same name as JSX tag:

  <senarioOne className="senarioOne.subClass">color: cadetblue;</senarioOne>,
  <senarioTwo  className="senarioTwo.subClass"  > color : cadetblue;</senarioTwo>,
  <senarioThree className="senarioThree.subClass">
    color: cadetblue;
  </senarioThree>,
    <senarioFour   className="senarioFour.subClass" >
    color: cadetblue;
  </senarioFour>,
  <senarioFive
    className="senarioFive.subClass"  >
    color : cadetblue;
  </senarioFive>,
  <senarioSix
    className="senarioSix.subClass"
  >
    color : cadetblue;
  </senarioSix>,

  // unknown baseclass that matches a comment:

  <senarioThreeDotOne // className="unknownBaseClass.subClass"
    className="unknownBaseClass.subClass">
    color : cadetblue;
  </senarioThreeDotOne>,
    <senarioFourDotOne  // className="unknownBaseClass.subClass"
        className="unknownBaseClass.subClass" >
    color : cadetblue;
  </senarioFourDotOne>,
  <senarioFiveDotOne
    // className="unknownBaseClass.subClass"
    className="unknownBaseClass.subClass"  >
    color : cadetblue;
  </senarioFiveDotOne>,
  <senarioSixDotOne
    // className="unknownBaseClass.subClass"
    className="unknownBaseClass.subClass"
  >
    color : cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo
    className="unknownBaseClass.subClass"
    // className="unknownBaseClass.subClass"
  >
    color : cadetblue;
  </senarioSixDotTwo>
];