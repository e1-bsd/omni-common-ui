#!/usr/bin/env node

const log = require('loglevel');
const colors = require('colors/safe');
const spawn = require('child_process').spawn;
const { Map } = require('immutable');
const path = require('path');
const fs = require('fs');
const requireAll = require('require-all');

const configs = new Map(requireAll({
  dirname: path.resolve('config'),
  filter: /\.json$/i,
  recursive: false,
  map: (name, filePath) => path.basename(filePath, '.json'),
}));

process.env.NODE_ENV = 'production';
log.enableAll();

const buildLog = fs.createWriteStream(path.resolve('build.log'), { flags: 'w+' });
buildLog.on('open', () => {
  log.info('📦  Generate config files');
  const distDir = path.resolve('dist-configs');
  fs.mkdir(distDir, () => {
    configs.forEach((config, environment) => {
      const file = `${environment}.js`;
      const fileDir = path.join(distDir, file);
      try {
        fs.writeFileSync(fileDir, `var __CONFIG__ = Object.freeze(${JSON.stringify(config)})`);
        log.info(colors.green(`   📄  ${file} generated`));
      } catch (e) {
        log.error(colors.red(`   📄  ${file} could not be generated`));
        buildLog.write(e);
        process.exit(1);
      }
    });

    log.info('📦  Build app');
    const webpack = spawn('node', ['node_modules/webpack/bin/webpack.js', '-p', '--bail', '--progress', '--colors'], { env: process.env, stdio: [buildLog, buildLog, buildLog] });
    webpack.on('close', (code) => {
      if (code) {
        log.error(colors.red('   💣  App build failed!'));
        process.exit(code);
      }

      log.info(colors.green('   📦  App built'));
    });
  });
});
