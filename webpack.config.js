/* jshint node:true */
/* jshint -W034 */
/* jshint -W097 */

'use strict';

const commonWebpackConfig = require('./common.webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const git = require('git-rev-sync');

const version = require('./package.json').version;
const commitHash = git.long();
const nodeEnv = process.env.NODE_ENV || 'development';
const Config = require(`./sample/domain/Config/${nodeEnv}.json`);

module.exports = [
  commonWebpackConfig({
    context: 'src',
    entry: 'index',
    outputPath: 'dist',
    plugins: [],
    output: {
      libraryTarget: 'commonjs2',
      library: 'omni-common-ui'
    }
  }),
  commonWebpackConfig({
    context: 'sample',
    entry: 'app.jsx',
    outputPath: 'dist-sample',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        inject: 'body',
        version: version,
        commit: commitHash,
        baseUrl: Config.baseUrl
      })
    ]
  })
];
