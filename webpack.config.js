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
const stylelint = require('stylelint');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const git = require('git-rev-sync');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const version = require('./package.json').version;
const commitHash = git.long();
const Config = require(`./sample/domain/Config/${nodeEnv}.json`);

const esLintShouldGiveError = (() => {
  if (nodeEnv === 'development') {
    return false;
  }

  if (nodeEnv === 'test' && process.env.ALLOW_ESLINT_ERRORS === 'true') {
    return false;
  }

  return true;
})();

module.exports = {
  context: path.join(__dirname, 'sample'),
  devtool: getSourceMapType(),
  entry: ['babel-polyfill', 'app.jsx'],
  output: {
    path: path.join(__dirname, 'dist-sample'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'babel',
            query: {
              presets: ['react', 'es2015', 'stage-2'],
              cacheDirectory: true,
            },
          },
          { loader: 'eslint' },
        ]),
      },
      {
        test: /\.css$/,
        loader: 'style!css?root=.',
      },
      {
        test: /\.postcss$/,
        exclude: /node_modules/,
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
        exclude: /node_modules/,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
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
    new Clean(['dist']),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${nodeEnv}'`,
      DEVELOPMENT: nodeEnv === 'development',
      TEST: nodeEnv === 'test',
      PRODUCTION: nodeEnv === 'production',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      version,
      commit: commitHash,
      baseUrl: Config.baseUrl,
    }),
  ],
  devServer: {
    hot: true,
    contentBase: 'sample',
    noInfo: false,
    stats: { colors: true },
    historyApiFallback: true,
  },
  resolve: {
    root: [
      path.resolve('sample'),
      path.resolve('src'),
    ]
    .concat([
      path.resolve('./'),
    ]),
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      'omni-common-ui$': 'src/index.js',
    },
  },
  postcss: (webpackInstance) => [
    stylelint(),
    postcssImport({
      path: ['node_modules', 'sample', 'sample/assets/styles', './'],
      addDependencyTo: webpackInstance,
      plugins: [
        stylelint(),
      ],
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
  ],
  eslint: {
    configFile: '.eslintrc.json',
    failOnError: esLintShouldGiveError,
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
};

function getSourceMapType() {
  switch (nodeEnv) {
    case 'production':
      return 'hidden-source-map';
    default:
    case 'test':
    case 'development':
      return 'inline-source-map';
  }
}
