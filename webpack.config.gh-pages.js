var common = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    './app/entrypoint'
  ],
  output: {
    filename: 'bundle.js',
    path: 'build',
    publicPath: 'build/'
  },
  module: {
    loaders: [
      common.jsLoader,
      {
        test: common.cssLoader.test,
        include: common.cssLoader.include,
        loader: ExtractTextPlugin.extract('style', 'css?localIdentName=react-orderable-[name]-[local]!postcss!sass')
      },
      common.fileLoader,
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      filename: './template.html',
      inject: true
    })
  ],
  postcss: common.postcss
};
