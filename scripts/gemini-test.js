#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const colors = require('colors/safe');
const spawn = require('./spawn');

const logFile = fs.createWriteStream(path.resolve(`${path.basename(__filename)}.log`), { flags: 'w+' });
logFile.on('open', () => {
  start({
    command: ['node', 'node_modules/selenium-standalone/bin/selenium-standalone', 'start', '--version=3.0.1'],
    lookFor: /(Selenium started)|(Selenium Server is up and running)/i,
    name: 'Selenium',
  })()
    .then(start({
      command: ['node', path.join(__dirname, 'start-mock.js')],
      lookFor: /Serving on port/i,
      name: 'Mock server',
    }))
    .then(start({
      command: ['node', path.join(__dirname, 'start.js')],
      lookFor: /webpack: bundle is now VALID/i,
      name: 'Web server',
    }))
    .then(start({
      command: ['node', 'node_modules/gemini/bin/gemini', 'test', '--reporter', 'flat', '--reporter', 'html', '--config', path.join(__dirname, '../.gemini.conf.js')],
      name: 'Gemini',
      writeToConsole: true,
    }))
    .catch(() => {
      process.exit(1);
    });
});

function start({ command, lookFor, name, writeToConsole = false }) {
  return () => new Promise((resolve) => {
    let done = false;

    process.stdout.write(`🎬  Will start ${name}`);
    if (writeToConsole) {
      process.stdout.write('\n');
    }

    const child = spawn(command[0], command.splice(1));
    child.on('close', (code) => {
      process.stderr.clearLine();
      process.stderr.cursorTo(0);
      process.stderr.write(colors.red(`💥  ${name} has failed\n`));
      process.exit(code);
    });

    child.stdout.on('data', (data) => {
      if (writeToConsole) {
        process.stdout.write(data);
      } else {
        logFile.write(data);
      }
      isDone(data);
    });

    child.stderr.on('data', (data) => {
      if (writeToConsole) {
        process.stderr.write(data);
      } else {
        logFile.write(data);
      }
      isDone(data);
    });

    function isDone(data) {
      if (done || ! lookFor) return;

      data.toString().split('\n').find((line) => {
        if (lookFor.test(line)) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(colors.green(`🏃  ${name} is up an running\n`));
          resolve();
          done = true;
          return true;
        }

        return false;
      });
    }
  });
}
