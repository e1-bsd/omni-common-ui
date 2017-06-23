'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createNotificationsMiddleware = createNotificationsMiddleware;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _createApiActionBoilerplate = require('./../createApiActionBoilerplate');

var _createApiActionBoilerplate2 = _interopRequireDefault(_createApiActionBoilerplate);

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
    if (config.triggerOnStart) {
      _this._trigger();
    }
    return _this;
  }

  _createClass(Strategy, [{
    key: '_trigger',
    value: function _trigger() {
      this.emit('notification');
    }
  }]);

  return Strategy;
}(_eventEmitter2.default);

var TimerStrategy = function (_Strategy) {
  _inherits(TimerStrategy, _Strategy);

  function TimerStrategy(config) {
    _classCallCheck(this, TimerStrategy);

    var _this2 = _possibleConstructorReturn(this, (TimerStrategy.__proto__ || Object.getPrototypeOf(TimerStrategy)).call(this, config));

    if (!_is_js2.default.number(config.intervalMs)) return _possibleConstructorReturn(_this2);
    window.setInterval(function () {
      _get(TimerStrategy.prototype.__proto__ || Object.getPrototypeOf(TimerStrategy.prototype), '_trigger', _this2).call(_this2);
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
          requestActionType = _config$dispatch.requestActionType,
          successActionType = _config$dispatch.successActionType,
          failureActionType = _config$dispatch.failureActionType,
          method = _config$dispatch.method,
          apiUrl = _config$dispatch.apiUrl;


      var fullUrl = (0, _Api.buildUrl)(apiUrl);

      store.dispatch((0, _createApiActionBoilerplate2.default)(requestActionType, successActionType, failureActionType)(fullUrl, method));
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
