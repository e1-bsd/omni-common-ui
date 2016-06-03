import developmentConfig from './development.json';
import productionConfig from './production.json';
import testConfig from './test.json';
import thePackage from 'package.json';

let config = null;
if (DEVELOPMENT) {
  config = developmentConfig;
}

if (PRODUCTION) {
  config = productionConfig;
}

if (TEST) {
  config = testConfig;
}

export default Object.assign({}, config, { version: thePackage.version });
