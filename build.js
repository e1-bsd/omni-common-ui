/* eslint strict: "off" */
'use strict';

const execSync = require('child_process').execSync;

let cmdLine = 'webpack -p --bail --progress --colors';
const env = process.argv[2] ? process.argv[2].toLowerCase() : 'production';
process.env.OUTPUT_PATH = `dist-${env}`;

if (process.platform === 'win32') {
  cmdLine = `set NODE_ENV=${env}&& ${cmdLine}`;
} else {
  cmdLine = `NODE_ENV=${env} ${cmdLine}`;
}

execSync(cmdLine, { stdio: [0, 1, 2] });
