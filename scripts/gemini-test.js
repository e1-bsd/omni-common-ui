#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;
const log = require('loglevel');
const colors = require('colors/safe');

log.enableAll();

const processes = [];

process.on('exit', killAll);
process.on('SIGINT', () => process.exit(1));
process.on('SIGTERM', () => process.exit(1));

const logFile = fs.createWriteStream(path.resolve(`${path.basename(__filename)}.log`), { flags: 'w+' });
logFile.on('open', () => {
  process.stdout.write('🎬  Will install Selenium');
  const seleniumInstall = spawn('node', ['node_modules/selenium-standalone/bin/selenium-standalone', 'install', '--version=3.0.1'], { stdio: [logFile, logFile, logFile] });
  processes.push(seleniumInstall);
  seleniumInstall.on('close', (code) => {
    process.stderr.clearLine();
    process.stderr.cursorTo(0);

    if (code !== 0) {
      process.stderr.write(colors.red('💥  Selenium installation has failed\n'));
      process.exit(1);
    }

    process.stdout.write(colors.green('🔩  Selenium has been installed\n'));

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
        command: ['yarn', 'start'],
        lookFor: /webpack: bundle is now VALID/i,
        name: 'Web server',
      }))
      .then(start({
        command: ['node', 'node_modules/gemini/bin/gemini', 'test', '--reporter', 'flat', '--reporter', 'html', '--config', path.join(__dirname, '../.gemini.conf.js')],
        name: 'Gemini',
      }))
      .catch(() => {
        process.exit(1);
      });
  });
});

function start({ command, lookFor, name }) {
  return () => new Promise((resolve) => {
    let done = false;

    process.stderr.write(`🎬  Will start ${name}`);
    const child = spawn(command[0], command.splice(1));
    child.on('close', (code) => {
      process.stderr.clearLine();
      process.stderr.cursorTo(0);
      process.stderr.write(colors.red(`💥  ${name} has failed\n`));
      process.exit(code);
    });
    processes.push(child);

    child.stdout.on('data', (data) => {
      logFile.write(data);
      isDone(data);
    });

    child.stderr.on('data', (data) => {
      logFile.write(data);
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

function killAll() {
  log.debug(colors.grey('\n🔪  Will kill all processes'));
  processes.forEach((child) => {
    child.kill('SIGINT');
  });
}

