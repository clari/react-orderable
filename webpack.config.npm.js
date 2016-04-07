var common = require('./webpack.config.common');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  entry: './lib/library',
  output: {
    filename: 'react-orderable.js',
    library: 'ReactOrderable',
    libraryTarget: 'umd',
    path: 'dist',
  },
  externals: {
    react: 'React',
  },
  module: {
    loaders: [
      common.jsLoader,
      {
        test: common.cssLoader.test,
        include: common.cssLoader.include,
        loader: ExtractTextPlugin.extract('style', 'css?localIdentName=react-orderable-[name]-[local]!postcss!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('react-orderable.css'),
  ],
};
