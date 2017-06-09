'use strict';

jest.mock('./userManager');
jest.mock('./SingleSignOnHandler');
jest.mock('redux-oidc', function () {
  return jest.fn();
});

var createOidcMiddleware = void 0;
var Config = void 0;

beforeEach(function () {
  jest.resetModules();
  createOidcMiddleware = require('redux-oidc');
  Config = require('../../domain/Config');
});

test('exports the oidc middleware if featureLogin is true', function () {
  Config.merge({ featureLogin: true });
  require('./');
  expect(createOidcMiddleware).toHaveBeenCalledTimes(1);
});

test('exports a fake oidc middleware if featureLogin is not true', function () {
  Config.merge({ featureLogin: false });
  require('./');
  expect(createOidcMiddleware).not.toHaveBeenCalled();
});
//# sourceMappingURL=spec.js.map
