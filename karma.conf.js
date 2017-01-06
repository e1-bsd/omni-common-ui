/* eslint global-require: "off", import/no-dynamic-require: "off" */

const path = require('path');

process.env.NODE_ENV = 'test';

module.exports = (config) => {
  const settings = {
    basePath: process.cwd(),
    frameworks: ['mocha'],
    files: ['test.webpack.js'],
    exclude: [],
    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap'],
    },
    webpack: require(path.resolve('webpack.config.js')),
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
    singleRun: false,
    concurrency: 1,
    browsers: ['Chrome'/* , 'Firefox', 'IE_no_addons' */],
    customLaunchers: {
      IE_no_addons: {
        base: 'IE',
        flags: ['-extoff', '-private'],
      },
    },
  };

  if (process.env.TRAVIS) {
    settings.browsers = ['Firefox'];
  }

  config.set(settings);
};
