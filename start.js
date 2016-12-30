#!/usr/bin/env node
/* eslint strict: "off" */

'use strict';

const execSync = require('child_process').execSync;
const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
  { name: 'host', type: String },
]);

process.env.CONFIG = options.config || '';

let command = 'node node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --hot --inline --port 8080';
if (options.host) {
  command += ` --host ${options.host}`;
}

execSync(command, { stdio: [0, 1, 2] });
