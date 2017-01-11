/* eslint strict: "off" */
/* eslint import/no-dynamic-require: "off" */

'use strict';

const path = require('path');
const webpack = require('webpack');
const postcssCalc = require('postcss-calc');
const postcssCssnext = require('postcss-cssnext');
const postcssNesting = require('postcss-nesting');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssSelectorNot = require('postcss-selector-not');
const postcssColorFunctions = require('postcss-color-function');
const postcssColorHexAlpha = require('postcss-color-hex-alpha');
const postcssMixins = require('postcss-mixins');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssContainerQueries = require('cq-prolyfill/postcss-plugin');
const postcssUrl = require('postcss-url');
const postcssPxToRem = require('postcss-pxtorem');
const postcssGradientTransparencyFix = require('postcss-gradient-transparency-fix');
const combineLoaders = require('webpack-combine-loaders');
const git = require('git-rev-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const packageInfo = require(path.resolve('package.json'));
const version = packageInfo.version;
const isCommon = packageInfo.name === 'omni-common-ui';
const srcFolder = isCommon ? 'src' : 'app';
const contextFolder = isCommon ? 'sample' : 'app';
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv !== 'development' && nodeEnv !== 'test';

const commitHash = git.long();
const tag = git.tag();
const excluded = /node_modules(\/|\\)((?!(omni-common-ui)).)/;

module.exports = {
  context: path.resolve(contextFolder),
  devtool: getSourceMapType(),
  entry: {
    app: 'app.jsx',
    vendor: ['babel-polyfill', 'omni-common-ui'],
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.(html|hbs)$/,
        loader: 'handlebars',
      },
      {
        test: /\.jsx?$/,
        exclude: excluded,
        loader: combineLoaders([
          {
            loader: 'babel',
            query: {
              presets: ['react', 'es2015', 'stage-2'],
              cacheDirectory: true,
            },
          },
        ]),
      },
      {
        test: /\.css$/,
        loader: 'style!css?root=.',
      },
      {
        test: /\.postcss$/,
        loader: combineLoaders([
          { loader: 'style' },
          {
            loader: 'css',
            query: {
              root: '.',
              modules: true,
              importLoaders: 1,
              localIdentName: isProd ? undefined : '[local]___[hash:base64:5]',
            },
          },
          { loader: 'postcss' },
        ]),
      },
      {
        test: /fonts(\/|\\).+\.(woff2?|ttf|eot|otf|svg)$/,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: [
          'url?limit=10000&hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: (nodeEnv !== 'test' ?
      [new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js')] :
      []).concat([
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': `'${isProd ? 'production' : nodeEnv}'`,
          PRODUCTION: isProd,
          VERSION: `'${version}'`,
          COMMIT: `'${commitHash}'`,
          SENTRY_ENV: `'${nodeEnv}'`,
        }),
      ]).concat(! isProd ?
        [
          new webpack.ProvidePlugin({
            __CONFIG__: path.resolve(`config/${process.env.CONFIG || nodeEnv}.json`),
          }),
        ] :
        [])
      .concat([
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'lib/index.html'),
          inject: 'body',
          version,
          tag,
          commit: commitHash,
          title: process.env.TITLE,
          isProd,
        }),
        new Visualizer({ filename: '../package-stats.html' }),
      ]).concat(addOptionalPlugins()),
  devServer: {
    contentBase: srcFolder,
    noInfo: false,
    stats: { colors: true },
    historyApiFallback: true,
  },
  resolve: Object.assign(
    {
      root: [
        path.resolve(contextFolder),
        path.resolve(srcFolder),
        process.cwd(),
      ],
      extensions: ['', '.js', '.jsx', '.json'],
    },
    {
      alias: Object.assign(
        isCommon ?
            { 'omni-common-ui$': 'src/index.js' } :
            {}
        , {
          react: path.resolve('node_modules', 'react'),
          'react-ga': path.resolve('node_modules', 'react-ga'),
          'react-radial-progress': path.resolve('node_modules', 'react-radial-progress-sans-animation'),
        }
      ),
    }
  ),
  postcss: (webpackInstance) => ([
    postcssImport({
      path: ['node_modules', contextFolder, `${contextFolder}/assets/styles`, process.cwd()],
      addDependencyTo: webpackInstance,
    }),
    postcssUrl({ url: 'rebase' }),
    postcssGradientTransparencyFix,
    postcssContainerQueries,
    postcssMixins,
    postcssCustomSelectors,
    postcssCustomProperties,
    postcssSelectorNot,
    postcssColorFunctions,
    postcssColorHexAlpha,
    postcssNesting,
    postcssPxToRem({
      rootValue: 14,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
    postcssCalc,
    postcssCssnext({
      browsers: [
        '> 0%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1',
        'Android 2.3',
        'iOS 7',
      ],
    }),
    postcssReporter({ clearMessages: true }),
  ]),
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
};

function getSourceMapType() {
  if (isProd) {
    return 'source-map';
  }

  return 'inline-source-map';
}

function addOptionalPlugins() {
  /* eslint global-require: "off" */
  const plugins = [];

  if (isProd) {
    plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: true,
      }),
    ]);
  }

  return [];
}
