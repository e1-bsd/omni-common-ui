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
const { countingStream } = require('stream-toolkit');
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

if (config.accessKeyId) {
  console.log('Will use custom accessKey.');
  AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  });
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

let filesCount;
let originalSizeAll = 0;
let compressedSizeAll = 0;

uploadQueue.drain = () => {
  if (copyQueue.length() || uploadQueue.length() ||
      copyQueue.running() || uploadQueue.running()) return;  // tasks remain!
  copyQueue.push(indexCopyTask);
  uploadQueue.drain = () => {
    const original = originalSizeAll / 1000000;  // B to MB
    const compressed = compressedSizeAll / 1000000;
    const savedPerc = 100 - Math.round((compressedSizeAll / originalSizeAll) * 100);
    console.log(
        `\nAll done.` +
        ` Crunched ${original.toFixed(2)}MB down to ${compressed.toFixed(2)}MB` +
        `, saving ${savedPerc}%.`);
    uploadQueue.drain = () => {};
  };
};

fs.readdir(absoluteFolder, (err, files) => {
  const index = files.splice(files.indexOf('index.html'), 1);
  invariant(index[0] === 'index.html', 'index.html should be present');
  filesCount = files.length + 1;
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
  const counter = countingStream();
  const inStream = fs.createReadStream(filePath).pipe(counter);
  temp.open('omniupload', (err, tempFile) => {
    if (err) return callback(err);
    const outStream = fs.createWriteStream(tempFile.path);
    isZippable ?
      inStream.pipe(createGzip(ZIP_OPTS)).pipe(outStream) :
      inStream.pipe(outStream);
    outStream.on('finish', () => {
      originalSizeAll += counter.bytes;
      uploadQueue.push({
        file,
        mimeType,
        path: tempFile.path,
        encoding: isZippable ? 'gzip' : undefined,
        originalSize: counter.bytes,
      }, (_err) => {
        if (_err) {
          console.error(colors.red('Error!'), file, _err);
          process.exit(1);
        }
      });
      callback();
    });
  });
}

function uploadWorker(task, callback) {
  const { file, mimeType, encoding, originalSize } = task;
  fs.stat(task.path, (err, { size }) => {
    if (err) return callback(err);
    const ratio = (size / originalSize).toFixed(2);
    let details = `(${mimeType})`;
    details += encoding ? ` (${encoding}, ratio ${ratio})` : '';
    compressedSizeAll += size;
    if (options.dry) {
      console.info(progress(), 'Would upload:', file, details);
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
      }, (_err) => {
        console.info(progress(), 'Uploaded:', file, details);
        callback(_err);
      });
    }
  });
}

function progress() {
  const waiting =
      copyQueue.length() + uploadQueue.length() + copyQueue.running() + uploadQueue.running();
  const perc = `${Math.round(100 - ((waiting / filesCount) * 100))}%`;
  return `${perc}${new Array(5 - perc.length).fill('').join(' ')}`;
}
