const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production',
      PRODUCTION: true,
    }),
    new HtmlWebpackPlugin({
      PRODUCTION,
    }),
  ],
});
