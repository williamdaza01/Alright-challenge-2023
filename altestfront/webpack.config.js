const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ContextReplacementPlugin(
      /crypto-js(\\|\/)/,
      path.resolve(__dirname, './src')
    )
  ]
};
