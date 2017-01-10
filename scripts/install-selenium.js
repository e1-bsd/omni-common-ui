#!/usr/bin/env node

const spawn = require('child_process').spawn;

spawn('node', ['node_modules/selenium-standalone/bin/selenium-standalone', 'install', '--version=3.0.1'], { stdio: 'inherit' })
    .on('close', (code) => process.exit(code));
