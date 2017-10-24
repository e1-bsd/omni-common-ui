const path = require('path');
const git = require('git-rev-sync');
const is = require('is_js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configFile = require('./config-file.js');

const config = require(configFile); // eslint-disable-line import/no-dynamic-require
const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const version = packageInfo.version;
const commitHash = git.long();
const tag = git.tag();

const zendeskHost = is.string(config.zendeskHost) && is.not.empty(config.zendeskHost) ?
        config.zendeskHost :
        undefined;
console.log(`zendeskHost = "${zendeskHost}"`);

module.exports = (options) => [
  // index.html
  new HtmlWebpackPlugin(Object.assign({
    template: path.join(__dirname, '../../src/index.html'),
    excludeChunks: ['ssoSilentRenew'],
    inject: 'body',
    version,
    tag,
    commit: commitHash,
    title: process.env.TITLE,
  }, options)),
  // sso-silent-renew.html
  new HtmlWebpackPlugin(Object.assign({
    template: path.join(__dirname, '../../src/assets/partials/blank.html'),
    chunks: ['vendor', 'ssoSilentRenew'],
    filename: 'sso-silent-renew.html',
    zendeskHost,
  }, options)),
];
