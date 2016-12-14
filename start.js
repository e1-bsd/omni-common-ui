/* eslint strict: "off" */

'use strict';

const execSync = require('child_process').execSync;
const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
]);

process.env.CONFIG = options.config || '';

execSync('node node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --hot --inline --host 0.0.0.0 --port 8080', { stdio: [0, 1, 2] });
