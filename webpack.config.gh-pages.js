var common = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // Extract css so it can be loaded in head
var webpack = require('webpack');

module.exports = {
  entry: './app/entrypoint',
  output: {
    filename: 'bundle.js',
    path: 'dist',
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
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('react-orderable.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  postcss: common.postcss
};
