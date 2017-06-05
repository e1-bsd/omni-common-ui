/* eslint-disable global-require */

import { Map } from 'immutable';
import * as ConfigPkg from 'domain/Config';
import * as OidcPkg from 'redux-oidc';

test('exports the oidc middleware if featureLogin is true', () => {
  ConfigPkg.default = new Map({ featureLogin: true });
  OidcPkg.default = jest.fn();
  require('./');
  expect(OidcPkg.default.mock.calls.length).toBe(1);
});

test('exports a fake oidc middleware if featureLogin is not true', () => {
  ConfigPkg.default = new Map({ featureLogin: false });
  OidcPkg.default = jest.fn();
  require('./');
  expect(OidcPkg.default.mock.calls.length).toBe(0);
});
