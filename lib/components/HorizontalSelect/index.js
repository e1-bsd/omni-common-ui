'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _HorizontalScroll = require('../HorizontalScroll');

var _HorizontalScroll2 = _interopRequireDefault(_HorizontalScroll);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wasLeftMouseButtonPressed = function wasLeftMouseButtonPressed() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;

  var button = e.which || e.button;
  return button === 1;
};

var movementLimit = 20;

var HorizontalSelect = function (_PureComponent) {
  _inherits(HorizontalSelect, _PureComponent);

  function HorizontalSelect(props) {
    _classCallCheck(this, HorizontalSelect);

    var _this = _possibleConstructorReturn(this, (HorizontalSelect.__proto__ || Object.getPrototypeOf(HorizontalSelect)).call(this));

    _this.state = { value: props.value };
    _this.scrollToElement = {
      selector: '.' + _style2.default.HorizontalSelect_option_active,
      duration: 300,
      easing: { style: 'ease-in-out' }
    };

    // this collection of goodies will prevent `onclick` firing after an x-axis drag
    _this._onMouseDown = function (e) {
      if (!wasLeftMouseButtonPressed(e.nativeEvent)) return;
      _this._startMouseX = e.screenX;
    };
    _this._onClick = function (option, e) {
      var movement = Math.abs(_this._startMouseX - e.screenX);
      if (_this._startMouseX && movement > movementLimit) {
        // x-axis drag happened; block click
        e.preventDefault();
        return false;
      }
      _this._onOptionSelect(option.value);
    };
    _this._onOptionSelect = function (value) {
      _this.props.onSelect && _this.props.onSelect(value);
    };
    return _this;
  }

  _createClass(HorizontalSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          getLinkHrefForValue = _props.getLinkHrefForValue;

      if (!_is_js2.default.existy(options) || options.length === 0) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: _style2.default.HorizontalSelect_wrap },
        _react2.default.createElement(
          _HorizontalScroll2.default,
          { className: _style2.default.HorizontalSelect,
            innerClassName: _style2.default.HorizontalSelect_scroller,
            scrollToElement: this.scrollToElement },
          _react2.default.createElement(
            'div',
            { className: _style2.default.HorizontalSelect_options_wrap },
            _react2.default.createElement(
              'ul',
              { className: _style2.default.HorizontalSelect_options },
              options.map(function (option) {
                var optionClassName = (0, _classnames3.default)(_style2.default.HorizontalSelect_option, _defineProperty({}, _style2.default.HorizontalSelect_option_active, option.value === _this2.state.value), option.className);
                if (!option._onClick) {
                  option._onClick = _this2._onClick.bind(null, option); // eslint-disable-line
                }
                return _react2.default.createElement(
                  'li',
                  { key: option.value,
                    className: optionClassName },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: getLinkHrefForValue && getLinkHrefForValue(option.value),
                      draggable: false,
                      onMouseDown: _this2._onMouseDown,
                      onClick: option._onClick },
                    option.html
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return HorizontalSelect;
}(_react.PureComponent);

HorizontalSelect.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    html: _propTypes2.default.node,
    value: _propTypes2.default.string,
    className: _propTypes2.default.string
  })).isRequired,
  value: _propTypes2.default.string,
  getLinkHrefForValue: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func,
  optionClassName: _propTypes2.default.string
};

exports.default = HorizontalSelect;
//# sourceMappingURL=index.js.map
