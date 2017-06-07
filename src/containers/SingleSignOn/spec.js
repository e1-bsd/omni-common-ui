/* eslint-disable global-require */

import { Map } from 'immutable';
import * as ConfigPkg from 'domain/Config';
import createOidcMiddleware from 'redux-oidc';

jest.mock('./userManager');
jest.mock('./SingleSignOnHandler');
jest.mock('redux-oidc', () => jest.fn());

beforeEach(() => {
  jest.resetModules();
});

test('exports the oidc middleware if featureLogin is true', () => {
  ConfigPkg.default = new Map({ featureLogin: true });
  require('./');
  expect(createOidcMiddleware).toHaveBeenCalledTimes(1);
});

test('exports a fake oidc middleware if featureLogin is not true', () => {
  ConfigPkg.default = new Map({ featureLogin: false });
  require('./');
  expect(createOidcMiddleware).not.toHaveBeenCalled();
});
