/* eslint strict: "off" */
/* eslint import/no-dynamic-require: "off" */

'use strict';

const path = require('path');
const webpack = require('webpack');
const git = require('git-rev-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageInfo = require(path.resolve('package.json'));
const version = packageInfo.version;
const isCommon = packageInfo.name === 'omni-common-ui';
const srcFolder = isCommon ? 'src' : 'app';
const contextFolder = isCommon ? 'sample' : 'app';
const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
const isTest = nodeEnv === 'test';
const isProd = ! isDev && ! isTest;

const commitHash = git.long();
const tag = git.tag();

const excluded = /node_modules(\/|\\)((?!(omni-common-ui)).)/;
const excludedInCoverage = /(node_modules(\/|\\)((?!(omni-common-ui)).)|spec\.jsx?|lib(\/|\\))/;

const regExpFonts = new RegExp(`fonts\\${path.sep}.+\\.(woff2?|ttf|eot|otf|svg)$`);
const regExpInlineSvgs = new RegExp(`(\\.inline\\.svg$)|(components\\${path.sep}Icon\\${path.sep}.+\\.svg$)`);
const regExpFavicons = new RegExp(`assets\\${path.sep}favicons\\${path.sep}.+$`);

const BABEL_CACHE_ENABLED = true;

module.exports = {
  context: path.resolve(contextFolder),
  devtool: getSourceMapType(),
  entry: {
    reactHotLoader: 'react-hot-loader/patch',
    devServer: 'webpack-dev-server/client?http://localhost:3000',
    devServerHotLoader: 'webpack/hot/only-dev-server',
    app: 'app.jsx',
    vendor: ['babel-polyfill', 'omni-common-ui'],
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(html|hbs)$/,
        use: {
          loader: 'handlebars-loader',
          options: { inlineRequires: 'assets/favicons' },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: excluded,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2'],
            cacheDirectory: BABEL_CACHE_ENABLED,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?root=.'],
      },
      {
        test: /\.postcss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              root: '.',
              modules: true,
              minimize: true,
              import: false,
              importLoaders: 1,
              localIdentName: isProd ? undefined : '[local]___[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: regExpFonts,
        use: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      },
      {
        test: regExpFavicons,
        use: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      },
      {
        test: regExpInlineSvgs,
        use: {
          loader: 'svg-inline-loader',
          options: {
            removeTags: true,
            removingTags: ['title', 'desc', 'defs', 'style'],
            removingTagAttrs: ['fill', 'stroke'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: new RegExp(`(${regExpFavicons.source})|(${regExpInlineSvgs.source})`),
        use: [
          'url-loader?limit=10000&hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
            },
          },
        ],
      },
      isTest ? {
        test: /\.jsx?$/i,
        enforce: 'post',
        exclude: excludedInCoverage,
        use: 'istanbul-instrumenter-loader',
      } : {},
    ],
  },
  plugins: (nodeEnv !== 'test' ?
      [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })] :
      []).concat([
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
        }),
      ]).concat(! isProd ?
      [new webpack.ProvidePlugin({
        __CONFIG__: path.resolve(`config/${process.env.CONFIG || nodeEnv}.json`),
      })] :
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
      ])
      .concat(addOptionalPlugins()),
  devServer: {
    contentBase: srcFolder,
    compress: true,
  },
  resolve: Object.assign(
    {
      modules: [
        path.resolve(contextFolder),
        path.resolve(srcFolder),
        process.cwd(),
        path.resolve('node_modules'),
      ],
      extensions: ['.js', '.jsx', '.json'],
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
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
};

function getSourceMapType() {
  if (isProd) {
    return 'hidden-source-map';
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
        minimize: true,
      }),
    ]);
  }

  return [];
}
