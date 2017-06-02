const path = require('path');
const git = require('git-rev-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const version = packageInfo.version;
const commitHash = git.long();
const tag = git.tag();

module.exports = (options) => new HtmlWebpackPlugin(Object.assign({
  template: path.join(__dirname, 'lib/index.html'),
  inject: 'body',
  version,
  tag,
  commit: commitHash,
  title: process.env.TITLE,
}, options));
