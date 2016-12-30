#!/usr/bin/env node
/* eslint strict: "off" */

'use strict';

const execSync = require('child_process').execSync;
const { Map } = require('immutable');
const path = require('path');
const fs = require('fs');
const requireAll = require('require-all');

const configs = new Map(requireAll({
  dirname: path.resolve('config'),
  filter: /\.json$/i,
  recursive: false,
  map: (name, filePath) => path.basename(filePath, '.json'),
}));

let cmdLine = 'node node_modules/webpack/bin/webpack.js -p --bail --progress --colors';

if (process.platform === 'win32') {
  cmdLine = `set NODE_ENV=production&& ${cmdLine}`;
} else {
  cmdLine = `NODE_ENV=production ${cmdLine}`;
}

execSync(cmdLine, { stdio: [0, 1, 2] });

const distDir = path.resolve('dist-configs');
fs.mkdirSync(distDir);

configs.forEach((config, environment) => {
  const fileDir = path.join(distDir, `${environment}.js`);
  fs.writeFileSync(fileDir, `var __CONFIG__ = Object.freeze(${JSON.stringify(config)})`);
});
