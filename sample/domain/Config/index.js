/* global process */

import developmentConfig from './development.json';
import productionConfig from './production.json';
import testConfig from './test.json';
import thePackage from 'package.json';

let config = null;
if (process.env.NODE_ENV === 'development') {
  config = developmentConfig;
}

if (process.env.NODE_ENV === 'production') {
  config = productionConfig;
}

if (process.env.NODE_ENV === 'test') {
  config = testConfig;
}

export default Object.assign({}, config, { version: thePackage.version });
