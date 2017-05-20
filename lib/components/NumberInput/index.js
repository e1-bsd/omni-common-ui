'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberInput = function (_Component) {
  _inherits(NumberInput, _Component);

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
}(_react.Component);

exports.default = NumberInput;


NumberInput.propTypes = {
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  defaultValue: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  min: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  max: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  step: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  onChange: _react2.default.PropTypes.func,
  disabled: _react2.default.PropTypes.bool,
  unwritable: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  labelName: _react2.default.PropTypes.string,
  customStyle: _react2.default.PropTypes.object
};
//# sourceMappingURL=index.js.map
