'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPerf = require('react-addons-perf');

var _reactAddonsPerf2 = _interopRequireDefault(_reactAddonsPerf);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PerformanceProfiler = function (_React$Component) {
  _inherits(PerformanceProfiler, _React$Component);

  function PerformanceProfiler(props) {
    _classCallCheck(this, PerformanceProfiler);

    var _this = _possibleConstructorReturn(this, (PerformanceProfiler.__proto__ || Object.getPrototypeOf(PerformanceProfiler)).call(this, props));

    _this.state = { started: false };
    return _this;
  }

  _createClass(PerformanceProfiler, [{
    key: 'toggle',
    value: function toggle() {
      var started = this.state.started;

      started ? _reactAddonsPerf2.default.stop() : _reactAddonsPerf2.default.start();
      this.setState({ started: !started });
    }
  }, {
    key: 'printWasted',
    value: function printWasted() {
      var lastMeasurements = _reactAddonsPerf2.default.getLastMeasurements();
      _reactAddonsPerf2.default.printWasted(lastMeasurements);
    }
  }, {
    key: 'printOperations',
    value: function printOperations() {
      var lastMeasurements = _reactAddonsPerf2.default.getLastMeasurements();
      _reactAddonsPerf2.default.printOperations(lastMeasurements);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var started = this.state.started;

      return _react2.default.createElement(
        'div',
        { className: _style2.default.PerformanceProfiler },
        _react2.default.createElement(
          _Button2.default,
          { className: _style2.default.PerformanceProfiler_button,
            onClick: function onClick() {
              return _this2.toggle();
            },
            type: _Button2.default.Type.primary },
          _react2.default.createElement(_Icon2.default, { className: _style2.default.PerformanceProfiler_button_icon,
            id: started ? 'cross' : 'magnifying-glass' })
        ),
        _react2.default.createElement(
          _Button2.default,
          { className: _style2.default.PerformanceProfiler_button,
            onClick: function onClick() {
              return _this2.printWasted();
            },
            type: _Button2.default.Type.default },
          _react2.default.createElement(_Icon2.default, { className: _style2.default.PerformanceProfiler_button_icon,
            id: 'clock' })
        ),
        _react2.default.createElement(
          _Button2.default,
          { className: _style2.default.PerformanceProfiler_button,
            onClick: function onClick() {
              return _this2.printOperations();
            },
            type: _Button2.default.Type.default },
          _react2.default.createElement(_Icon2.default, { className: _style2.default.PerformanceProfiler_button_icon,
            id: 'organisation' })
        )
      );
    }
  }]);

  return PerformanceProfiler;
}(_react2.default.Component);

exports.default = PerformanceProfiler;
//# sourceMappingURL=index.js.map
