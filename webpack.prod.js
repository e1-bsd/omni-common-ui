const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');
const definePlugin = require('./webpack.define-plugin.js');
const htmlPlugin = require('./webpack.html-plugin.js');

module.exports = merge.smart(CommonConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
      minimize: true,
    }),
    definePlugin({
      'process.env.NODE_ENV': '"production"',
      PRODUCTION: true,
    }),
    htmlPlugin({ PRODUCTION: true }),
  ],
});
