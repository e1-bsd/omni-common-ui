'use strict';

var Store = void 0;

beforeEach(function () {
  jest.resetModules();
  Store = require('./index').default;
});

test('#get() returns null by default', function () {
  expect(Store.get()).toBe(null);
});

test('allows setting the store and getting it back later', function () {
  var fakeStore = {};
  Store.set(fakeStore);
  expect(Store.get()).toBe(fakeStore);
});

test('throws if the store is set more than once', function () {
  Store.set('a store');
  expect(function () {
    return Store.set('another store');
  }).toThrow();
});
//# sourceMappingURL=spec.js.map
