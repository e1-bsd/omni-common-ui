'use strict';

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('log', function () {
  it('is a class', function () {
    (0, _chai.expect)(_2.default.prototype).to.exist;
  });

  testMethod('error');
  testMethod('info');
  testMethod('log');
  testMethod('warn');
  testMethod('debug');

  it('does not crash if there is no "console"', function () {
    var originalConsole = window.console;
    delete window.console;

    (0, _chai.expect)(function () {
      return _2.default.debug('some text');
    }).to.not.throw();

    window.console = originalConsole;
  });

  function testMethod(method) {
    it('has a "' + method + '" method', function () {
      (0, _chai.expect)(_2.default[method]).to.be.a('function');
    });
  }
});
//# sourceMappingURL=spec.js.map
