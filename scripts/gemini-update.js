#!/usr/bin/env node

const spawn = require('./spawn');

spawn('node', ['node_modules/gemini/bin/gemini', 'update'], { stdio: 'inherit' })
    .on('close', (code) => process.exit(code));
