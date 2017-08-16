const merge = require('webpack-merge');
const baseConfigForCommon = require('./webpack.config.js');

module.exports = merge.smart(baseConfigForCommon, {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]___[hash:base64:5]',
              getLocalIdent: require('../utils/css-class-hash')({ prefix: 'oci-' }),
            },
          },
        ],
      },
    ],
  },
});
