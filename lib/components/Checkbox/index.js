'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_PureComponent) {
  _inherits(Checkbox, _PureComponent);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    _this._handleCheck = _this._handleCheck.bind(_this);
    return _this;
  }

  _createClass(Checkbox, [{
    key: '_handleCheck',
    value: function _handleCheck(e) {
      this.props.onChange(e.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          checked = _props.checked,
          onChange = _props.onChange;

      return _react2.default.createElement(
        'div',
        { className: _style2.default.Checkbox },
        _react2.default.createElement('input', { type: 'checkbox',
          id: this.props.id,
          name: this.props.name,
          value: this.props.value || this.props.id,
          checked: _is_js2.default.existy(checked) ? !!checked : undefined,
          className: _style2.default.Checkbox_input,
          onChange: onChange ? this._handleCheck : null }),
        _react2.default.createElement('label', { className: _style2.default.Checkbox_label, htmlFor: this.props.id })
      );
    }
  }]);

  return Checkbox;
}(_react.PureComponent);

Checkbox.propTypes = {
  id: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string,
  value: _propTypes2.default.string,
  checked: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};

exports.default = Checkbox;
//# sourceMappingURL=index.js.map
