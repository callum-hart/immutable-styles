var ImmutableStylesPlugin = require('@immutable-styles/webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new ImmutableStylesPlugin({
      // dist: "./dist/custom-file-name.css" // defaults to ./dist/bundle.css
    })
  ],
  devtool: "source-map", // required by immutable-styles-plugin
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};