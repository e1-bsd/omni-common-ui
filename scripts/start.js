#!/usr/bin/env node
/* eslint-disable no-console */

const path = require('path');
const colors = require('colors/safe');
const spawn = require('./spawn');
const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
  { name: 'host', type: String },
  { name: 'port', type: String },
]);

const DEFAULT_PORT = '8080';

process.env.CONFIG = options.config || '';

const command = ['node_modules/webpack-dev-server/bin/webpack-dev-server.js', '--profile', '--progress', '--hot', '--inline', '--config', path.resolve(__dirname, '../webpack.dev.js')];

if (options.host) {
  command.push('--host');
  command.push(`${options.host}`);
}

command.push('--port');
if (options.port) {
  command.push(`${options.port}`);
} else {
  command.push(DEFAULT_PORT);
}

spawn('node', command, { stdio: 'inherit' })
  .on('close', (code) => {
    if (code) {
      console.error(colors.red('😓  webpack-dev-server was unexpectedly closed.'));
      process.exit(code);
    }
  });
