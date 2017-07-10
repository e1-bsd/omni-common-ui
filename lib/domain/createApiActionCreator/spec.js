'use strict';

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../Api', function () {
  return {
    fetch: function fetch(url) {
      return url;
    }
  };
});
jest.mock('../../containers/ApiCalls', function () {
  return {
    createAction: function createAction(param) {
      return param;
    }
  };
});

test('is a function', function () {
  expect(_is_js2.default.function(_2.default)).toBe(true);
});

describe('curry test', function () {
  test('returns a function if given an incomplete set of args', function () {
    expect(_is_js2.default.function((0, _2.default)('object'))).toBe(true);
  });

  test('returns a function accepting a single dispatch arg if given all args', function () {
    var satisfied = (0, _2.default)('object', 'url', 'method');
    expect(satisfied.length).toBe(1);
  });

  test('returns a function accepting a single dispatch arg if given an object arg', function () {
    var satisfied = (0, _2.default)({});
    expect(satisfied.length).toBe(1);
  });
});

test('makes us some actions', function () {
  var thunk = (0, _2.default)('object', 'url', 'method');
  thunk(function (fetchRequestAction) {
    expect(fetchRequestAction).toEqual({
      type: 'FETCH_OBJECT_REQUEST',
      url: 'url',
      method: 'method',
      payload: 'url'
    });
    return {
      payload: {
        then: function then() {
          return {
            catch: function _catch() {}
          };
        }
      }
    };
  });
});
//# sourceMappingURL=spec.js.map
