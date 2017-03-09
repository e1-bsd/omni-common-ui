/* eslint strict: "off" */
/* eslint import/no-dynamic-require: "off" */

// TODO: Use the "modern" object format for this
// https://github.com/michael-ciniawsky/postcss-load-config#postcssconfigjs-or-postcssrcjs

const path = require('path');  // eslint-disable-line
const packageInfo = require(path.resolve('package.json'));
const isCommon = packageInfo.name === 'omni-common-ui';
const contextFolder = isCommon ? 'sample' : 'app';

const postcssCalc = require('postcss-calc');
const postcssCssnext = require('postcss-cssnext');
const postcssNesting = require('postcss-nesting');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssSelectorNot = require('postcss-selector-not');
const postcssColorFunctions = require('postcss-color-function');
const postcssColorHexAlpha = require('postcss-color-hex-alpha');
const postcssMixins = require('postcss-mixins');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssContainerQueries = require('cq-prolyfill/postcss-plugin');
const postcssUrl = require('postcss-url');
const postcssPxToRem = require('postcss-pxtorem');
const postcssGradientTransparencyFix = require('postcss-gradient-transparency-fix');

module.exports = () => ({
  plugins: [
    postcssImport({
      path: [
        'node_modules',
        contextFolder,
        `${contextFolder}/assets/styles`,
        process.cwd(),
      ],
    }),
    postcssUrl({ url: 'rebase' }),
    postcssContainerQueries,
    postcssMixins,
    postcssCustomSelectors,
    postcssCustomProperties,
    postcssSelectorNot,
    postcssColorFunctions,
    postcssColorHexAlpha,
    postcssNesting,
    postcssGradientTransparencyFix,
    postcssPxToRem({
      rootValue: 14,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
    postcssCalc,
    postcssCssnext({
      browsers: [
        '> 0%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1',
        'Android 2.3',
        'iOS 7',
      ],
    }),
    postcssReporter({ clearMessages: true }),
  ],
});
