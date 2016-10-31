/* eslint strict: "off" */
'use strict';

const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const postcssCalc = require('postcss-calc');
const postcssCssnext = require('postcss-cssnext');
const postcssNesting = require('postcss-nesting');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssSelectorNot = require('postcss-selector-not');
const postcssColorFunctions = require('postcss-color-function');
const postcssColorHexAlpha = require('postcss-color-hex-alpha');
const postcssSimpleMixin = require('postcss-simple-mixin');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssContainerQueries = require('cq-prolyfill/postcss-plugin');
const postcssUrl = require('postcss-url');
const postcssPxToRem = require('postcss-pxtorem');
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
const Config = require(path.resolve(`${contextFolder}/domain/Config/${nodeEnv}.json`));
const isProd = /^production/i.test(nodeEnv) || /^staging/i.test(nodeEnv);

const commitHash = git.long();
const excluded = /node_modules(\/|\\)((?!(omni-common-ui)).)/;
const outputPath = process.env.OUTPUT_PATH || 'dist';

module.exports = {
  context: path.resolve(contextFolder),
  devtool: getSourceMapType(),
  entry: ['babel-polyfill', 'app.jsx'],
  output: {
    path: path.resolve(outputPath),
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
  plugins: [
    new Clean([outputPath]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${getNodeEnvForCode()}'`,
      DEVELOPMENT: nodeEnv === 'development',
      TEST: nodeEnv === 'test',
      PRODUCTION: isProd,
      PRODUCTION_SG: nodeEnv === 'production-sg',
      PRODUCTION_CN: nodeEnv === 'production-cn',
      QA: nodeEnv === 'qa',
      STAGING: /^staging/i.test(nodeEnv),
      STAGING_SG: nodeEnv === 'staging-sg',
      STAGING_CN: nodeEnv === 'staging-cn',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      version,
      commit: commitHash,
      appInsights: Config.appInsights,
    }),
    new Visualizer({ filename: '../package-stats.html' }),
  ].concat(addOptionalPlugins()),
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
      fallback: [
        path.resolve('node_modules/omni-common-ui/node_modules'),
      ],
      extensions: ['', '.js', '.jsx', '.json'],
    },
    {
      alias: Object.assign(
        isCommon ?
            { 'omni-common-ui$': 'src/index.js' } :
            {},
        { react: path.resolve('node_modules', 'react') }
      ),
    }
  ),
  postcss: (webpackInstance) => ([
    postcssImport({
      path: ['node_modules', contextFolder, `${contextFolder}/assets/styles`, process.cwd()],
      addDependencyTo: webpackInstance,
    }),
    postcssUrl({ url: 'rebase' }),
    postcssContainerQueries,
    postcssSimpleMixin,
    postcssCustomSelectors,
    postcssCustomProperties,
    postcssSelectorNot,
    postcssColorFunctions,
    postcssColorHexAlpha,
    postcssNesting,
    postcssPxToRem({
      rootValue: 16,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
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
    postcssCalc,
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
  switch (nodeEnv) {
    case 'test':
    case 'development':
      return 'inline-source-map';
    default:
      return 'hidden-source-map';
  }
}

function addOptionalPlugins() {
  /* eslint global-require: "off" */
  const plugins = [];

  if (! isCommon && nodeEnv === 'development') {
    plugins.concat([
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.resolve('.dlls/react.json')),
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.resolve('.dlls/redux.json')),
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(path.resolve('.dlls/others.json')),
      }),
    ]);
  }

  if (nodeEnv !== 'development' && nodeEnv !== 'test') {
    plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: nodeEnv !== 'development',
      }),
    ]);
  }

  return [];
}

function getNodeEnvForCode() {
  if (nodeEnv === 'development' || nodeEnv === 'test') {
    return 'development';
  }

  return 'production';
}
