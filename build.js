/* eslint strict: "off" */
'use strict';

const exec = require('child_process').exec;

let cmdLine = 'webpack -p --bail --progress --colors';
const env = process.argv[2] ? process.argv[2].toLowerCase() : 'production';
process.env.OUTPUT_PATH = `dist-${env}`;

if (process.platform === 'win32') {
  cmdLine = `set NODE_ENV=${env}&& ${cmdLine}`;
} else {
  cmdLine = `NODE_ENV=${env} ${cmdLine}`;
}

const command = exec(cmdLine, error => process.exit(error === null ? 0 : error.code));

command.stdout.on('data', data => process.stdout.write(data));
command.stderr.on('data', data => process.stderr.write(data));
command.on('error', err => process.stderr.write(err));
