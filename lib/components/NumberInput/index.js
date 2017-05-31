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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REG_EXP_ACCEPTED_CHARS = /^[0-9]+$/;

var NumberInput = function (_PureComponent) {
  _inherits(NumberInput, _PureComponent);

  function NumberInput(props) {
    _classCallCheck(this, NumberInput);

    var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

    _this.state = { focused: false };
    _this._parseProps(props);
    _this._onUpArrowClicked = _this._onUpArrowClicked.bind(_this);
    _this._onDownArrowClicked = _this._onDownArrowClicked.bind(_this);
    _this._onValueChanged = _this._onValueChanged.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);
    _this._onBlur = _this._onBlur.bind(_this);
    _this._refToInput = _this._refToInput.bind(_this);
    return _this;
  }

  _createClass(NumberInput, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this._parseProps(nextProps);
    }
  }, {
    key: '_parseProps',
    value: function _parseProps(props) {
      this._value = this._parseNumber(props.value);
      this._defaultValue = this._parseNumber(props.defaultValue);
      this._min = this._parseNumber(props.min);
      this._max = this._parseNumber(props.max);
      this._step = this._parseNumber(props.step, 1);
    }
  }, {
    key: '_parseNumber',
    value: function _parseNumber(target, defaultValue) {
      if (_is_js2.default.number(target)) {
        return Number(target.toFixed(0));
      }

      if (REG_EXP_ACCEPTED_CHARS.test(target)) {
        return Number(target, 10);
      }

      return defaultValue;
    }
  }, {
    key: '_onUpArrowClicked',
    value: function _onUpArrowClicked() {
      this._setNewValue((this._value || this._defaultValue) + 1);
      this._focusOnInput();
    }
  }, {
    key: '_onDownArrowClicked',
    value: function _onDownArrowClicked() {
      this._setNewValue((this._value || this._defaultValue) - 1);
      this._focusOnInput();
    }
  }, {
    key: '_setNewValue',
    value: function _setNewValue(value) {
      this._onValueChanged({ target: { value: value } });
    }
  }, {
    key: '_focusOnInput',
    value: function _focusOnInput() {
      this._input.focus();
    }
  }, {
    key: '_onValueChanged',
    value: function _onValueChanged(_ref) {
      var newValue = _ref.target.value;

      if (_is_js2.default.empty(newValue)) {
        return this._sendCallbackWithNewValue(null);
      }

      if (!REG_EXP_ACCEPTED_CHARS.test(newValue)) {
        return;
      }

      var numberValue = Number(newValue, 10);
      if ((_is_js2.default.undefined(this._min) || numberValue >= this._min) && (_is_js2.default.undefined(this._max) || numberValue <= this._max)) {
        return this._sendCallbackWithNewValue(numberValue);
      }

      if (numberValue < this._min) {
        return this._sendCallbackWithNewValue(this._min);
      }

      if (numberValue > this._max) {
        return this._sendCallbackWithNewValue(this._max);
      }
    }
  }, {
    key: '_sendCallbackWithNewValue',
    value: function _sendCallbackWithNewValue(value) {
      if (_is_js2.default.function(this.props.onChange)) {
        this.props.onChange(value);
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus() {
      this.setState({ focused: true });
    }
  }, {
    key: '_onBlur',
    value: function _onBlur() {
      this.setState({ focused: false });
    }
  }, {
    key: '_refToInput',
    value: function _refToInput(c) {
      this._input = c;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames3.default)(_style2.default.NumberInput_inputContainer, this.props.className, _defineProperty({}, _style2.default.__focused, this.state.focused));
      return _react2.default.createElement(
        'div',
        { className: _style2.default.NumberInput },
        this.props.labelName && _react2.default.createElement(
          'span',
          { className: _style2.default.NumberInput_label },
          this.props.labelName
        ),
        _react2.default.createElement(
          'div',
          { className: classes },
          _react2.default.createElement('input', { className: _style2.default.NumberInput_inputContainer_input,
            type: 'text',
            value: this._value || this._defaultValue || '',
            disabled: this.props.readonly || this.props.disabled,
            onChange: this._onValueChanged,
            onFocus: this._onFocus,
            onBlur: this._onBlur,
            ref: this._refToInput }),
          !this.props.disabled && _react2.default.createElement(
            'div',
            { className: _style2.default.NumberInput_arrowsContainer },
            _react2.default.createElement(
              'div',
              { className: _style2.default.NumberInput_arrow, onClick: this._onUpArrowClicked },
              _react2.default.createElement(_Icon2.default, { id: 'chevron-small-up' })
            ),
            _react2.default.createElement(
              'div',
              { className: _style2.default.NumberInput_arrow, onClick: this._onDownArrowClicked },
              _react2.default.createElement(_Icon2.default, { id: 'chevron-small-down' })
            )
          )
        )
      );
    }
  }]);

  return NumberInput;
}(_react.PureComponent);

exports.default = NumberInput;


NumberInput.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  step: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  labelName: _propTypes2.default.string
};
//# sourceMappingURL=index.js.map
