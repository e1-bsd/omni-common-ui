const merge = require('webpack-merge');
const baseConfigForCommon = require('./webpack.config.js');

module.exports = merge.smart(baseConfigForCommon, {
  devtool: 'cheap-module-source-map',
});
