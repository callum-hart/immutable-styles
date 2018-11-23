module.exports = [
  // CSS property:

  <senarioOne>color: cadetblue;</senarioOne>,
  <senarioTwo   > color: cadetblue;</senarioTwo>,
  <senarioThree>
    color: cadetblue;
  </senarioThree>,
    <senarioFour    >
    color: cadetblue;
  </senarioFour>,
  <senarioFive
      >
    color: cadetblue;
  </senarioFive>,
  <senarioSix

  >
    color: cadetblue;
  </senarioSix>,

  // CSS property with same name as attribute name:

  <senarioOne color>color: cadetblue;</senarioOne>,
  <senarioTwo  color  > color: cadetblue;</senarioTwo>,
  <senarioThree color>
    color: cadetblue;
  </senarioThree>,
    <senarioFour   color >
    color: cadetblue;
  </senarioFour>,
  <senarioFive
    color  >
    color: cadetblue;
  </senarioFive>,
  <senarioSix
    color
  >
    color: cadetblue;
  </senarioSix>,

  // CSS property with same name as attribute value:

  <senarioOne className="color">color: cadetblue;</senarioOne>,
  <senarioTwo  className="color"  > color: cadetblue;</senarioTwo>,
  <senarioThree className="color">
    color: cadetblue;
  </senarioThree>,
    <senarioFour   className="color" >
    color: cadetblue;
  </senarioFour>,
  <senarioFive
    className="color"  >
    color: cadetblue;
  </senarioFive>,
  <senarioSix
    className="color"
  >
    color: cadetblue;
  </senarioSix>,

  // CSS property with same name as JSX tag:

  <senarioOne>senarioOne: cadetblue;</senarioOne>,
  <senarioTwo   > senarioTwo : cadetblue;</senarioTwo>,
  <senarioThree>
    senarioThree: cadetblue;
  </senarioThree>,
    <senarioFour    >
    senarioFour: cadetblue;
  </senarioFour>,
  <senarioFive
      >
    senarioFive : cadetblue;
  </senarioFive>,
  <senarioSix

  >
    senarioSix : cadetblue;
  </senarioSix>,

  // CSS property that matches a comment:

  <senarioOneDotOne>{/* color: cadetblue; */}color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo>color: cadetblue;{/* color: cadetblue; */}</senarioOneDotTwo>,
  <senarioTwoDotOne   > {/* color: cadetblue; */}color: cadetblue;</senarioTwoDotOne>,
  <senarioTwoDotTwo   > color: cadetblue;{/* color: cadetblue; */}</senarioTwoDotTwo>,
  <senarioThreeDotOne>
    {/* color: cadetblue; */}
    color: cadetblue;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo>
    color: cadetblue;
    {/* color: cadetblue; */}
  </senarioThreeDotTwo>,
    <senarioFourDotOne    >
    {/* color: cadetblue; */}
    color: cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo    >
    color: cadetblue;
    {/* color: cadetblue; */}
  </senarioFourDotTwo>,
  <senarioFiveDotOne
      >
    {/* color: cadetblue; */}
    color: cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
      >
    color: cadetblue;
    {/* color: cadetblue; */}
  </senarioFiveDotTwo>,
  <senarioSixDotOne

  >
    {/* color: cadetblue; */}
    color: cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo

  >
    color: cadetblue;
    {/* color: cadetblue; */}
  </senarioSixDotTwo>,

  // CSS property that partially matches another:

  <senarioOneDotOne>background-color: cadetblue;color: cadetblue;</senarioOneDotOne>,
  <senarioOneDotTwo>color: cadetblue;background-color: cadetblue;</senarioOneDotTwo>,
  <senarioTwoDotOne   > background-color: cadetblue; color: cadetblue;</senarioTwoDotOne>,
  <senarioTwoDotTwo   > color: cadetblue; background-color: cadetblue;</senarioTwoDotTwo>,
  <senarioThreeDotOne>
    background-color: cadetblue;
    color: cadetblue;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo>
    color: cadetblue;
    background-color: cadetblue;
  </senarioThreeDotTwo>,
    <senarioFourDotOne    >
    background-color: cadetblue;
    color: cadetblue;
  </senarioFourDotOne>,
    <senarioFourDotTwo    >
    color: cadetblue;
    background-color: cadetblue;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
      >
    background-color: cadetblue;
    color: cadetblue;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
      >
    color: cadetblue;
    background-color: cadetblue;
  </senarioFiveDotTwo>,
  <senarioSixDotOne

  >
    background-color: cadetblue;
    color: cadetblue;
  </senarioSixDotOne>,
  <senarioSixDotTwo

  >
    color: cadetblue;
    background-color: cadetblue;
  </senarioSixDotTwo>,

  // CSS property that matches CSS value:

  <senarioOneDotOne>left: 0;float: left;</senarioOneDotOne>,
  <senarioOneDotTwo>float: left;left: 0;</senarioOneDotTwo>,
  <senarioTwoDotOne   > left: 0; float: left;</senarioTwoDotOne>,
  <senarioTwoDotTwo   > float: left; left: 0;</senarioTwoDotTwo>,
  <senarioThreeDotOne>
    left: 0;
    float: left;
  </senarioThreeDotOne>,
  <senarioThreeDotTwo>
    float: left;
    left: 0;
  </senarioThreeDotTwo>,
    <senarioFourDotOne    >
    left: 0;
    float: left;
  </senarioFourDotOne>,
    <senarioFourDotTwo    >
    float: left;
    left: 0;
  </senarioFourDotTwo>,
  <senarioFiveDotOne
      >
    left: 0;
    float: left;
  </senarioFiveDotOne>,
  <senarioFiveDotTwo
      >
    float: left;
    left: 0;
  </senarioFiveDotTwo>,
  <senarioSixDotOne

  >
    left: 0;
    float: left;
  </senarioSixDotOne>,
  <senarioSixDotTwo

  >
    float: left;
    left: 0;
  </senarioSixDotTwo>
];
