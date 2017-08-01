'use strict';

var _type = require('./type');

test('accepts default', function () {
  expect((0, _type.validateType)(_type.Type.default)).toBe(true);
});

test('accepts primary', function () {
  expect((0, _type.validateType)(_type.Type.primary)).toBe(true);
});

test('accepts defaultInverse', function () {
  expect((0, _type.validateType)(_type.Type.defaultInverse)).toBe(true);
});

test('accepts primaryInverse', function () {
  expect((0, _type.validateType)(_type.Type.primaryInverse)).toBe(true);
});

test('throws error if invalid type is passed', function () {
  expect(function () {
    return (0, _type.validateType)('faketype');
  }).toThrowError();
});
//# sourceMappingURL=validateType.spec.js.map
