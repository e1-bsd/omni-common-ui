'use strict';

var _immutable = require('immutable');

var Config = void 0;

beforeEach(function () {
  jest.resetModules();
  global.__CONFIG__ = { someProp: 'some value' };
  Config = require.requireActual('./').default;
});

test('returns an immutable Map', function () {
  expect(_immutable.Map.isMap(Config)).toBe(true);
});

test('returns a map containing the properties in the global variable __CONFIG__', function () {
  expect(Config.get('someProp')).toBe('some value');
});
//# sourceMappingURL=spec.js.map
