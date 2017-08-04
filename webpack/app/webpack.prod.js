const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.js');
const definePlugin = require('../utils/define-plugin.js');
const htmlPlugin = require('../utils/html-plugin.js');
const uglify = require('../utils/uglify.js');

module.exports = merge.smart(baseConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    uglify(),
    definePlugin({
      'process.env.NODE_ENV': '"production"',
      PRODUCTION: true,
    }),
  ].concat(
    htmlPlugin({ PRODUCTION: true })
  ),
});
