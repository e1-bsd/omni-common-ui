#!/usr/bin/env node
/* eslint-disable no-console */

const AWS = require('aws-sdk');
const { queue } = require('async');
const invariant = require('invariant');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const colors = require('colors/safe');
const zlib = require('zlib');
const zopfli = require('node-zopfli');
const temp = require('temp').track();
const getUsage = require('command-line-usage');
const execOrExit = require('./execOrExit');

const optionList = [{
  name: 'env',
  alias: 'e',
  type: String,
  description: 'Specifies environment to deploy to, e.g. qa',
}, {
  name: 'dry',
  alias: 'd',
  type: Boolean,
  description: 'Dry run - skip the upload',
}];

const options = require('command-line-args')(optionList);

if (! options.env) {
  console.log(getUsage([{
    header: 'Omni dist uploader',
    content: 'Compresses dist assets and uploads them to the S3 bucket',
  }, {
    header: 'Options',
    optionList,
  }]));
  process.exit(2);
}

const ZIP_OPTS = { level: 9 };
const QUEUE_CONCURRENCY = 50;  // safeguard. concurrency rocks
const NOZIP_MIME_TEST = /^(image\/png|application\/font-woff)/; // woffs already zipped
const CACHE_CONTROL_INDEX = 'no-cache';  // keep history buffer. http://stackoverflow.com/a/18516720
const CACHE_CONTROL_OTHERS = 'public, max-age=31536000';  // 1 year

const config = require(path.resolve(`ci/${options.env}.json`)); // eslint-disable-line import/no-dynamic-require
const isProductionEnv = options.env.startsWith('staging') || options.env.startsWith('production');
const compressionAlgo = isProductionEnv ? 'zopfli' : 'zlib';

if (config.region) {
  AWS.config.update({ region: config.region });
}

execOrExit(`yarn run omni-set-up-config -- --config ${options.env}`);
console.log(`Upload to S3 (${options.env}) is starting...\n`);
options.dry && console.log('DRY RUN! No upload will actually happen.\n');
isProductionEnv &&
    console.log(`This production build will use ${compressionAlgo}, which is slower to compress!\n`);

const copyQueue = queue(copyWorker, QUEUE_CONCURRENCY);
const uploadQueue = queue(uploadWorker, QUEUE_CONCURRENCY);
const absoluteFolder = path.resolve('dist');

const indexCopyTask = {  // index.html comes last
  file: 'index.html',
  folder: absoluteFolder,
};

let batchSize;

uploadQueue.drain = () => {
  if (copyQueue.length() || uploadQueue.length() ||
      copyQueue.running() || uploadQueue.running()) return;  // tasks remain!
  copyQueue.push(indexCopyTask);
  uploadQueue.drain = () => {};
};

fs.readdir(absoluteFolder, (err, files) => {
  const index = files.splice(files.indexOf('index.html'), 1);
  invariant(index[0] === 'index.html', 'index.html should be present');
  batchSize = files.length + 1;
  files.forEach((file) => {
    copyQueue.push({
      file,
      folder: absoluteFolder,
    }, (_err) => {
      if (_err) {
        console.error(colors.red('Error!'), file, _err);
        process.exit(1);
      } else console.info(progress(), 'Crunched:', file);
    });
  });
});

function copyWorker(task, callback) {
  const { folder, file } = task;
  const filePath = path.join(folder, file);
  const mimeType = mime.lookup(file);
  const isZippable = ! NOZIP_MIME_TEST.test(mimeType);
  const { createGzip } = isProductionEnv ? zopfli : zlib;
  const inStream = fs.createReadStream(filePath);
  temp.open('omniupload', (err, tempFile) => {
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
      }, (_err) => {
        if (_err) {
          console.error(colors.red('Error!'), file, _err);
          process.exit(1);
        } else {
          console.info(progress(), 'Uploaded:', file,
              `(${mimeType})`, isZippable ? `(${compressionAlgo})` : '');
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
    if (options.dry) {
      callback();
    } else {
      new AWS.S3().putObject({
        Bucket: config.bucket,
        CacheControl: file.endsWith('index.html') ?
            CACHE_CONTROL_INDEX :
            CACHE_CONTROL_OTHERS,
        ContentLength: size,
        ContentType: mimeType,
        ContentEncoding: encoding,
        Key: file,
        Body: fs.createReadStream(task.path),
        ACL: 'public-read',
      }, callback);
    }
  });
}

function progress() {
  const waiting =
      copyQueue.length() + uploadQueue.length() + copyQueue.running() + uploadQueue.running();
  const perc = `${Math.round(100 - ((waiting / batchSize) * 100))}%`;
  return `${perc}${new Array(5 - perc.length).fill('').join(' ')}`;
}
