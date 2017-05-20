'use strict';

var _Config2 = require('./../../domain/Config');

var _Config3 = _interopRequireDefault(_Config2);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SingleSignOn', function () {
  var createOidcMiddleware = void 0;

  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  var requireMiddleware = function requireMiddleware(Config) {
    return require('inject?domain/Config&redux-oidc!./')({
      'domain/Config': _Config3.default.merge(Config),
      'redux-oidc': createOidcMiddleware
    });
  };

  beforeEach(function () {
    createOidcMiddleware = _sinon2.default.spy();
  });

  it('exports the oidc middleware if featureLogin is true', function () {
    requireMiddleware({ featureLogin: true });
    (0, _chai.expect)(createOidcMiddleware.called).to.be.true;
  });

  it('exports a fake oidc middleware if featureLogin is not true', function () {
    requireMiddleware({ featureLogin: false });
    (0, _chai.expect)(createOidcMiddleware.called).to.be.false;
  });
});
//# sourceMappingURL=spec.js.map
