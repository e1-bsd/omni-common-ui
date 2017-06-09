'use strict';

var testClass = void 0;

beforeEach(function () {
  jest.resetModules();
  require('../Config').merge({ enableTestClasses: true });
  testClass = require('./').default;
});

test('throws an error if the given class contains unacceptable characters', function () {
  expect(function () {
    return testClass('my thing');
  }).toThrowError();
});

test('does not throw if the given class is okay', function () {
  expect(function () {
    return testClass('my-thing-5');
  }).not.toThrowError();
});
//# sourceMappingURL=spec.js.map
