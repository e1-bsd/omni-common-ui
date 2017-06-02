#!/usr/bin/env node
/* eslint-disable no-console */

const colors = require('colors/safe');
const { Map } = require('immutable');
const { auto, parallel, series } = require('async');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const requireAll = require('require-all');
const mkdirp = require('mkdirp');
const mime = require('mime');
const spawn = require('./spawn');

const GZ_LEVEL = 9;
const NOZIP_MIME_TEST = /^(image\/png|application\/font-woff)/; // woffs are zipped
const DIST_CONFIGS_PATH = path.resolve('dist-configs');
const DIST_PATH = path.resolve('dist');
const DIST_NOGZ_PATH = path.resolve('dist-nogz');
const DIST_GZ_PATH = path.resolve('dist-gz');

const isZippableFile = (filename) =>
  ! NOZIP_MIME_TEST.test(mime.lookup(filename));

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
    parallel([
      (_cb) => mkdirp(DIST_CONFIGS_PATH, _cb),
      (_cb) => mkdirp(DIST_NOGZ_PATH, _cb),
      (_cb) => mkdirp(DIST_GZ_PATH, _cb),
    ], cb);
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
  distGz: ['buildApp', 'mkDirs', (results, cb) => {
    console.info('📦  Copying/compressing files');
    console.info('   (gzipped: dist-gz/, bins: dist-nogz/)');

    const copyAndZipFile = (filename, _cb) => {
      const input = fs.createReadStream(path.resolve(DIST_PATH, filename));
      const output = fs.createWriteStream(path.resolve(DIST_GZ_PATH, filename));
      input.pipe(zlib.createGzip({ level: GZ_LEVEL })).pipe(output);
      input.on('end', _cb);
    };

    const copyFile = (filename, _cb) => {
      const input = fs.createReadStream(path.resolve(DIST_PATH, filename));
      const output = fs.createWriteStream(path.resolve(DIST_NOGZ_PATH, filename));
      input.pipe(output);
      input.on('end', _cb);
    };

    fs.readdir('dist', (err, filenames) => {
      series(filenames.map((filename) =>  // eslint-disable-line
        isZippableFile(filename) ?
          copyAndZipFile.bind(null, filename) :
          copyFile.bind(null, filename)
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
