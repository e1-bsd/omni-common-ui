const merge = require('webpack-merge');
const baseConfigForCommon = require('./webpack.config.js');
const uglify = require('../utils/uglify.js');

module.exports = merge.smart(baseConfigForCommon, {
  devtool: 'cheap-module-source-map',
  plugins: [uglify()],
  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              getLocalIdent: require('../utils/css-class-hash')({ prefix: 'oci-' }),
            },
          },
        ],
      },
    ],
  },
});
