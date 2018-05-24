var { createCSS } = require("immutable-styles");


// temp
function log(name, value) {
  console.log(`\nstart logging for: ${name}\n`);
  console.log(value);
  console.log(`\n end logging for: ${name}\n`)
}

// @param `sourceMap` only exists when source maps is enabled
// via `devtool: "source-map"` (in `webpack.config.js`)
module.exports = function(source, sourceMap) {
  const fileName = this.resourcePath;
  const immutableStylesAST = this.exec(source, fileName);
  const options = {
    fileName,
    buildType: 'WEBPACK',
    rawContent: sourceMap.sourcesContent,
    sourceMapping: sourceMap.mappings
  };

  try {
    createCSS(immutableStylesAST, options);
  } catch ({ message, data }) {
    log("message",message);
    this.emitError(message);
  }

  this.callback(null, source);
};