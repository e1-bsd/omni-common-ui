#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { Map } = require('immutable');
const log = require('loglevel');
const is = require('is_js');

log.enableAll();

const { config } = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
if (is.not.object(config)) {
  log.info('No binaries to build.');
  process.exit(0);
}

const binDir = path.resolve('node_modules/.bin');

new Map(config.bin).forEach((dir, command) => {
  const link = path.join(binDir, command);
  const pointsTo = path.resolve(dir);
  fs.unlink(link, () => {
    fs.symlink(pointsTo, link, 'file', (error) => {
      if (error) {
        throw error;
      }

      log.info(`'${path.relative(process.cwd(), link)}' -> ${path.relative(process.cwd(), pointsTo)}`);
      fs.chmod(link, 511);
    });
  });
});
