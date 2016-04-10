var common = require('./webpack.config.common');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    './app/welcome/entrypoint'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      common.jsLoader,
      common.cssLoader,
      common.fileLoader,
    ]
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  postcss: common.postcss
};
