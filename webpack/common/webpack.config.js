const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.js');

delete baseConfig.entry;

module.exports = merge.smart(baseConfig, {
  entry: 'index.js',
  context: path.resolve('src'),
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    library: 'OmniCommonUI',
    libraryTarget: 'umd',
  },
  externals: ['react', 'react-dom', 'oidc-client'],
});
