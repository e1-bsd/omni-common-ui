#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
]);

const configsDir = path.resolve('dist-configs');
const distDir = path.resolve('dist');

const hash = getHash();
const configFileName = `config.${hash}.js`;

fs.createReadStream(path.join(configsDir, `${options.config}.js`))
    .pipe(fs.createWriteStream(path.join(distDir, configFileName)));

const indexFile = path.join(distDir, 'index.html');
fs.readFile(indexFile, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data.replace(new RegExp(buildHashedFilename('config'), 'ig'), configFileName);
  fs.writeFile(indexFile, result, 'utf8', (writeError) => {
    if (writeError) {
      throw writeError;
    }
  });
});

function getHash() {
  const regex = new RegExp(`^${buildHashedFilename('app')}$`, 'i');
  const files = fs.readdirSync(distDir);
  const app = files.find((file) => regex.test(file));
  const matches = app.match(regex);
  return matches[matches.length - 1];
}

function buildHashedFilename(filename) {
  return `${filename}(.([a-z0-9]+))?.js`;
}
