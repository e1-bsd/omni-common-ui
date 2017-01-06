#!/usr/bin/env node

const request = require('request');
const path = require('path');
const fs = require('fs');
const git = require('git-rev-sync');
const log = require('loglevel');
const colors = require('colors/safe');
const is = require('is_js');
const recursive = require('recursive-readdir');

// eslint-disable-next-line import/no-dynamic-require
const packageInfo = require(path.resolve('package.json'));

const { key } = require('command-line-args')([
  { name: 'key', alias: 'k', type: String },
]);

log.enableAll();

const release = git.long();
const { sentryProject } = packageInfo.config;

createRelease(uploadFiles);

function createRelease(after) {
  return request({
    url: `https://sentry.io/api/0/projects/e1-bsd/${sentryProject}/releases/`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: `{"version": "${release}"}`,
  }, processResponse((response, body) => {
    log.info(colors.green(`Release ${release} was created`));
    log.info(colors.green(json(body)));
    log.info('\n\n');

    after();
  }));
}

function uploadFiles() {
  recursive(path.resolve('dist'), [shouldIgnoreFile], (error, files) => {
    if (error) {
      log.error(colors.red(error));
      process.exit(1);
    }

    files.forEach(uploadFile);
  });
}

function uploadFile(file) {
  log.info(`Will upload file ${path.relative(process.cwd(), file)}`);
  return request({
    url: `https://sentry.io/api/0/projects/e1-bsd/${sentryProject}/releases/${release}/files/`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${key}`,
    },
    formData: { file: fs.createReadStream(file) },
  }, processResponse((response, body) => {
    log.info(colors.green(`File ${path.relative(process.cwd(), file)} uploaded`));
    log.info(colors.green(json(body)));
  }));
}

function processResponse(onOk) {
  return (error, response, body) => {
    if (error) {
      log.error(colors.red(error));
      process.exit(1);
    }

    if (! (response.statusCode >= 200 && response.statusCode < 300)) {
      log.error(colors.red(body && body.detail) || json(response));
      process.exit(1);
    }

    return onOk(response, body);
  };
}

function shouldIgnoreFile(file, stats) {
  return stats.isDirectory() || ! /\.js(\.map)?$/.test(path.basename(file));
}

function json(input) {
  let parsedInput = input;
  if (is.string(input)) {
    parsedInput = JSON.parse(parsedInput);
  }
  return JSON.stringify(parsedInput, null, 2);
}
