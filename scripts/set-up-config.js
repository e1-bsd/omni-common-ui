#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
]);

const configsDir = path.resolve('dist-configs');
const distDir = path.resolve('dist');

const confData = fs.readFileSync(
    path.join(configsDir, `${options.config}.js`), 'utf8');

const indexFile = path.join(distDir, 'index.html');
const indexData = fs.readFileSync(indexFile, 'utf8');

const patchedIndexData = indexData.replace(
    /<script.+data-config-sentinel.*>.*<\/script>/,
    `<script data-config-sentinel>${confData}</script>`);

fs.writeFile(indexFile, patchedIndexData, 'utf8');
