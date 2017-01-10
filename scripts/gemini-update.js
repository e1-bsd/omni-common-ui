#!/usr/bin/env node

const spawn = require('child_process').spawn;

process.on('exit', kill);
process.on('SIGINT', kill);
process.on('SIGTERM', kill);

const child = spawn('node', ['node_modules/gemini/bin/gemini', 'update'], { stdio: 'inherit' })
    .on('close', (code) => process.exit(code));

function kill() {
  child.kill('SIGINT');
}
