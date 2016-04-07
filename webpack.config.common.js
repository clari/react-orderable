var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  jsLoader: {
    test: /\.js$/,
    include: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'lib'),
      path.join(__dirname, 'index.js')
    ],
    loaders: ['babel', 'eslint']
  },
  cssLoader: {
    test: /\.scss$/,
    include: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'lib')
    ],
    loaders: ['style', 'css?localIdentName=react-orderable-[name]-[local]', 'postcss', 'sass']
  },
  postcss: [autoprefixer]
};
