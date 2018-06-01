const { createCSS, tearDown } = require("immutable-styles");

// todo: come up with a different way to identify immutable style files?
function isImmutableStyleModule(resourceName) {
  return typeof(resourceName) !== 'undefined' &&
    resourceName.endsWith('.is.jsx');
}

function isSoureMapEnabled(moduleSource) {
  return typeof(moduleSource._sourceMap) !== 'undefined';
}

function parseImmutableAST(AST) {
  return new Promise((resolve, reject) => {
    try {
      const CSS = createCSS(AST);
      resolve(CSS);
    } catch (e) {
      reject(e);
    }
  });
}

function ImmutableStylesPlugin(options) {}

ImmutableStylesPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compilation", (compilation) => {
    compilation.plugin("finish-modules", (modules) => {
      tearDown(); // clear immutable AST
      const sources = new Map(); // key value pair of each fileName and content

      const styles = modules.filter(module => isImmutableStyleModule(module.resource))
        .map(module => {
          const fileName = module.resource;
          const fileSource = module._source;

          if (isSoureMapEnabled(fileSource)) {
            // save key value pair of fileName and its content
            sources.set(fileName, fileSource._sourceMap.sourcesContent[0]);
          } else {
            // todo: log prompt to enable source maps (https://webpack.js.org/configuration/devtool/)
            // todo: get file source using node fs
            console.log("source maps not enabled 🙁");
          }

          // return AST returned by `.createStyle`
          return eval(fileSource._value);
        })
        .reduce((acc, curr) => {
          // flatten AST
          if (Array.isArray(curr)) {
            return acc.concat([...curr]);
          } else {
            return acc.concat(curr);
          }
        }, []);

      parseImmutableAST(styles).then(CSS => {
        console.log(CSS);
        // todo: put CSS into a file (get dist location from config)
      }).catch(err => {
        compilation.errors.push(err);
      });
    });
  });

};

module.exports = ImmutableStylesPlugin;