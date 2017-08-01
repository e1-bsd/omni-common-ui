'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _buildLogToRaven = require('./buildLogToRaven');

var _buildLogToRaven2 = _interopRequireDefault(_buildLogToRaven);

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = function log() {
  _classCallCheck(this, log);
};

var methods = ['error', 'info', 'log', 'warn', 'debug'];

methods.forEach(function (method) {
  log[method] = buildLogMethod(method); // eslint-disable-line no-param-reassign
});

function buildLogMethod(method) {
  var sentry = _Config2.default.get('sentry');
  if (sentry && sentry.disabled === true) {
    return function () {
      /* eslint-disable no-console */
      if (window.console && console[method]) {
        var _console;

        return (_console = console)[method].apply(_console, arguments);
      }
      /* eslint-enable no-console */
    };
  }

  var logToRaven = (0, _buildLogToRaven2.default)(method);
  return function () {
    return logToRaven.apply(undefined, arguments);
  };
}

exports.default = log;
//# sourceMappingURL=index.js.map
