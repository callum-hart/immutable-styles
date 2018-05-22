/*
Webpack loader
*/

var { createCSS } = require("immutable-styles");


// temp
function log(name, value) {
  console.log(`\nstart logging for: ${name}`);
  console.log(value);
  console.log(`\n end logging for: ${name}`)
}

module.exports = function(source) {
  const fileName = this.resourcePath;
  const immutableStylesAST = this.exec(source, fileName);

  // log("source", source);
  // log("immutableStylesAST", immutableStylesAST);

  try {
    createCSS(immutableStylesAST);
  } catch ({ message, data }) {
    log("message",message);
    log("data", data);
    this.emitError(message);
  }

  this.callback(null, source);
};