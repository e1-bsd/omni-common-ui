const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.js');

const packageInfo = require(path.join(__dirname, '../../package.json')); // eslint-disable-line import/no-dynamic-require
const externalDependencies = Object.keys(packageInfo.dependencies);

delete baseConfig.entry;

module.exports = merge.smart(baseConfig, {
  entry: {
    main: 'index.js',
    ApiResponseHelper: 'domain/ApiResponseHelper/index.js',
    ApiCalls: 'containers/ApiCalls/index.js',
  },
  context: path.resolve('src'),
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    library: 'OmniCommonUI',
    libraryTarget: 'umd',
  },
  externals: externalDependencies,
});
