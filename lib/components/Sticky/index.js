'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sticky = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHECK_SAME_HEIGHT_MAX = 5;

var Sticky = exports.Sticky = function (_Component) {
  _inherits(Sticky, _Component);

  function Sticky(props) {
    _classCallCheck(this, Sticky);

    var _this = _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call(this, props));

    _this.state = { sticky: false };
    _this._onWheel = _this._onWheel.bind(_this);
    _this._checkHeight = _this._checkHeight.bind(_this);
    return _this;
  }

  _createClass(Sticky, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('wheel', this._onWheel);
      window.addEventListener('touchmove', this._onWheel);
      window.addEventListener('scroll', this._onWheel);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._startPeriodicCheck();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._stopPeriodicCheck();
      window.removeEventListener('wheel', this._onWheel);
      window.removeEventListener('touchmove', this._onWheel);
      window.removeEventListener('scroll', this._onWheel);
    }
  }, {
    key: '_onWheel',
    value: function _onWheel() {
      var shouldBeSticky = this._container.getBoundingClientRect().top < 0;
      if (!this.state.sticky && shouldBeSticky) {
        this.setState({ sticky: true });
      } else if (this.state.sticky && !shouldBeSticky) {
        this.setState({ sticky: false });
      }
    }
  }, {
    key: '_startPeriodicCheck',
    value: function _startPeriodicCheck() {
      this._stopPeriodicCheck();
      this._sameHeightCount = 0;
      this._periodicCheckId = setInterval(this._checkHeight, 25);
    }
  }, {
    key: '_stopPeriodicCheck',
    value: function _stopPeriodicCheck() {
      clearInterval(this._periodicCheckId);
    }
  }, {
    key: '_checkHeight',
    value: function _checkHeight() {
      _log2.default.debug('Sticky - _checkHeight()');
      if (this._sameHeightCount > CHECK_SAME_HEIGHT_MAX) {
        return this._stopPeriodicCheck();
      }

      if (this.state.height === this._bar.offsetHeight) {
        this._sameHeightCount += 1;
        return;
      }

      this.setState({ height: this._bar.offsetHeight }, this._onWheel);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = (0, _classnames3.default)(_style2.default.Sticky, this.props.className, _defineProperty({}, _style2.default.__sticky, this.state.sticky));
      return _react2.default.createElement(
        'div',
        { className: classes, ref: function ref(n) {
            _this2._container = n;
          } },
        _react2.default.createElement(
          'div',
          { className: _style2.default.Sticky_wrapper, ref: function ref(n) {
              _this2._bar = n;
            } },
          this.props.children
        ),
        _react2.default.createElement('div', { className: _style2.default.Sticky_placeholder, style: { height: this.state.height } })
      );
    }
  }]);

  return Sticky;
}(_react.Component);

Sticky.propTypes = {
  className: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node
};

exports.default = Sticky;
//# sourceMappingURL=index.js.map
