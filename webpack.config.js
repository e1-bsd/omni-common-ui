const path = require('path');

const REG_EXP_INLINE_SVGS = new RegExp(`(\\.inline\\.svg$)|(components\\${path.sep}Icon\\${path.sep}.+\\.svg$)`);
const REG_EXP_FAVICONS = new RegExp(`assets\\${path.sep}favicons\\${path.sep}.+(svg|png)$`);
const BABEL_CACHE_ENABLED = true;

module.exports = {
  entry: {
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
        test: /\.jsx?$/,
        exclude: /node_modules(\/|\\)((?!(omni-common-ui)).)/,
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              root: '.',
            },
          },
        ],
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
              // minimize: true,
              import: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: REG_EXP_INLINE_SVGS,
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
        exclude: new RegExp(`(${REG_EXP_FAVICONS.source})|(${REG_EXP_INLINE_SVGS.source})`),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              hash: 'sha512',
              digest: 'hex',
              name: '[name].[hash].[ext]',
            },
          },
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
      {
        test: REG_EXP_FAVICONS,
        use: 'file-loader?hash=sha512&digest=hex&name=[name].[hash].[ext]',
      },
      {
        test: /favicon\.ico$/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /browserconfig\.xml$/,
        use: [
          'file-loader?name=[name].[ext]',
          'extract-loader',
          'browserconfig-loader',
        ],
      },
      {
        test: /manifest\.json$/,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[name].[hash].[ext]',
          'extricate-loader',
          'interpolate-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('app'),
      process.cwd(),
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      react: path.resolve('node_modules', 'react'),
      'react-ga': path.resolve('node_modules', 'react-ga'),
      'react-radial-progress': path.resolve('node_modules', 'react-radial-progress-sans-animation'),
      'react-addons-perf': path.resolve('node_modules', 'react-addons-perf'),
      'react-dom': path.resolve('node_modules', 'react-dom'),
    },
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
};
