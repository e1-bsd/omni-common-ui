const path = require('path');
const git = require('git-rev-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const version = packageInfo.version;
const commitHash = git.long();
const tag = git.tag();

module.exports = (options) => [
  // index.html
  new HtmlWebpackPlugin(Object.assign({
    template: path.join(__dirname, 'lib/index.html'),
    excludeChunks: ['ssoSilentRenew'],
    inject: 'body',
    version,
    tag,
    commit: commitHash,
    title: process.env.TITLE,
  }, options)),
  // sso-silent-renew.html
  new HtmlWebpackPlugin(Object.assign({
    template: path.join(__dirname, 'lib/assets/partials/blank.html'),
    chunks: ['vendor', 'ssoSilentRenew'],
    filename: 'sso-silent-renew.html',
  }, options)),
];
