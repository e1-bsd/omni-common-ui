#!/usr/bin/env node
/* eslint-disable no-console */

const request = require('request');
const path = require('path');
const fs = require('fs');
const git = require('git-rev-sync');
const colors = require('colors/safe');
const is = require('is_js');
const recursive = require('recursive-readdir');

// eslint-disable-next-line import/no-dynamic-require
const packageInfo = require(path.resolve('package.json'));

const release = git.long();
const { sentryProject, sentryApiKey } = packageInfo.config;

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
    console.info(colors.green(`📦  Sentry release ${release}`));
    console.info(colors.grey(json(body)));
    console.info('\n');

    after();
  }));
}

function uploadFiles() {
  recursive(path.resolve('dist'), [shouldIgnoreFile], (error, files) => {
    if (error) {
      console.error(colors.red(error));
      process.exit(1);
    }

    console.info('📤  Will upload files');
    files.forEach(uploadFile);
  });
}

function uploadFile(file) {
  const fileName = `~/${path.parse(file).base}`;
  return request({
    url: `https://sentry.io/api/0/projects/e1-bsd/${sentryProject}/releases/${release}/files/`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${sentryApiKey}`,
    },
    formData: {
      file: fs.createReadStream(file),
      name: fileName,
    },
  }, processResponse((response) => {
    if (response.statusCode === 409) {
      console.warn(colors.yellow(`  📄  ${path.relative(process.cwd(), file)} (already there)`), fileName);
    } else {
      console.info(colors.green(`  📄  ${path.relative(process.cwd(), file)}`), fileName);
    }
  }));
}

function processResponse(onOk) {
  return (error, response, body) => {
    if (error) {
      console.error(colors.red(error));
      process.exit(1);
    }

    if (response.statusCode !== 409 &&
        ! (response.statusCode >= 200 && response.statusCode < 300)) {
      console.error(json(response));
      const parsedBody = JSON.parse(body);
      console.error(colors.red(parsedBody && parsedBody.detail) || json(response));
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
