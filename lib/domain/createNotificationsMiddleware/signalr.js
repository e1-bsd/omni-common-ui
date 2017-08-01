'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalRStrategy = undefined;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _signalrNoJquery = require('signalr-no-jquery');

var _log2 = require('./../log');

var _log3 = _interopRequireDefault(_log2);

var _strategy = require('./strategy');

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _log = function _log(line) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';

  _log3.default[method]('SignalRStrategy: ' + line);
};

var SignalRStrategy = exports.SignalRStrategy = function (_Strategy) {
  _inherits(SignalRStrategy, _Strategy);

  function SignalRStrategy(config, accessToken) {
    _classCallCheck(this, SignalRStrategy);

    var _this = _possibleConstructorReturn(this, (SignalRStrategy.__proto__ || Object.getPrototypeOf(SignalRStrategy)).call(this, config));

    (0, _invariant2.default)(_is_js2.default.string(config.hubUrl), 'hubUrl must be a string in config');
    (0, _invariant2.default)(_is_js2.default.string(config.hubName), 'hubName must be a string in config');
    (0, _invariant2.default)(_is_js2.default.string(config.incomingMethodName), 'incomingMethodName must be a string in config');

    var hubUrl = config.hubUrl.replace('{token}', accessToken);

    _this.connection = (0, _signalrNoJquery.hubConnection)(hubUrl, {
      qs: { bearer_token: accessToken }
    });

    _this.hubProxy = _this.connection.createHubProxy(config.hubName);
    _this.hubProxy.on(config.incomingMethodName, function () {
      _log('Push notification received.');
      _this.emit('notification');
    });

    _this.connection.start().done(function () {
      _log('Connected to hub; waiting for notifications.');
    }).fail(function () {
      _log('Unable to connect to the hub!', 'warn');
    });
    return _this;
  }

  return SignalRStrategy;
}(_strategy2.default);

exports.default = SignalRStrategy;
//# sourceMappingURL=signalr.js.map
