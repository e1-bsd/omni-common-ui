const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');
const definePlugin = require('./webpack.define-plugin.js');
const htmlPlugin = require('./webpack.html-plugin.js');

const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const isCommon = packageInfo.name === 'omni-common-ui';
const port = isCommon ? '3000' : '8080';

module.exports = merge.smart(CommonConfig, {
  devtool: 'eval',
  entry: {
    hotLoading: ['react-hot-loader/patch', `webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/only-dev-server'],
  },
  output: {
    pathinfo: true,
  },
  module: {
    rules: [
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
  devServer: {
    contentBase: false,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.ProvidePlugin({
      __CONFIG__: path.resolve(`config/${process.env.CONFIG || process.env.NODE_ENV || 'development'}.json`),
    }),
    definePlugin({ PRODUCTION: false }),
    htmlPlugin(),
  ],
});
