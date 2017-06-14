const config = {};
const BASE_CONFIG = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  matches: false,
};

Object.assign(config, BASE_CONFIG);

const mock = jest.fn(() => config);
mock.updateConfig = (newConfig) => Object.assign(config, newConfig);

module.exports = mock;
