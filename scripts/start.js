#!/usr/bin/env node
/* eslint-disable no-console */

const path = require('path');
const colors = require('colors/safe');
const spawn = require('./spawn');
const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
  { name: 'host', type: String },
]);

process.env.CONFIG = options.config || '';

const command = ['node_modules/webpack-dev-server/bin/webpack-dev-server.js', '--profile', '--progress', '--hot', '--inline', '--port', '8080', '--config', path.resolve(__dirname, '../webpack.dev.js')];
if (options.host) {
  command.push('--host');
  command.push(`${options.host}`);
}

spawn('node', command, { stdio: 'inherit' })
    .on('close', (code) => {
      if (code) {
        console.error(colors.red('😓  webpack-dev-server was unexpectedly closed.'));
        process.exit(code);
      }
    });
