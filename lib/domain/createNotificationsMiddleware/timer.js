'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerStrategy = undefined;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _strategy = require('./strategy');

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimerStrategy = exports.TimerStrategy = function (_Strategy) {
  _inherits(TimerStrategy, _Strategy);

  function TimerStrategy(config) {
    _classCallCheck(this, TimerStrategy);

    var _this = _possibleConstructorReturn(this, (TimerStrategy.__proto__ || Object.getPrototypeOf(TimerStrategy)).call(this, config));

    if (!_is_js2.default.number(config.intervalMs)) return _possibleConstructorReturn(_this);
    window.setInterval(function () {
      _this.emit('notification');
    }, config.intervalMs);
    return _this;
  }

  return TimerStrategy;
}(_strategy2.default);

exports.default = TimerStrategy;
//# sourceMappingURL=timer.js.map
