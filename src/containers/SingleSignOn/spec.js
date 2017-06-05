/* eslint-disable global-require */

import { Map } from 'immutable';
import * as ConfigPkg from 'domain/Config';
import * as OidcPkg from 'redux-oidc';

jest.mock('./userManager', () => 'userManager');
jest.mock('./SingleSignOnHandler', () => 'SingleSignOnHandler');

beforeEach(() => {
  OidcPkg.default = jest.fn();
});

test('exports the oidc middleware if featureLogin is true', () => {
  ConfigPkg.default = new Map({ featureLogin: true });
  require('./');
  expect(OidcPkg.default).toHaveBeenCalledTimes(1);
});

test('exports a fake oidc middleware if featureLogin is not true', () => {
  ConfigPkg.default = new Map({ featureLogin: false });
  require('./');
  expect(OidcPkg.default).not.toHaveBeenCalled();
});
