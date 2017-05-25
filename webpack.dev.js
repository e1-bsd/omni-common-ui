const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');

module.exports = merge.smart(CommonConfig, {
  devtool: 'inline-source-map',
  entry: {
    hotLoading: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server'],
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.ProvidePlugin({
      __CONFIG__: path.resolve(`config/${process.env.CONFIG || process.env.NODE_ENV || 'development'}.json`),
    }),
    new webpack.DefinePlugin({
      PRODUCTION: false,
    }),
  ],
});
