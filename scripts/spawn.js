/* eslint-disable no-console */

const colors = require('colors/safe');
const _spawn = require('child_process').spawn;

process.on('exit', killAll);
process.on('SIGINT', () => process.exit(1));
process.on('SIGTERM', () => process.exit(1));

const children = [];

module.exports = function spawn(...args) {
  const child = _spawn(...args);
  children.push(child);
  return child;
};

function killAll() {
  console.log(colors.grey('🔪  Will kill all processes'));
  children.forEach((child) => child.kill());
}
