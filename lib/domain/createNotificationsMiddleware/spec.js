'use strict';

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _immutable = require('immutable');

var _ = require('./');

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../createApiActionCreator');
jest.mock('../Config', function () {
  var config = require('../Config/__mocks__');
  return config.set('apiBase', '/api/');
});
jest.mock('./timer', function () {
  var EventEmitter = require('event-emitter');
  var instance = void 0;
  return function () {
    return instance || (instance = new EventEmitter());
  }; // eslint-disable-line no-return-assign
});

test('is a function', function () {
  expect(_is_js2.default.function(_.createNotificationsMiddleware)).toBe(true);
});

test('returns a function', function () {
  var config = {
    strategy: 'timer',
    dispatch: {
      requestActionType: 'w',
      successActionType: 'x',
      failureActionType: 'y',
      apiUrl: 'z'
    }
  };
  expect(_is_js2.default.function((0, _.createNotificationsMiddleware)(config))).toBe(true);
});

test('throws an error when given strategy does not exist', function () {
  expect(function () {
    var config = {
      strategy: '_non_existent_',
      dispatch: {
        requestActionType: 'w',
        successActionType: 'x',
        failureActionType: 'y',
        apiUrl: 'z'
      }
    };
    (0, _.createNotificationsMiddleware)(config);
  }).toThrow();
});

test('throws an error when a required config param failed validation', function () {
  expect(function () {
    var config = {
      strategy: 'timer',
      intervalMs: null,
      dispatch: {}
    };
    (0, _.createNotificationsMiddleware)(config);
  }).toThrow();
});

describe('action dispatch', function () {
  test('dispatches action on start when enabled', function (done) {
    var dispatch = {
      apiUrl: 'path',
      method: 'METHOD'
    };
    var config = {
      strategy: 'timer',
      intervalMs: 10000,
      dispatch: dispatch
    };
    var middleware = (0, _.createNotificationsMiddleware)(config);
    middleware({
      getState: function getState() {
        return (0, _immutable.fromJS)({
          singleSignOn: {
            user: {
              access_token: 'access_token'
            }
          }
        });
      },
      dispatch: function dispatch(arg) {
        expect(arg).toEqual({
          actionObjectName: 'NOTIFICATIONS',
          url: '/api/path',
          method: 'METHOD',
          requestExtras: {},
          successExtras: {},
          failureExtras: {}
        });
        done();
      }
    })(function () {})();
    var mockTimer = new _timer2.default();
    mockTimer.emit('notification');
  });

  test('dispatches action on start (disableDefault: true)', function (done) {
    var dispatch = {
      apiUrl: 'path',
      method: 'METHOD',
      disableDefault: true
    };
    var config = {
      strategy: 'timer',
      intervalMs: 10000,
      dispatch: dispatch
    };
    var middleware = (0, _.createNotificationsMiddleware)(config);
    middleware({
      getState: function getState() {
        return (0, _immutable.fromJS)({
          singleSignOn: {
            user: {
              access_token: 'access_token'
            }
          }
        });
      },
      dispatch: function dispatch(arg) {
        expect(arg).toEqual({
          actionObjectName: 'NOTIFICATIONS',
          url: '/api/path',
          method: 'METHOD',
          requestExtras: { disableDefault: true },
          successExtras: { disableDefault: true },
          failureExtras: { disableDefault: true }
        });
        done();
      }
    })(function () {})();
    var mockTimer = new _timer2.default();
    mockTimer.emit('notification');
  });
});
//# sourceMappingURL=spec.js.map
