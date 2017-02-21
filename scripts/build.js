#!/usr/bin/env node
/* eslint-disable no-console */

const colors = require('colors/safe');
const { Map } = require('immutable');
const path = require('path');
const fs = require('fs');
const requireAll = require('require-all');
const spawn = require('./spawn');

const configs = new Map(requireAll({
  dirname: path.resolve('config'),
  filter: /\.json$/i,
  recursive: false,
  map: (name, filePath) => path.basename(filePath, '.json'),
}));

process.env.NODE_ENV = 'production';

const buildLog = fs.createWriteStream(path.resolve('build.log'), { flags: 'w+' });
buildLog.on('open', () => {
  console.info('📦  Generate config files');
  const distDir = path.resolve('dist-configs');
  fs.mkdir(distDir, () => {
    configs.forEach((config, environment) => {
      const file = `${environment}.js`;
      const fileDir = path.join(distDir, file);
      try {
        fs.writeFileSync(fileDir, `var __CONFIG__ = Object.freeze(${JSON.stringify(config)})`);
        console.info(colors.green(`   📄  ${file} generated`));
      } catch (e) {
        console.error(colors.red(`   📄  ${file} could not be generated`));
        buildLog.write(e);
        process.exit(1);
      }
    });

    console.info('📦  Build app');
    const webpack = spawn('node', ['node_modules/webpack/bin/webpack.js', '-p', '--bail', '--progress', '--colors'], { env: process.env, stdio: [buildLog, buildLog, buildLog] });
    webpack.on('close', (code) => {
      if (code) {
        console.error(colors.red('   💣  App build failed!'));
        process.exit(code);
      }

      console.info(colors.green('   📦  App built'));
    });
  });
});
