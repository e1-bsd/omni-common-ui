/* eslint strict: "off" */
'use strict';

const exec = require('child_process').exec;
const path = require('path');

let cmdLine = path.join('.', 'node_modules', '.bin', 'webpack');
cmdLine += ' -p --bail --progress --colors';

const env = !!process.argv[2] ? process.argv[2].toLowerCase() : 'production';

if (process.platform === 'win32') {
  cmdLine = `set NODE_ENV=${env}&& ${cmdLine}`;
} else {
  cmdLine = `NODE_ENV=${env} ${cmdLine}`;
}

const command = exec(cmdLine, error => process.exit(error === null ? 0 : error.code));

command.stdout.on('data', data => process.stdout.write(data));
command.stderr.on('data', data => process.stderr.write(data));
command.on('error', err => process.stderr.write(err));
