const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.js');
const definePlugin = require('../utils/define-plugin.js');
const htmlPlugin = require('../utils/html-plugin.js');

const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const isCommon = packageInfo.name === 'omni-common-ui';
const port = isCommon ? '3000' : '8080';

module.exports = merge.smart(baseConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },
  entry: {
    hotLoading: ['react-hot-loader/patch', `webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/only-dev-server'],
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
  ].concat(
    htmlPlugin()
  ),
});
