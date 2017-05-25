const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');
const definePlugin = require('./webpack.define-plugin.js');
const htmlPlugin = require('./webpack.html-plugin.js');

module.exports = merge.smart(CommonConfig, {
  entry: {
    hotLoading: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        enforce: 'post',
        exclude: /(node_modules(\/|\\)((?!(omni-common-ui)).)|spec\.jsx?|lib(\/|\\))/,
        use: 'istanbul-instrumenter-loader',
      },
      {
        test: /\.postcss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      __CONFIG__: path.resolve(`config/${process.env.CONFIG || process.env.NODE_ENV}.json`),
    }),
    definePlugin({ PRODUCTION: false }),
    htmlPlugin(),
  ],
});
