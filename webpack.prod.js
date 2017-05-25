const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');

module.exports = merge.smart(CommonConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
      minimize: true,
    }),
  ],
});
