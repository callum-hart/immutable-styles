# Immutable Styles Webpack Plugin

install dependencies:
- immutable styles
- webpack plugin

install dev dependencies:
- babel-loader
- @babel/core
- @babel/preset-env
- @babel/plugin-transform-react-jsx (used to transform JSX into `createStyles`)
- @babel/plugin-transform-react-jsx-source

configure plugin (in webpack.config.js):
- import ImmutableStylesPlugin
- and add to plugins
- enable sourcemaps `devtool: "source-map"`
