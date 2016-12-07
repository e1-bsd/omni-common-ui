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
const env = process.argv[2] ? process.argv[2].toLowerCase() : 'production';
process.env.OUTPUT_PATH = `dist-${env}`;

if (process.platform === 'win32') {
  cmdLine = `set NODE_ENV=${env}&& ${cmdLine}`;
} else {
  cmdLine = `NODE_ENV=${env} ${cmdLine}`;
}

execSync(cmdLine, { stdio: [0, 1, 2] });

configs.forEach((config, environment) => {
  fs.writeFileSync(path.join(dir, `${environment}.js`), `var CONFIG = Object.freeze(${JSON.stringify(config)})`);
});
