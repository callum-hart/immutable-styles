const ImmutableStyles = require('immutable-styles');
const { ErrorWithData } = ImmutableStyles;


function isImmutableStyleModule(resourceName) {
  return typeof(resourceName) !== 'undefined' &&
    resourceName.endsWith('.is.jsx');
}

function isSoureMapEnabled(moduleSource) {
  return typeof(moduleSource._sourceMap) !== 'undefined';
}

// throws error: when file contains a JavaScript error (i.e: variable is not defined)
function buildAST(modules) {
  const sourceMaps = new Map(); // key value pair of each fileName and content

  const AST = modules.filter(module => isImmutableStyleModule(module.resource))
    .map(module => {
      const fileName = module.resource;
      const fileSource = module._source;

      try {
        if (isSoureMapEnabled(fileSource)) {
          // save key value pair of fileName and its content
          sourceMaps.set(fileName, fileSource._sourceMap.sourcesContent[0]);
          return eval(fileSource._value); // todo: use https://www.npmjs.com/package/safer-eval
        } else {
          // todo: log prompt to enable source maps (https://webpack.js.org/configuration/devtool/)
          console.log('source maps not enabled 🙁');
        }
      } catch (err) {
        // todo: log error to console `ImmutableStyles.logError()`
        throw new ErrorWithData(
          err.message,
          {
            fileName,
            source: sourceMaps.get(fileName)
          }
        );
      }
    })
    // flatten AST
    .reduce((acc, curr) => Array.isArray(curr)
      ? acc.concat([...curr])
      : acc.concat(curr)
    , []);

  return {
    AST,
    sourceMaps
  }
}

class ImmutableStylesPlugin {
  constructor(options) {
    // this.options = options;
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('finish-modules', async (modules) => {
        // Discard the previous AST and build a new one. This is because (like CSS)
        // immutable styles are global. A style in fileA can effect styles in fileB,
        // fileC, fileD et-cetera.
        ImmutableStyles.tearDown();

        try {
          const { AST, sourceMaps } = buildAST(modules);
          const CSS = ImmutableStyles.createCSS(AST, sourceMaps);
          // todo: put CSS into a file (get dist location from config)
          console.log(CSS);
        } catch (err) {
          console.log(err);
          compilation.errors.push(err);
        }
      });
    });
  }
}

module.exports = ImmutableStylesPlugin;