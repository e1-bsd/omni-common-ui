
/* eslint-disable global-require */
import testClass from './';

jest.mock('domain/Config', () => {
  const { Map } = require('immutable');
  return new Map({ enableTestClasses: true });
});

test('throws an error if the given class contains unacceptable characters', () => {
  expect(() => testClass('my thing')).toThrowError();
});

test('does not throw if the given class is okay', () => {
  expect(() => testClass('my-thing-5')).not.toThrowError();
});
