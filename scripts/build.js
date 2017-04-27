#!/usr/bin/env node
/* eslint-disable no-console */

const colors = require('colors/safe');
const { Map } = require('immutable');
const path = require('path');
const fs = require('fs');
const requireAll = require('require-all');
const spawn = require('./spawn');
const auto = require('async/auto');
const mkdirp = require('mkdirp');

const configs = new Map(requireAll({
  dirname: path.resolve('config'),
  filter: /\.json$/i,
  recursive: false,
  map: (name, filePath) => path.basename(filePath, '.json'),
}));

process.env.NODE_ENV = 'production';
const distDirPath = path.resolve('dist-configs');

auto({
  logStream: (cb) => {
    const logStream = fs.createWriteStream(path.resolve('build.log'), { flags: 'w+' });
    logStream.on('open', () => {
      cb(null, logStream);
    }).on('error', (err) => {
      cb(err);
    });
  },
  distDir: (cb) => {
    mkdirp(distDirPath, cb);
  },
  buildConfigs: ['logStream', 'distDir', ({ logStream }, cb) => {
    console.info('📦  Generate config files');
    configs.forEach((config, environment) => {
      const file = `${environment}.js`;
      const fileDir = path.join(distDirPath, file);
      try {
        fs.writeFileSync(fileDir, `var __CONFIG__ = Object.freeze(${JSON.stringify(config)})`);
        console.info(colors.green(`   📄  ${file} generated`));
      } catch (e) {
        console.error(colors.red(`   📄  ${file} could not be generated`));
        cb(e);
        logStream.write(e);
      }
    });
  }],
  buildApp: ['logStream', 'distDir', ({ logStream }, cb) => {
    console.info('📦  Build app');
    const webpack = spawn('node', [
      'node_modules/webpack/bin/webpack.js',
      '-p', '--bail', '--progress', '--colors',
    ], {
      env: process.env,
      stdio: [logStream, logStream, logStream],
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
    process.exit(1);
    return;  // eslint-disable-line
  }
  console.info(colors.green('   📦  App built'));
});
