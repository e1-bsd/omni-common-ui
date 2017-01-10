#!/usr/bin/env node

const spawn = require('child_process').spawn;

process.on('exit', kill);
process.on('SIGINT', kill);
process.on('SIGTERM', kill);

const child = spawn('node', ['node_modules/supervisor/lib/cli-wrapper.js', '-n', 'error', '-w', 'mocks', '-i', 'mocks/data,mocks/node_modules', '--', 'node_modules/mockizen/bin/mockizen', 'mocks/scenarios.json'], { stdio: 'inherit' })
  .on('close', (code) => process.exit(code));

function kill() {
  child.kill('SIGINT');
}
