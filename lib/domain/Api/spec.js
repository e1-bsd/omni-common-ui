'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Api', function () {
  var isomorphicFetch = void 0;

  var importDeps = function importDeps() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // eslint-disable-next-line global-require,import/no-webpack-loader-syntax
    var imports = require('inject-loader?isomorphic-fetch&domain/Config&domain/Store!./')({
      'isomorphic-fetch': isomorphicFetch = _sinon2.default.spy(),
      'domain/Config': new _immutable.Map(config),
      'domain/Store': {
        get: function get() {
          return {
            getState: function getState() {
              return new _immutable.Map({ singleSignOn: { user: { access_token: 'TOKEN' } } });
            }
          };
        }
      }
    });
    return {
      buildUrl: imports.buildUrl,
      fetch: imports.fetch
    };
  };

  describe('#buildUrl', function () {
    it('appends its parameter to Config.apiBase', function () {
      var _importDeps = importDeps({ apiBase: 'http://host/api' }),
          buildUrl = _importDeps.buildUrl;

      (0, _chai.expect)(buildUrl('/somePath')).to.equal('http://host/api/somePath');
    });
  });

  describe('#fetch', function () {
    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=undefined)', function () {
      var _importDeps2 = importDeps(),
          fetch = _importDeps2.fetch;

      fetch('https://domain/somePath');
      (0, _chai.expect)(isomorphicFetch.called).to.be.true;
      (0, _chai.expect)(isomorphicFetch.args[0]).to.eql(['https://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          Authorization: 'Bearer TOKEN'
        }
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, non-https)', function () {
      var _importDeps3 = importDeps({ includeBearerTokenInApiGetUrls: true }),
          fetch = _importDeps3.fetch;

      fetch('http://domain/somePath');
      (0, _chai.expect)(isomorphicFetch.called).to.be.true;
      (0, _chai.expect)(isomorphicFetch.args[0]).to.eql(['http://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8'
        }
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true)', function () {
      var _importDeps4 = importDeps({ includeBearerTokenInApiGetUrls: true }),
          fetch = _importDeps4.fetch;

      fetch('https://domain/somePath');
      (0, _chai.expect)(isomorphicFetch.called).to.be.true;
      (0, _chai.expect)(isomorphicFetch.args[0]).to.eql(['https://domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8'
        }
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, same scheme)', function () {
      var _importDeps5 = importDeps({ includeBearerTokenInApiGetUrls: true }),
          fetch = _importDeps5.fetch;

      fetch('//domain/somePath');
      (0, _chai.expect)(isomorphicFetch.called).to.be.true;
      (0, _chai.expect)(isomorphicFetch.args[0]).to.eql(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8'
        }
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, PUT)', function () {
      var _importDeps6 = importDeps({ includeBearerTokenInApiGetUrls: true }),
          fetch = _importDeps6.fetch;

      fetch('//domain/somePath', { method: 'PUT' });
      (0, _chai.expect)(isomorphicFetch.called).to.be.true;
      (0, _chai.expect)(isomorphicFetch.args[0]).to.eql(['//domain/somePath?bearer_token=TOKEN', {
        method: 'PUT',
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json'
        }
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, custom headers)', function () {
      var _importDeps7 = importDeps({ includeBearerTokenInApiGetUrls: true }),
          fetch = _importDeps7.fetch;

      fetch('//domain/somePath', { headers: { 'X-Custom-Header': 'Content' } });
      (0, _chai.expect)(isomorphicFetch.called).to.be.true;
      (0, _chai.expect)(isomorphicFetch.args[0]).to.eql(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'X-Custom-Header': 'Content'
        }
      }]);
    });
  });
});
//# sourceMappingURL=spec.js.map
