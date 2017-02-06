#!/usr/bin/env node

const path = require('path');
const spawn = require('./spawn');

spawn('node', ['node_modules/gemini/bin/gemini', 'update', '--config', path.join(__dirname, '../.gemini.conf.js')], { stdio: 'inherit' })
    .on('close', (code) => process.exit(code));
