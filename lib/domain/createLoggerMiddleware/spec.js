'use strict';

var _ = require('./');

var _reduxLogger = require('redux-logger');

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

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

describe('when PRODUCTION=true', function () {
  var next = void 0;

  beforeEach(function () {
    global.PRODUCTION = true;
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

describe('when PRODUCTION=false', function () {
  beforeEach(function () {
    global.PRODUCTION = false;
  });

  test('uses redux-logger directly', function () {
    (0, _.createLoggerMiddleware)();
    expect(_reduxLogger.createLogger).toHaveBeenCalled();
  });
});
//# sourceMappingURL=spec.js.map
