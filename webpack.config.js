var webpack = require('webpack');

module.exports = {
  entry: {
    app: './main.cjsx',
    vendor: ['react']
  },
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.cjsx', '.less']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],
  module: {
    loaders: [
      { test: /\.coffee$/, loaders: ['coffee-loader']},
      { test: /\.cjsx$/, loaders: ['coffee-loader', 'cjsx-loader']},
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  }
};
