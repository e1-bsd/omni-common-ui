"use strict";

var config = {};
var BASE_CONFIG = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  matches: false
};

Object.assign(config, BASE_CONFIG);

var mock = jest.fn(function () {
  return config;
});
mock.updateConfig = function (newConfig) {
  return Object.assign(config, newConfig);
};

module.exports = mock;
//# sourceMappingURL=index.js.map
