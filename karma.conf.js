/* eslint global-require: "off" */
const path = require('path');

process.env.NODE_ENV = 'test';

module.exports = (config) => {
  const settings = {
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test.webpack.js',
    ],
    exclude: [],
    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap'],
    },
    webpack: require('./common.webpack.config.js')({
      context: 'src',
      entry: 'index',
      outputPath: 'dist',
      plugins: [],
      resolve: {
        root: [
          path.resolve('src'),
        ],
      },
    }),
    webpackServer: {
      noInfo: true,
    },
    webpackMiddleware: {
      noInfo: true,
    },
    reporters: ['mocha'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity,
  };

  if (process.env.TRAVIS) {
    settings.browsers = ['Firefox'];
  }

  config.set(settings);
};
