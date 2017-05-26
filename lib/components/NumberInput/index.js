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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberInput = function (_PureComponent) {
  _inherits(NumberInput, _PureComponent);

  function NumberInput() {
    _classCallCheck(this, NumberInput);

    return _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).apply(this, arguments));
  }

  _createClass(NumberInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.acceptedString = /^[0-9]+$/;
      this.setState({
        value: this.transferToNumber(this.props.value === undefined ? this.props.defaultValue : this.props.value, ''),
        min: this.transferToNumber(this.props.min),
        max: this.transferToNumber(this.props.max),
        step: this.transferToNumber(this.props.step, 1),
        disabled: this.props.disabled,
        unwritable: this.props.unwritable
      });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this.props.value === nextProps.value && this.props.min === nextProps.min && this.props.max === nextProps.max && this.props.step === nextProps.step && this.props.disabled === nextProps.disabled && this.props.unwritable === nextProps.unwritable) {
        return;
      }
      this.setState({
        value: this.transferToNumber(nextProps.value === undefined ? nextProps.defaultValue : nextProps.value),
        min: this.transferToNumber(nextProps.min),
        max: this.transferToNumber(nextProps.max),
        step: this.transferToNumber(nextProps.step, 1),
        disabled: nextProps.disabled,
        unwritable: nextProps.unwritable
      });
    }
  }, {
    key: 'transferToNumber',
    value: function transferToNumber(target, defaultValue) {
      if (_is_js2.default.number(target)) {
        return Number(target.toFixed(0));
      }
      if (this.acceptedString.test(target)) {
        return Number(target);
      }
      return defaultValue;
    }
  }, {
    key: 'upArrowClickHandler',
    value: function upArrowClickHandler() {
      if (this.state.value === undefined) {
        if (_is_js2.default.not.undefined(this.state.min)) {
          this.applyChange(this.state.min);
        } else {
          this.applyChange(this.state.step || 1);
        }
        return;
      }

      if (_is_js2.default.undefined(this.state.max) || this.state.value + this.state.step <= this.state.max) {
        this.applyChange(this.state.value + this.state.step);
      }
    }
  }, {
    key: 'downArrowClickHandler',
    value: function downArrowClickHandler() {
      if (this.state.value === undefined) {
        if (_is_js2.default.not.undefined(this.state.min)) {
          this.applyChange(this.state.min);
        } else {
          this.applyChange(-this.state.step || -1);
        }
        return;
      }

      if (_is_js2.default.undefined(this.state.min) || this.state.value - this.state.step >= this.state.min) {
        this.applyChange(this.state.value - this.state.step);
      }
    }
  }, {
    key: 'valueChangeHandler',
    value: function valueChangeHandler(e) {
      if (e.target.value === '') {
        this.applyChange(e.target.value);
      }

      if (this.acceptedString.test(e.target.value)) {
        this.setState({ value: e.target.value });

        if ((_is_js2.default.undefined(this.state.min) || Number(e.target.value, 10) >= this.state.min) && (_is_js2.default.undefined(this.state.max) || Number(e.target.value, 10) <= this.state.max)) {
          this.applyChange(Number(e.target.value, 10));
        }

        if (Number(e.target.value, 10) < this.state.min) {
          this.applyChange(Number(this.state.min, 10));
        }

        if (Number(e.target.value, 10) > this.state.max) {
          this.applyChange(Number(this.state.max, 10));
        }
      }
    }
  }, {
    key: 'applyChange',
    value: function applyChange(value) {
      this.setState({ value: value });
      if (this.props.onChange) {
        if (value === '') {
          this.props.onChange({ target: {} });
        } else {
          this.props.onChange({ target: { value: value } });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: _style2.default.NumberInputContainer },
        this.props.labelName ? _react2.default.createElement(
          'span',
          { className: _style2.default.NumberInputName },
          this.props.labelName
        ) : '',
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_style2.default.NumberInput, this.props.className),
            style: this.props.customStyle },
          !this.props.disabled && _react2.default.createElement(
            'div',
            { className: _style2.default.upArrow, onClick: function onClick() {
                return _this2.upArrowClickHandler();
              } },
            _react2.default.createElement(_Icon2.default, { id: 'chevron-small-up' })
          ),
          !this.props.disabled && _react2.default.createElement(
            'div',
            { className: _style2.default.downArrow, onClick: function onClick() {
                return _this2.downArrowClickHandler();
              } },
            _react2.default.createElement(_Icon2.default, { id: 'chevron-small-down' })
          ),
          _react2.default.createElement('input', { className: _style2.default.valueBox,
            type: 'text',
            value: this.state.value,
            disabled: this.state.unwritable || this.state.disabled,
            onChange: function onChange(e) {
              return _this2.valueChangeHandler(e);
            } })
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
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  unwritable: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  labelName: _propTypes2.default.string,
  customStyle: _propTypes2.default.object
};
//# sourceMappingURL=index.js.map
