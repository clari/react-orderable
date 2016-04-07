var common = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // Extract css so users don't have to compile scss

module.exports = {
  entry: './src/library',
  output: {
    filename: 'react-orderable.js',
    path: 'dist',
    libraryTarget: 'commonjs2',
  },
  externals: {
    classnames: true,
    react: true,
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
