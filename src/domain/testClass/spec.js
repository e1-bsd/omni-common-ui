let testClass;

beforeEach(() => {
  jest.resetModules();
  require('domain/Config').merge({ enableTestClasses: true });
  testClass = require('./').default;
});

test('throws an error if the given class contains unacceptable characters', () => {
  expect(() => testClass('my thing')).toThrowError();
});

test('does not throw if the given class is okay', () => {
  expect(() => testClass('my-thing-5')).not.toThrowError();
});
