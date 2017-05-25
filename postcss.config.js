/* eslint global-require: "off" */

const path = require('path');  // eslint-disable-line

const packageInfo = require(path.resolve('package.json')); // eslint-disable-line import/no-dynamic-require
const isCommon = packageInfo.name === 'omni-common-ui';
const contextFolder = isCommon ? 'sample' : 'app';

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [
        'node_modules',
        contextFolder,
        `${contextFolder}/assets/styles`,
        process.cwd(),
      ],
    }),
    require('postcss-url')({ url: 'rebase' }),
    require('cq-prolyfill/postcss-plugin'),
    require('postcss-mixins'),
    require('postcss-custom-selectors'),
    require('postcss-custom-properties'),
    require('postcss-selector-not'),
    require('postcss-color-function'),
    require('postcss-color-hex-alpha'),
    require('postcss-nesting'),
    require('postcss-gradient-transparency-fix'),
    require('postcss-pxtorem')({
      rootValue: 14,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
    require('postcss-calc'),
    require('postcss-cssnext')({
      browsers: [
        '> 0%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1',
        'Android 2.3',
        'iOS 7',
      ],
    }),
    require('postcss-reporter')({ clearMessages: true }),
  ],
};
