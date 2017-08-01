'use strict';

var _ = require('./');

var _reduxLogger = require('redux-logger');

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('redux-logger', function () {
  return { createLogger: jest.fn() };
});
jest.mock('../log', function () {
  return { debug: jest.fn(), warn: jest.fn() };
});

beforeEach(function () {
  jest.resetAllMocks();
});

describe('when the config does not explicitly disable Sentry', function () {
  var next = void 0;

  beforeEach(function () {
    _Config2.default.remove('sentry');
    next = jest.fn();
  });

  test('does not use redux-logger', function () {
    (0, _.createLoggerMiddleware)();
    expect(_reduxLogger.createLogger).not.toHaveBeenCalled();
  });

  test('logs every action', function () {
    var action = 'some action';
    (0, _.createLoggerMiddleware)()()(next)(action);
    expect(_log2.default.debug).toHaveBeenCalledWith('Dispatched action:', '"' + action + '"');
    expect(next).toHaveBeenCalledWith(action);
  });

  test('logs error if an action cannot be logged', function () {
    // This creates a circular object, so that JSON.stringify() crashes
    var action = { obj2: { obj1: undefined } };
    action.obj2.obj1 = action;

    (0, _.createLoggerMiddleware)()()(next)(action);
    expect(_log2.default.warn).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });
});

describe('when the config explicitly disables Sentry', function () {
  beforeEach(function () {
    _Config2.default.set('sentry', { disabled: true });
  });

  test('uses redux-logger directly', function () {
    (0, _.createLoggerMiddleware)();
    expect(_reduxLogger.createLogger).toHaveBeenCalled();
  });
});
//# sourceMappingURL=spec.js.map
