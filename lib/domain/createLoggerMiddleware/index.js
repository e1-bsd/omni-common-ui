'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLoggerMiddleware = createLoggerMiddleware;

var _reduxLogger = require('redux-logger');

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createLoggerMiddleware() {
  if (PRODUCTION) {
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

  return (0, _reduxLogger.createLogger)();
}

exports.default = createLoggerMiddleware;
//# sourceMappingURL=index.js.map
