var webpack = require('webpack');

module.exports = {
  entry: './main.cjsx',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.cjsx', '.less']
  },
  module: {
    loaders: [
      { test: /\.cjsx$/, loaders: ['coffee-loader', 'cjsx-loader']},
      { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  }
};
