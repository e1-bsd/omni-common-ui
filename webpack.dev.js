const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HappyPack = require('happypack');
const CommonConfig = require('./webpack.config.js');
const definePlugin = require('./webpack.define-plugin.js');
const htmlPlugin = require('./webpack.html-plugin.js');

const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const isCommon = packageInfo.name === 'omni-common-ui';
const port = isCommon ? '3000' : '8080';

const happyThreadPool = new HappyPack.ThreadPool({ size: 5 });

module.exports = merge.smart(CommonConfig, {
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
        test: /\.jsx?$/,
        exclude: /node_modules(\/|\\)((?!(omni-common-ui)).)/,
        use: {
          loader: 'happypack/loader?id=js',
        },
      },
      {
        test: /\.postcss$/,
        use: {
          loader: 'happypack/loader?id=css',
        },
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
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [{
        path: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          cacheDirectory: false,
        },
      }],
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [
        { path: 'style-loader' },
        {
          path: 'css-loader',
          query: {
            root: '.',
            localIdentName: '[local]___[hash:base64:5]',
          },
        },
      ],
    }),
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
