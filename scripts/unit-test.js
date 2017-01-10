#!/usr/bin/env node

const spawn = require('child_process').spawn;
const path = require('path');

const args = process.argv.slice(2, process.argv.length);
const karmaConf = path.resolve(__dirname, '../karma.conf.js');

process.on('exit', kill);
process.on('SIGINT', kill);
process.on('SIGTERM', kill);

const child = spawn('node', ['node_modules/karma/bin/karma', 'start', karmaConf, ...args], { stdio: 'inherit' })
  .on('close', (code) => process.exit(code || 0));

function kill() {
  child.kill('SIGINT');
}
