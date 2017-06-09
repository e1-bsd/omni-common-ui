'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('is a class', function () {
  expect(_2.default.prototype).toBeDefined();
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
    return _2.default.debug('some text');
  }).not.toThrowError();

  window.console = originalConsole;
});

function testMethod(method) {
  test('has a "' + method + '" method', function () {
    expect(_typeof(_2.default[method])).toBe('function');
  });
}
//# sourceMappingURL=spec.js.map
