/* eslint-disable global-require */

jest.mock('./userManager', () => null);
jest.mock('./SingleSignOnHandler');
jest.mock('redux-oidc', () => jest.fn());
jest.mock('domain/Config');

let createOidcMiddleware;
let Config;

beforeEach(() => {
  jest.resetModules();
  createOidcMiddleware = require('redux-oidc');
  Config = require('domain/Config');
});

test('exports the oidc middleware if featureLogin is true', () => {
  Config.merge({ featureLogin: true });
  require('./');
  expect(createOidcMiddleware).toHaveBeenCalledTimes(1);
});

test('exports a fake oidc middleware if featureLogin is not true', () => {
  Config.merge({ featureLogin: false });
  require('./');
  expect(createOidcMiddleware).not.toHaveBeenCalled();
});
