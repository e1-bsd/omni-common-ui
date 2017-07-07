'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNotificationsMiddleware = createNotificationsMiddleware;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _createApiActionCreator = require('./../createApiActionCreator');

var _createApiActionCreator2 = _interopRequireDefault(_createApiActionCreator);

var _Api = require('./../Api');

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _signalr = require('./signalr');

var _signalr2 = _interopRequireDefault(_signalr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STRATEGIES = {
  timer: _timer2.default,
  signalr: _signalr2.default
};

function createNotificationsMiddleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_is_js2.default.string(config.strategy), 'trigger strategy must be a string');
  (0, _invariant2.default)(_is_js2.default.object(config.dispatch), 'trigger dispatch must be an object');
  (0, _invariant2.default)(_is_js2.default.string(config.dispatch.apiUrl), 'dispatch apiUrl must be a string');

  var StrategyClass = STRATEGIES[config.strategy];
  (0, _invariant2.default)(!!StrategyClass, 'strategy must be valid (one of ' + Object.keys(STRATEGIES).toString() + ')');

  var emitter = void 0;

  return function (store) {
    return function (next) {
      return function (action) {
        var user = store.getState().get('singleSignOn').user || {};
        var accessToken = user.access_token;


        if (_is_js2.default.string(accessToken) && !emitter) {
          emitter = new StrategyClass(config, accessToken);

          emitter.on('notification', function () {
            var _config$dispatch = config.dispatch,
                method = _config$dispatch.method,
                apiUrl = _config$dispatch.apiUrl,
                disableDefault = _config$dispatch.disableDefault;


            var fullUrl = (0, _Api.buildUrl)(apiUrl);
            var actionExtras = disableDefault ? { disableDefault: true } : {};

            store.dispatch((0, _createApiActionCreator2.default)({
              actionObjectName: 'NOTIFICATIONS',
              url: fullUrl,
              method: method,
              requestExtras: actionExtras, // disableDefault in request, success, failure
              successExtras: actionExtras,
              failureExtras: actionExtras
            }));
          });

          _log2.default.info('Notification pull strategy: `' + config.strategy + '`');
        }

        return next(action);
      };
    };
  };
}

exports.default = createNotificationsMiddleware;
//# sourceMappingURL=index.js.map
