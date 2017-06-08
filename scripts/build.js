#!/usr/bin/env node
/* eslint-disable no-console */

const colors = require('colors/safe');
const { Map } = require('immutable');
const { auto } = require('async');
const path = require('path');
const fs = require('fs');
const requireAll = require('require-all');
const mkdirp = require('mkdirp');
const spawn = require('./spawn');

const DIST_CONFIGS_PATH = path.resolve('dist-configs');

const configs = new Map(requireAll({
  dirname: path.resolve('config'),
  filter: /\.json$/i,
  recursive: false,
  map: (name, filePath) => path.basename(filePath, '.json'),
}));

process.env.NODE_ENV = 'production';

auto({
  log: (cb) => {
    const logStream = fs.createWriteStream(
        path.resolve('build.log'), { flags: 'w+' });
    logStream.on('open', () => {
      cb(null, logStream);
    }).on('error', (err) => {
      cb(err);
    });
  },
  mkDirs: (cb) => {
    mkdirp(DIST_CONFIGS_PATH, cb);
  },
  buildConfigs: ['log', 'mkDirs', ({ log }, cb) => {
    console.info('📦  Generate config files');

    configs.forEach((config, environment) => {
      const file = `${environment}.js`;
      const fileDir = path.join(DIST_CONFIGS_PATH, file);
      try {
        fs.writeFileSync(fileDir,
            `var __CONFIG__ = Object.freeze(${JSON.stringify(config)})`);
        console.info(colors.green(`   📄  ${file} generated`));
      } catch (e) {
        console.error(colors.red(`   📄  ${file} could not be generated`));
        cb(e);
        log.write(e);
      }
    });
  }],
  buildApp: ['log', 'mkDirs', ({ log }, cb) => {
    console.info('📦  Build app');

    const webpack = spawn('node', [
      'node_modules/webpack/bin/webpack.js',
      '-p', '--bail', '--progress', '--colors',
      '--config', path.resolve(__dirname, '../webpack.prod.js'),
    ], {
      env: process.env,
      stdio: [log, log, log],
    });
    webpack.on('close', (code) => {
      if (code !== 0) {
        cb(new Error(`Error code ${code}`));
        return;
      }
      cb();
    });
  }],
}, (err) => {
  if (err) {
    console.error(colors.red('   💣  App build failed!'), err);
    return;  // eslint-disable-line
  }
  console.info(colors.green('   📦  App built'));
});
