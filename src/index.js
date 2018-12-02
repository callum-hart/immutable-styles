const {
  createStyle,
  createMixin,
  createCSS,
  tearDown,
} = require('./core');
const ImmutableStylesWebpackPlugin = require('./integrations/webpack-plugin');

module.exports = {
  createStyle,
  createMixin,
  createCSS,
  tearDown,
  ImmutableStylesWebpackPlugin
};