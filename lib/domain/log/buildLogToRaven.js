'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLogToRaven;

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _sprintfJs = require('sprintf-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function buildLogToRaven(level) {
  if (level === 'error') {
    return function () {
      if (arguments.length === 1 && (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error) {
        return _ravenJs2.default.captureException(arguments.length <= 0 ? undefined : arguments[0], { level: level });
      }

      return _ravenJs2.default.captureMessage(buildErrorMessage.apply(undefined, arguments), { level: level });
    };
  }

  return function () {
    return _ravenJs2.default.captureBreadcrumb({
      message: buildErrorMessage.apply(undefined, arguments),
      level: level === 'warn' ? level : 'info'
    });
  };
}

function buildErrorMessage() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var parsedArgs = args.map(function (item) {
    return item instanceof Error ? item.stack : item;
  });
  if (/%[bcdieufgosxXj]( |$)/.test(args[0])) {
    return _sprintfJs.sprintf.apply(undefined, _toConsumableArray(parsedArgs));
  }

  return parsedArgs.join(' ');
}
//# sourceMappingURL=buildLogToRaven.js.map
