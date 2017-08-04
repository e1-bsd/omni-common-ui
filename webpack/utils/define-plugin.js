const path = require('path');
const webpack = require('webpack');
const git = require('git-rev-sync');

const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const version = packageInfo.version;
const commitHash = git.long();

module.exports = (options) => new webpack.DefinePlugin(Object.assign({
  VERSION: `'${version}'`,
  COMMIT: `'${commitHash}'`,
}, options));
