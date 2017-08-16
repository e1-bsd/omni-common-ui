/* eslint-disable no-param-reassign */

const path = require('path');
const is = require('is_js');
const loaderUtils = require('loader-utils');

module.exports = ({ prefix = '' }) => (loaderContext, localIdentName, localName, options) => {
  if (! options.context) {
    options.context = loaderContext.options &&
        is.string(loaderContext.options.context) ?
            loaderContext.options.context :
            loaderContext.context;
  }

  localName = `${prefix}${localName}`;
  const request = path.relative(options.context, loaderContext.resourcePath);
  options.content = `${options.hashPrefix}${request}+${localName}`;

  localIdentName = localIdentName.replace(/\[local\]/gi, localName);

  const hash = loaderUtils.interpolateName(loaderContext, localIdentName, options);
  return `_${hash}`;
};
