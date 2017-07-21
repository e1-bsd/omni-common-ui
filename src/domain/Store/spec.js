let Store;

beforeEach(() => {
  jest.resetModules();
  Store = require('domain/Store').default;
});

test('#get() returns null by default', () => {
  expect(Store.get()).toBe(null);
});

test('allows setting the store and getting it back later', () => {
  const fakeStore = {};
  Store.set(fakeStore);
  expect(Store.get()).toBe(fakeStore);
});

test('throws if the store is set more than once', () => {
  Store.set('a store');
  expect(() => Store.set('another store')).toThrow();
});
