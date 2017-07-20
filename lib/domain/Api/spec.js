'use strict';

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('../Store', function () {
  return {
    get: function get() {
      // eslint-disable-next-line no-shadow
      var _require = require('immutable'),
          fromJS = _require.fromJS;

      return { getState: function getState() {
          return fromJS({ singleSignOn: { user: { access_token: 'TOKEN' } } });
        } };
    }
  };
});
jest.mock('isomorphic-fetch', function () {
  return global.fetch;
});

beforeEach(function () {
  jest.resetModules();
  _isomorphicFetch2.default.resetMocks();
  _isomorphicFetch2.default.mockResponse(JSON.stringify({ foo: 'bar' }), { status: 200 });
});

describe('#buildUrl', function () {
  test('appends its parameter to Config.apiBase', function () {
    require('../Config').merge({ apiBase: 'http://host/api' });

    var _require2 = require('./'),
        buildUrl = _require2.buildUrl;

    expect(buildUrl('/somePath')).toBe('http://host/api/somePath');
  });
});

describe('#fetch', function () {
  describe('includeBearerTokenInApiGetUrls=undefined', function () {
    test('calls isomorphicFetch with the expected parameters', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var _require3, fetch;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expect.assertions(2);
              _require3 = require('./'), fetch = _require3.fetch;
              _context.prev = 2;
              _context.next = 5;
              return fetch('https://domain/somePath');

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](2);
              throw _context.t0;

            case 10:
              expect(_isomorphicFetch2.default).toHaveBeenCalled();
              expect(_isomorphicFetch2.default.mock.calls[0]).toEqual(['https://domain/somePath', {
                headers: {
                  Accept: 'application/json; charset=utf-8',
                  Authorization: 'Bearer TOKEN'
                }
              }]);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 7]]);
    })));
  });

  describe('includeBearerTokenInApiGetUrls=true', function () {
    var fetch = void 0;

    beforeEach(function () {
      require('../Config').merge({ includeBearerTokenInApiGetUrls: true });
      fetch = require('./').fetch;
    });

    test('calls isomorphicFetch with the expected parameters (non-https)', function () {
      fetch('http://domain/somePath');
      expect(_isomorphicFetch2.default).toHaveBeenCalled();
      expect(_isomorphicFetch2.default.mock.calls[0]).toEqual(['http://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8'
        }
      }]);
    });

    test('calls isomorphicFetch with the expected parameters', function () {
      fetch('https://domain/somePath');
      expect(_isomorphicFetch2.default).toHaveBeenCalled();
      expect(_isomorphicFetch2.default.mock.calls[0]).toEqual(['https://domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8'
        }
      }]);
    });

    test('calls isomorphicFetch with the expected parameters (same scheme)', function () {
      fetch('//domain/somePath');
      expect(_isomorphicFetch2.default).toHaveBeenCalled();
      expect(_isomorphicFetch2.default.mock.calls[0]).toEqual(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8'
        }
      }]);
    });

    test('calls isomorphicFetch with the expected parameters (PUT)', function () {
      fetch('//domain/somePath', { method: 'PUT' });
      expect(_isomorphicFetch2.default).toHaveBeenCalled();
      expect(_isomorphicFetch2.default.mock.calls[0]).toEqual(['//domain/somePath?bearer_token=TOKEN', {
        method: 'PUT',
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json'
        }
      }]);
    });

    test('calls isomorphicFetch with the expected parameters (custom headers)', function () {
      fetch('//domain/somePath', { headers: { 'X-Custom-Header': 'Content' } });
      expect(_isomorphicFetch2.default).toHaveBeenCalled();
      expect(_isomorphicFetch2.default.mock.calls[0]).toEqual(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'X-Custom-Header': 'Content'
        }
      }]);
    });
  });
});
//# sourceMappingURL=spec.js.map
