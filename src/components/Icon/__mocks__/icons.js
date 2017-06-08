/* eslint-disable global-require */
const path = require('path');
const fs = require('fs');
const { Map } = require('immutable');

const files = fs.readdirSync(path.resolve('src/components/Icon'))
  .filter((file) => /\.svg$/.test(file))
  .map((file) => path.basename(file, '.svg'));

module.exports = new Map(files.map((file) => [file, file]));
