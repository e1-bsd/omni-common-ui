#!/usr/bin/env node
/* eslint-disable no-console */

const colors = require('colors/safe');
const spawn = require('./spawn');
const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
  { name: 'host', type: String },
]);

process.env.CONFIG = options.config || '';

const command = ['node_modules/webpack-dev-server/bin/webpack-dev-server.js', '--progress', '--hot', '--inline', '--port', '8080'];
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
