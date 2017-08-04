const webpack = require('webpack');

module.exports = () => new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  sourceMap: true,
  minimize: true,
});
