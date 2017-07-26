let log;
let Config;
let buildLogToRaven;

jest.mock('./buildLogToRaven', () => {
  const mock = jest.fn();
  return () => mock;
});

beforeEach(() => {
  jest.resetModules();
  global.console.error = jest.fn();
});

describe('when the config does not explicitly disable Sentry', () => {
  beforeEach(() => {
    buildLogToRaven = require('./buildLogToRaven');
    Config = require('domain/Config');
    log = require('./').default;
  });

  basicTests();

  test('uses the logger returned by buildLogToRaven', () => {
    log.error('an error');
    expect(buildLogToRaven()).toHaveBeenCalledWith('an error');
  });

  test('does not use the console', () => {
    log.error();
    expect(global.console.error).not.toHaveBeenCalled();
  });
});

describe('when the config explicitly disables Sentry', () => {
  beforeEach(() => {
    buildLogToRaven = require('./buildLogToRaven');
    Config = require('domain/Config');
    Config.set('sentry', { disabled: true });
    log = require('./').default;
  });

  basicTests();

  test('does not the logger returned by buildLogToRaven', () => {
    log.error('an error');
    expect(buildLogToRaven()).not.toHaveBeenCalled();
  });

  test('uses the console', () => {
    log.error();
    expect(global.console.error).toHaveBeenCalled();
  });
});

function basicTests() {
  test('is a class', () => {
    expect(log.prototype).toBeDefined();
  });

  testMethod('error');
  testMethod('info');
  testMethod('log');
  testMethod('warn');
  testMethod('debug');

  test('does not crash if there is no "console"', () => {
    const originalConsole = window.console;
    delete window.console;

    expect(() => log.debug('some text')).not.toThrowError();

    window.console = originalConsole;
  });

  function testMethod(method) {
    test(`has a "${method}" method`, () => {
      expect(typeof log[method]).toBe('function');
    });
  }
}
