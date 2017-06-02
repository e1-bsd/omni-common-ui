'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

describe('testClass', function () {
  var testClass = void 0;

  beforeEach(function () {
    // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
    testClass = require('inject-loader?domain/Config!./')({
      'domain/Config': new _immutable.Map({ enableTestClasses: true })
    }).default;
  });

  it('throws an error if the given class contains unacceptable characters', function () {
    (0, _chai.expect)(function () {
      return testClass('my thing');
    }).to.throw();
  });

  it('does not throw if the given class is okay', function () {
    (0, _chai.expect)(function () {
      return testClass('my-thing-5');
    }).to.not.throw();
  });
});
//# sourceMappingURL=spec.js.map
