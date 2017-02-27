#!/usr/bin/env node
/* eslint-disable no-console */

const colors = require('colors/safe');
const spawn = require('./spawn');

spawn('node', ['node_modules/selenium-standalone/bin/selenium-standalone', 'install', '--version=3.0.1'], { stdio: 'inherit' })
    .on('close', (code) => {
      if (code) {
        console.error(colors.red('😓  Selenium installer was unexpectedly closed.'));
        process.exit(code);
      }
    });
