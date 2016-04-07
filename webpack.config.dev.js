var common = require('./webpack.config.common');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    './app/entrypoint'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      common.jsLoader,
      common.cssLoader,
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
