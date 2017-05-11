#!/usr/bin/env node
/* eslint-disable no-console */

const AWS = require('aws-sdk');
const { priorityQueue } = require('async');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const colors = require('colors/safe');
const zlib = require('zlib');
const zopfli = require('node-zopfli');
const temp = require('temp').track();
const execOrExit = require('./execOrExit');

const options = require('command-line-args')([
  { name: 'env', alias: 'e', type: String },
]);

const ZIP_OPTS = { level: 9 };
const QUEUE_CONCURRENCY = 10;
const NOZIP_MIME_TEST = /^(image\/png|application\/font-woff)/; // woffs already zipped
const TEMP_FILE_PREFIX = 'omniupload';

const config = require(path.resolve(`ci/${options.env}.json`)); // eslint-disable-line import/no-dynamic-require
const isProductionEnv = options.env.startsWith('staging') || options.env.startsWith('production');

if (config.region) {
  AWS.config.update({ region: config.region });
}

execOrExit(`yarn run omni-set-up-config -- --config ${options.env}`);
console.log(`Upload to S3 (${options.env}) is starting…`);

const buildQueue = priorityQueue(copyWorker, QUEUE_CONCURRENCY);
const uploadQueue = priorityQueue(uploadWorker, QUEUE_CONCURRENCY);

const absoluteFolder = path.resolve('dist');
fs.readdir(absoluteFolder, (err, files) => {
  files.push(files.splice(files.indexOf('index.html'), 1)[0]);
  files.forEach((file) => {
    buildQueue.push({
      file,
      folder: absoluteFolder,
    }, getQueuePriorityForFile(file), (_err) => {
      if (_err) {
        console.error(colors.red('Error!'), file, _err);
        process.exit(1);
      } else console.info('Copied:', file);
    });
  });
});

function copyWorker(task, callback) {
  const { folder, file } = task;
  const filePath = path.join(folder, file);
  const mimeType = mime.lookup(file);
  const isZippable = ! NOZIP_MIME_TEST.test(mimeType);
  const { createGzip } = isProductionEnv ? zopfli : zlib;
  const compressionAlgo = isProductionEnv ? 'gzip-zopfli' : 'gzip-zlib';
  const inStream = fs.createReadStream(filePath);
  temp.open(TEMP_FILE_PREFIX, (err, tempFile) => {
    if (err) return callback(err);
    const outStream = fs.createWriteStream(tempFile.path);
    isZippable ?
      inStream.pipe(createGzip(ZIP_OPTS)).pipe(outStream) :
      inStream.pipe(outStream);
    outStream.on('finish', () => {
      uploadQueue.push({
        file,
        mimeType,
        path: tempFile.path,
        encoding: isZippable ? 'gzip' : undefined,
      }, getQueuePriorityForFile(file), (_err) => {
        if (_err) {
          console.error(colors.red('Error!'), file, _err);
          process.exit(1);
        } else {
          console.info('Uploaded:', file,
              isZippable ? `(${compressionAlgo})` : '');
        }
      });
      callback();
    });
  });
}

function uploadWorker(task, callback) {
  const { file, mimeType, encoding } = task;
  fs.stat(task.path, (err, { size }) => {
    if (err) return callback(err);
    new AWS.S3().putObject({
      Bucket: config.bucket,
      CacheControl: file.endsWith('index.html') ? 'max-age=172800' : 'max-age=31556926',
      ContentLength: size,
      ContentType: mimeType,
      ContentEncoding: encoding,
      Key: file,
      Body: fs.createReadStream(task.path),
      ACL: 'public-read',
    }, callback);
  });
}

function getQueuePriorityForFile(filename) {
  // process index.html last
  if (filename.endsWith('index.html')) return 2;
  return 1;
}
