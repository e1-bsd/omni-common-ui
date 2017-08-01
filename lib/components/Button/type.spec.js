'use strict';

var _type = require('./type');

test('has default', function () {
  expect(_type.Type.default).toBeDefined();
});

test('has primary', function () {
  expect(_type.Type.primary).toBeDefined();
});

test('has defaultInverse', function () {
  expect(_type.Type.defaultInverse).toBeDefined();
});

test('has primaryInverse', function () {
  expect(_type.Type.primaryInverse).toBeDefined();
});
//# sourceMappingURL=type.spec.js.map
