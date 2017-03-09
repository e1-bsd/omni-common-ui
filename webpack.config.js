/* eslint strict: "off" */
/* eslint import/no-dynamic-require: "off" */

'use strict';

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const git = require('git-rev-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const HappyPack = require('happypack');

const packageInfo = require(path.resolve('package.json'));
const version = packageInfo.version;
const isCommon = packageInfo.name === 'omni-common-ui';
const srcFolder = isCommon ? 'src' : 'app';
const contextFolder = isCommon ? 'sample' : 'app';
const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
const isProd = ! isDev && nodeEnv !== 'test';

const commitHash = git.long();
const tag = git.tag();

const excluded = /node_modules(\/|\\)((?!(omni-common-ui)).)/;
const excludedInCoverage = /(node_modules(\/|\\)((?!(omni-common-ui)).)|spec.jsx?|lib(\/|\\))/;

const regExpFonts = new RegExp(`fonts\\${path.sep}.+\\.(woff2?|ttf|eot|otf|svg)$`);
const regExpInlineSvgs = new RegExp('\\.inline\\.svg$');
const regExpFavicons = new RegExp(`assets\\${path.sep}favicons\\${path.sep}.+$`);

HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss']);
const happyPackThreadPool = new HappyPack.ThreadPool({ size: os.cpus().length });

const BABEL_CACHE_ENABLED = true;

const jsxLoader = combineLoaders([
  {
    loader: 'babel',
    query: {
      presets: ['react', 'es2015', 'stage-2'],
      cacheDirectory: BABEL_CACHE_ENABLED,
    },
  },
]);

const postcssLoader = combineLoaders([
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
]);

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
        query: { inlineRequires: 'assets/favicons' },
      },
      {
        test: /\.jsx?$/,
        exclude: excluded,
        loader: isDev ? 'happypack/loader?id=jsx' : jsxLoader,
      },
      {
        test: /\.css$/,
        loader: 'style!css?root=.',
      },
      {
        test: /\.postcss$/,
        loader: isDev ? 'happypack/loader?id=postcss' : postcssLoader,
      },
      {
        test: regExpFonts,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
      },
      {
        test: regExpFavicons,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
      },
      {
        test: regExpInlineSvgs,
        loader: 'svg-inline?removeTags',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: new RegExp(`(${regExpFavicons.source})|(${regExpInlineSvgs.source})`),
        loaders: [
          'url?limit=10000&hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.json$/,
        exclude: regExpFavicons,
        loader: 'json',
      },
    ],
    postLoaders: [
      {
        test: /\.jsx?$/i,
        exclude: excludedInCoverage,
        loader: 'istanbul-instrumenter',
        enforce: 'post',
      },
    ],
  },
  plugins: (nodeEnv !== 'test' ?
      [new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js')] :
      []).concat([
        new webpack.optimize.OccurenceOrderPlugin(),
        new CopyWebpackPlugin([
          { from: path.join(__dirname, 'lib/assets/favicons/browserconfig.xml'), to: path.resolve('dist') },
          { from: path.join(__dirname, 'lib/assets/favicons/android-chrome-192x192.png'), to: path.resolve('dist') },
          { from: path.join(__dirname, 'lib/assets/favicons/android-chrome-512x512.png'), to: path.resolve('dist') },
          { from: path.join(__dirname, 'lib/assets/favicons/mstile-150x150.png'), to: path.resolve('dist') },
          { from: path.join(__dirname, 'lib/assets/favicons/favicon.ico'), to: path.resolve('dist') },
        ]),
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
      .concat(isDev ?
        [
          new HappyPack({
            id: 'jsx',
            cache: ! BABEL_CACHE_ENABLED,
            threadPool: happyPackThreadPool,
            loaders: [jsxLoader],
            cacheContext: {
              env: process.env.NODE_ENV,
            },
          }),
          new HappyPack({
            id: 'postcss',
            threadPool: happyPackThreadPool,
            loaders: [postcssLoader],
            cacheContext: {
              env: process.env.NODE_ENV,
            },
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
      ])
      .concat(addOptionalPlugins()),
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
          'react-addons-perf': path.resolve('node_modules', 'react-addons-perf'),
          'react-dom': path.resolve('node_modules', 'react-dom'),
        }
      ),
    }
  ),
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
