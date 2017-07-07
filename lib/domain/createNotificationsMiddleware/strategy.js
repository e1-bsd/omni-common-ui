'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strategy = undefined;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Strategy = exports.Strategy = function (_EventEmitter) {
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

exports.default = Strategy;
//# sourceMappingURL=strategy.js.map
