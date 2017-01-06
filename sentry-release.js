#!/usr/bin/env node

const request = require('request');
const path = require('path');
const git = require('git-rev-sync');
const log = require('loglevel');
const colors = require('colors/safe');

// eslint-disable-next-line import/no-dynamic-require
const packageInfo = require(path.resolve('package.json'));

const { key } = require('command-line-args')([
  { name: 'key', alias: 'k', type: String },
]);

log.enableAll();

const release = git.long();
const { sentryProject } = 'omni-learning';//packageInfo.config;

request({
  url: `https://sentry.io/api/0/projects/e1-bsd/${sentryProject}/releases/`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  },
  body: `{"version": "${release}"}`,
}, (error, response, body) => {
  if (error) {
    log.error(colors.red(error));
    process.exit(1);
  }

  if (! (response.statusCode >= 200 && response.statusCode < 300)) {
    log.error(colors.red(body));
    process.exit(1);
  }

  log.debug(body);
});
