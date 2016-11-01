const path = require('path');
const is = require('is_js');
const lodash = require('lodash');

module.exports = buildConfigGlobals;

function buildConfigGlobals(config, globalName, lintCheckFn) {
  lintCheckFn !== lintCheck && lintCheck();
  const globals = {};

  function recurse(current, key) {
    if (is.not.object(current)) {
      globals[key] = formatValue(current);
      return;
    }

    Object.keys(current).forEach((currentKey) => {
      recurse(current[currentKey], `${key}.${currentKey}`);
    });
  }

  recurse(config, globalName);
  return globals;
}

function formatValue(value) {
  return is.string(value) ? `"${value}"` : value;
}

function lintCheck() {
  /* eslint global-require: "off", import/newline-after-import: "off" */
  const configs = require('require-all')(path.resolve('config'));
  delete configs.build; // Remove the entry for this very file

  Object.keys(configs).forEach((config) => {
    configs[config] = buildConfigGlobals(configs[config], 'TEST', lintCheck);
  });

  let previousConfig;
  let previousKeys;
  Object.keys(configs).forEach((config) => {
    const keys = Object.keys(configs[config]);
    if (is.string(previousConfig) && ! lodash.isEqual(keys, previousKeys)) {
      throw new Error(`Configuration files ${previousConfig} and ${config} do not match!`);
    }

    previousConfig = config;
    previousKeys = keys;
  });
}
