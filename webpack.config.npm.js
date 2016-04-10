var common = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/library',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'react-orderable.js',
    path: '.',
  },
  externals: [
    /^\w+$/,
  ],
  module: {
    loaders: [
      common.jsLoader,
      {
        test: common.cssLoader.test,
        include: common.cssLoader.include,
        loader: ExtractTextPlugin.extract('style', 'css?localIdentName=react-orderable-[name]-[local]!sass')
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('react-orderable.css'),
  ],
};
