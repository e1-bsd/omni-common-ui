'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_PureComponent) {
  _inherits(TextInput, _PureComponent);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this2 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(TextInput, [{
    key: 'handleChange',
    value: function handleChange(e) {
      if (this.props.acceptedChars) {
        if (this.props.acceptedChars.type === 'number' && e.target.value.match(/\D/g)) {
          return;
        }
        if (this.props.acceptedChars.length > 0 && this.props.acceptedChars.length < e.target.value.length) {
          return;
        }
      }
      this.props.onChange(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var suffix = this.props.suffix;

      var _this = this;
      var classes = (0, _classnames2.default)(_style2.default.TextInput, this.props.className);
      var inputClasses = !suffix ? (0, _classnames2.default)(_style2.default.TextInput_input, this.props.inputClassName) : (0, _classnames2.default)(_style2.default.TextInput_input, this.props.inputClassName, _style2.default.TextInput_suffixInput);
      return _react2.default.createElement(
        'div',
        { className: classes, style: this.props.myStyle },
        _react2.default.createElement(
          'span',
          { className: _style2.default.TextInput_name },
          this.props.labelName
        ),
        renderInputText()
      );

      function renderInputText() {
        if (suffix) {
          return _react2.default.createElement(
            'div',
            { className: _style2.default.TextInput_suffixWrapper },
            _react2.default.createElement('input', { type: 'text',
              style: _this.props.inputStyle,
              className: inputClasses,
              name: _this.props.name,
              disabled: _this.props.disabled,
              required: _this.props.required,
              value: _this.props.value,
              placeholder: _this.props.placeholder,
              onBlur: _this.handleChange,
              onChange: _this.handleChange }),
            _react2.default.createElement(
              'span',
              { className: _style2.default.TextInput_suffixWrapper_suffix },
              suffix
            )
          );
        }

        return _react2.default.createElement('input', { type: 'text',
          style: _this.props.inputStyle,
          className: inputClasses,
          name: _this.props.name,
          disabled: _this.props.disabled,
          required: _this.props.required,
          value: _this.props.value,
          placeholder: _this.props.placeholder,
          onBlur: _this.handleChange,
          onChange: _this.handleChange });
      }
    }
  }]);

  return TextInput;
}(_react.PureComponent);

TextInput.propTypes = {
  myStyle: _propTypes2.default.object,
  inputStyle: _propTypes2.default.object,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  labelName: _propTypes2.default.string,
  name: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  suffix: _propTypes2.default.string,
  className: _propTypes2.default.string,
  inputClassName: _propTypes2.default.string,
  acceptedChars: _propTypes2.default.object
};

exports.default = TextInput;
//# sourceMappingURL=TextInput.js.map
