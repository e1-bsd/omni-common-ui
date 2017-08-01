'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var log = void 0;
var Config = void 0;
var buildLogToRaven = void 0;

jest.mock('./buildLogToRaven', function () {
  var mock = jest.fn();
  return function () {
    return mock;
  };
});

beforeEach(function () {
  jest.resetModules();
  global.console.error = jest.fn();
});

describe('when the config does not explicitly disable Sentry', function () {
  beforeEach(function () {
    buildLogToRaven = require('./buildLogToRaven');
    Config = require('../Config');
    log = require('./').default;
  });

  basicTests();

  test('uses the logger returned by buildLogToRaven', function () {
    log.error('an error');
    expect(buildLogToRaven()).toHaveBeenCalledWith('an error');
  });

  test('does not use the console', function () {
    log.error();
    expect(global.console.error).not.toHaveBeenCalled();
  });
});

describe('when the config explicitly disables Sentry', function () {
  beforeEach(function () {
    buildLogToRaven = require('./buildLogToRaven');
    Config = require('../Config');
    Config.set('sentry', { disabled: true });
    log = require('./').default;
  });

  basicTests();

  test('does not the logger returned by buildLogToRaven', function () {
    log.error('an error');
    expect(buildLogToRaven()).not.toHaveBeenCalled();
  });

  test('uses the console', function () {
    log.error();
    expect(global.console.error).toHaveBeenCalled();
  });
});

function basicTests() {
  test('is a class', function () {
    expect(log.prototype).toBeDefined();
  });

  testMethod('error');
  testMethod('info');
  testMethod('log');
  testMethod('warn');
  testMethod('debug');

  test('does not crash if there is no "console"', function () {
    var originalConsole = window.console;
    delete window.console;

    expect(function () {
      return log.debug('some text');
    }).not.toThrowError();

    window.console = originalConsole;
  });

  function testMethod(method) {
    test('has a "' + method + '" method', function () {
      expect(_typeof(log[method])).toBe('function');
    });
  }
}
//# sourceMappingURL=spec.js.map
