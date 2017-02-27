#!/usr/bin/env node
/* eslint-disable no-console */

const path = require('path');
const spawn = require('./spawn');
const colors = require('colors/safe');

spawn('node', ['node_modules/nightwatch/bin/nightwatch', '-c', path.join(__dirname, '../nightwatch.js')], { stdio: 'inherit' })
    .on('close', (code) => {
      if (code) {
        console.error(colors.red('😓  Nightwatch was unexpectedly closed.'));
        process.exit(code);
      }
    });
