'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLoggerMiddleware = createLoggerMiddleware;

var _reduxLogger = require('redux-logger');

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createLoggerMiddleware() {
  var sentry = _Config2.default.get('sentry');
  if (sentry && sentry.disabled === true) {
    return (0, _reduxLogger.createLogger)();
  }

  return function () {
    return function (next) {
      return function (action) {
        try {
          _log2.default.debug('Dispatched action:', JSON.stringify(action, null, 2));
        } catch (e) {
          _log2.default.warn('Could not log action:', e);
        }

        return next(action);
      };
    };
  };
}

exports.default = createLoggerMiddleware;
//# sourceMappingURL=index.js.map
