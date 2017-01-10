#!/usr/bin/env node

const path = require('path');
const spawn = require('child_process').spawn;

const processes = new Array(0);

process.on('exit', killAll);
process.on('SIGINT', killAll);
process.on('SIGTERM', killAll);

start('node', ['node_modules/selenium-standalone/bin/selenium-standalone', 'start', '--version=3.0.1'], /(Selenium started)|(Selenium Server is up and running)/i)
  .then(start('node', [path.join(__dirname, 'start-mock.js')], /Serving on port/i))
  .then(start('yarn', ['start'], /webpack: bundle is now VALID/i))
  .then(start('node', ['node_modules/gemini/bin/gemini', 'test', '--reporter', 'flat', '--reporter', 'html', '--config', path.join(__dirname, '../.gemini.conf.js')]))
  .catch(() => {
    process.exit(1);
  });

function start(command = 'node', args = [], lookFor) {
  return new Promise((resolve) => {
    let done = false;
    const child = spawn(command, args);
    child.on('close', (code) => process.exit(code));
    processes.push(child);

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
      isDone(data);
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data);
      isDone(data);
    });

    function isDone(data) {
      if (done || ! lookFor) return;

      data.toString().split('\n').find((line) => {
        if (lookFor.test(line)) {
          resolve();
          done = true;
          return true;
        }

        return false;
      });
    }
  });
}

function killAll() {
  processes.forEach((child) => {
    try {
      child.kill();
    } catch (e) { /* */ }
  });
}

