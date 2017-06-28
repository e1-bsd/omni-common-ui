'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNotificationsMiddleware = createNotificationsMiddleware;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _createApiActionCreator = require('./../createApiActionCreator');

var _createApiActionCreator2 = _interopRequireDefault(_createApiActionCreator);

var _Api = require('./../Api');

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Strategy = function (_EventEmitter) {
  _inherits(Strategy, _EventEmitter);

  function Strategy(config) {
    _classCallCheck(this, Strategy);

    var _this = _possibleConstructorReturn(this, (Strategy.__proto__ || Object.getPrototypeOf(Strategy)).call(this));

    (0, _invariant2.default)(_is_js2.default.object(config), 'config must be an object');
    _this._config = config;
    if (!_is_js2.default.number(config.triggerOnStartAfterMs)) return _possibleConstructorReturn(_this);
    window.setTimeout(function () {
      _this.emit('notification');
    }, config.triggerOnStartAfterMs);
    return _this;
  }

  return Strategy;
}(_eventEmitter2.default);

var TimerStrategy = function (_Strategy) {
  _inherits(TimerStrategy, _Strategy);

  function TimerStrategy(config) {
    _classCallCheck(this, TimerStrategy);

    var _this2 = _possibleConstructorReturn(this, (TimerStrategy.__proto__ || Object.getPrototypeOf(TimerStrategy)).call(this, config));

    if (!_is_js2.default.number(config.intervalMs)) return _possibleConstructorReturn(_this2);
    window.setInterval(function () {
      _this2.emit('notification');
    }, config.intervalMs);
    return _this2;
  }

  return TimerStrategy;
}(Strategy);

var SignalRStrategy = function (_Strategy2) {
  _inherits(SignalRStrategy, _Strategy2);

  function SignalRStrategy(config) {
    _classCallCheck(this, SignalRStrategy);

    var _this3 = _possibleConstructorReturn(this, (SignalRStrategy.__proto__ || Object.getPrototypeOf(SignalRStrategy)).call(this, config));

    (0, _invariant2.default)(false, 'NOT IMPLEMENTED');
    return _this3;
  }

  return SignalRStrategy;
}(Strategy);

var STRATEGIES = {
  timer: TimerStrategy,
  signalr: SignalRStrategy
};

function createNotificationsMiddleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_is_js2.default.string(config.strategy), 'trigger strategy must be a string');
  (0, _invariant2.default)(_is_js2.default.object(config.dispatch), 'trigger dispatch must be an object');
  (0, _invariant2.default)(_is_js2.default.string(config.dispatch.requestActionType), 'dispatch requestActionType must be a string');
  (0, _invariant2.default)(_is_js2.default.string(config.dispatch.successActionType), 'dispatch successActionType must be a string');
  (0, _invariant2.default)(_is_js2.default.string(config.dispatch.failureActionType), 'dispatch failureActionType must be a string');
  (0, _invariant2.default)(_is_js2.default.string(config.dispatch.apiUrl), 'dispatch apiUrl must be a string');

  var StrategyClass = STRATEGIES[config.strategy];
  (0, _invariant2.default)(!!StrategyClass, 'strategy must be valid (one of ' + Object.keys(STRATEGIES).toString() + ')');

  return function (store) {
    var emitter = new StrategyClass(config);
    emitter.on('notification', function () {
      var _config$dispatch = config.dispatch,
          method = _config$dispatch.method,
          apiUrl = _config$dispatch.apiUrl;


      var fullUrl = (0, _Api.buildUrl)(apiUrl);

      store.dispatch((0, _createApiActionCreator2.default)('NOTIFICATIONS', fullUrl, method));
    });

    _log2.default.info('Pulling notifications using the `' + config.strategy + '` strategy');

    return function (next) {
      return function (action) {
        return next(action);
      };
    };
  };
}

exports.default = createNotificationsMiddleware;
//# sourceMappingURL=index.js.map
