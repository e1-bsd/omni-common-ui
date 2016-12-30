#!/usr/bin/env node

const log = require('loglevel');
const colors = require('colors/safe');
const spawn = require('child_process').spawn;
const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
  { name: 'host', type: String },
]);

log.enableAll();

process.env.CONFIG = options.config || '';

const command = ['node_modules/webpack-dev-server/bin/webpack-dev-server.js', '--progress', '--hot', '--inline', '--port', '8080'];
if (options.host) {
  command.push('--host');
  command.push(`${options.host}`);
}

const devServer = spawn('node', command);

devServer.on('close', () => {
  log.error(colors.red('😓  webpack-dev-server was unexpectedly closed.'));
  process.exit(1);
});

devServer.stdout.on('data', (data) => process.stdout.write(data));
devServer.stderr.on('data', (data) => process.stderr.write(data));
