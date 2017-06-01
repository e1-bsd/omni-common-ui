'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SolidRadio = function (_Component) {
  _inherits(SolidRadio, _Component);

  function SolidRadio() {
    _classCallCheck(this, SolidRadio);

    return _possibleConstructorReturn(this, (SolidRadio.__proto__ || Object.getPrototypeOf(SolidRadio)).apply(this, arguments));
  }

  _createClass(SolidRadio, [{
    key: '_handleCheck',
    value: function _handleCheck(value) {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: _style2.default.SolidRadio },
        _react2.default.createElement('input', { type: 'radio',
          id: this.props.id,
          name: this.props.name,
          value: this.props.value,
          className: _style2.default.SolidRadio_radio,
          checked: this.props.isChecked,
          onChange: function onChange(e) {
            return _this2._handleCheck(e.target.value);
          } }),
        _react2.default.createElement('label', { htmlFor: this.props.id })
      );
    }
  }]);

  return SolidRadio;
}(_react.Component);

SolidRadio.propTypes = {
  id: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.string,
  isChecked: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};

exports.default = SolidRadio;
//# sourceMappingURL=index.js.map
