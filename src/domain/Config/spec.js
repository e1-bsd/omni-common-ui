import { Map } from 'immutable';

let Config;

beforeEach(() => {
  jest.resetModules();
  global.__CONFIG__ = { someProp: 'some value' };
  Config = require.requireActual('./').default;
});

test('returns an immutable Map', () => {
  expect(Map.isMap(Config)).toBe(true);
});

test('returns a map containing the properties in the global variable __CONFIG__', () => {
  expect(Config.get('someProp')).toBe('some value');
});
