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
    require('postcss-nested-ancestors'),
    require('postcss-nested'),
    require('postcss-current-selector'),
    require('postcss-nesting'),
    require('postcss-custom-properties'),
    require('postcss-custom-media'),
    require('postcss-custom-selectors'),
    require('postcss-url')({ url: 'rebase' }),
    require('cq-prolyfill/postcss-plugin'),
    require('postcss-mixins'),
    require('postcss-selector-not'),
    require('postcss-color-function'),
    require('postcss-color-hex-alpha'),
    require('postcss-gradient-transparency-fix'),
    require('postcss-calc'),
    require('postcss-pxtorem')({
      rootValue: 14,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
    require('autoprefixer')({
      browsers: [
        '> 0%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1',
        'Android 2.3',
        'iOS 7',
      ],
    }),
    require('postcss-reporter'),
  ],
};
