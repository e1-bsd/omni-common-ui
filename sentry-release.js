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

const release = git.long();
const { sentryProject, sentryApiKey } = packageInfo.config;

log.enableAll();
createRelease(uploadFiles);

function createRelease(after) {
  return request({
    url: `https://sentry.io/api/0/projects/e1-bsd/${sentryProject}/releases/`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sentryApiKey}`,
    },
    body: `{"version": "${release}"}`,
  }, processResponse((response, body) => {
    log.info(colors.green(`📦  ${release}`));
    log.info(colors.grey(json(body)));
    log.info('\n');

    after();
  }));
}

function uploadFiles() {
  recursive(path.resolve('dist'), [shouldIgnoreFile], (error, files) => {
    if (error) {
      log.error(colors.red(error));
      process.exit(1);
    }

    log.info('📤  Will upload files');
    files.forEach(uploadFile);
  });
}

function uploadFile(file) {
  return request({
    url: `https://sentry.io/api/0/projects/e1-bsd/${sentryProject}/releases/${release}/files/`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${sentryApiKey}`,
    },
    formData: { file: fs.createReadStream(file) },
  }, processResponse((response) => {
    if (response.statusCode === 409) {
      log.warn(colors.yellow(`  📄  ${path.relative(process.cwd(), file)} (already there)`));
    } else {
      log.info(colors.green(`  📄  ${path.relative(process.cwd(), file)}`));
    }
  }));
}

function processResponse(onOk) {
  return (error, response, body) => {
    if (error) {
      log.error(colors.red(error));
      process.exit(1);
    }

    if (response.statusCode !== 409 &&
        ! (response.statusCode >= 200 && response.statusCode < 300)) {
      log.error(json(response));
      const parsedBody = JSON.parse(body);
      log.error(colors.red(parsedBody && parsedBody.detail) || json(response));
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
