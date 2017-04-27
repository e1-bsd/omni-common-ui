#!/usr/bin/env node
/* eslint-disable no-console */

const colors = require('colors/safe');
const { Map } = require('immutable');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const requireAll = require('require-all');
const spawn = require('./spawn');
const mkdirp = require('mkdirp');
const auto = require('async/auto');
const series = require('async/series');

const configs = new Map(requireAll({
  dirname: path.resolve('config'),
  filter: /\.json$/i,
  recursive: false,
  map: (name, filePath) => path.basename(filePath, '.json'),
}));

process.env.NODE_ENV = 'production';
const distGzDir = 'dist-gz';
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
  mkDistDir: (cb) => {
    mkdirp(distDirPath, cb);
  },
  mkDistGzDir: (cb) => {
    mkdirp(distGzDir, cb);
  },
  buildConfigs: ['logStream', 'mkDistDir', ({ logStream }, cb) => {
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
  buildApp: ['logStream', 'mkDistDir', ({ logStream }, cb) => {
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
  distGz: ['buildApp', 'mkDistGzDir', (results, cb) => {
    console.info('📦  Compressing and copying files in dist/ to dist-gz/');

    const copyGzipFile = (filename, _cb) => {
      const input = fs.createReadStream(path.resolve('dist', filename));
      const output = fs.createWriteStream(path.resolve(distGzDir, filename));

      input.pipe(zlib.createGzip({ level: 4 })).pipe(output);

      input.on('end', _cb);
    };

    fs.readdir('dist', (err, filenames) => {
      series(filenames.map((filename) =>
        copyGzipFile.bind(this, filename)
      , cb));
    });
  }],
}, (err) => {
  if (err) {
    console.error(colors.red('   💣  App build failed!'), err);
    return;  // eslint-disable-line
  }
  console.info(colors.green('   📦  App built'));
});
