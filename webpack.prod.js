const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'lib/assets/favicons/browserconfig.xml'), to: path.resolve('dist') },
      { from: path.join(__dirname, 'lib/assets/favicons/android-chrome-192x192.png'), to: path.resolve('dist') },
      { from: path.join(__dirname, 'lib/assets/favicons/android-chrome-512x512.png'), to: path.resolve('dist') },
      { from: path.join(__dirname, 'lib/assets/favicons/mstile-150x150.png'), to: path.resolve('dist') },
      { from: path.join(__dirname, 'lib/assets/favicons/favicon.ico'), to: path.resolve('dist') },
    ]),
  ],
});
