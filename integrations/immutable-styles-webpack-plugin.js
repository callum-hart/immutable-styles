const { createCSS, tearDown } = require('immutable-styles');

// todo: come up with a different way to identify immutable style files?
function isImmutableStyleModule(resourceName) {
  return typeof(resourceName) !== 'undefined' &&
    resourceName.endsWith('.is.jsx');
}

function isSoureMapEnabled(moduleSource) {
  return typeof(moduleSource._sourceMap) !== 'undefined';
}

function buildImmutableAST(modules) {
  return new Promise((resolve, reject) => {
    const sources = new Map(); // key value pair of each fileName and content

    const AST = modules.filter(module => isImmutableStyleModule(module.resource))
      .map(module => {
        const fileName = module.resource;
        const fileSource = module._source;

        try {
          if (isSoureMapEnabled(fileSource)) {
            // save key value pair of fileName and its content
            sources.set(fileName, fileSource._sourceMap.sourcesContent[0]);
            return eval(fileSource._value); // todo: use https://www.npmjs.com/package/safer-eval
          } else {
            // todo: log prompt to enable source maps (https://webpack.js.org/configuration/devtool/)
            console.log("source maps not enabled 🙁");
          }
        } catch (err) {
          // throws when file contains a JS error (i.e: variable is not defined)
          reject({
            err,
            fileName,
            source: sources.get(fileName)
          });
        }
      })
      // flatten AST
      .reduce((acc, curr) => Array.isArray(curr)
        ? acc.concat([...curr])
        : acc.concat(curr)
      , []);

    resolve({
      AST,
      sources
    });
  });
}

function parseImmutableAST(AST, sources) {
  return new Promise((resolve, reject) => {
    try {
      const CSS = createCSS(AST);
      resolve(CSS);
    } catch (err) {
      const { __source } = err.data;

      reject({
        err,
        fileName: __source.fileName,
        lineNumber:  __source.lineNumber,
        source: sources.get(__source.fileName)
      });
    }
  });
}

function ImmutableStylesPlugin(options) {}

ImmutableStylesPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compilation", (compilation) => {
    compilation.plugin("finish-modules", async (modules) => {
      tearDown(); // clear immutable AST

      try {
        const { AST, sources } = await buildImmutableAST(modules);
        const CSS = await parseImmutableAST(AST, sources);
        // todo: put CSS into a file (get dist location from config)
        console.log(CSS);
      } catch ({
          err,
          fileName,
          lineNumber = null,
          source
        }) {
        console.log('\nfileName:\n', fileName, '\nlineNumber:\n', lineNumber, '\nsource:\n', source);
        // todo: include attrs.__source(s) in all errors thrown by "immutable-styles"
        // todo: log an elm-esque error message
        compilation.errors.push(err);
      }
    });
  });
};

module.exports = ImmutableStylesPlugin;