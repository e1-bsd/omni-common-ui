'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextInput = function TextInput(props) {
  var classes = (0, _classnames4.default)(_style2.default.TextInput, _defineProperty({}, _style2.default.__required, props.showRequired()), _defineProperty({}, _style2.default.__error, props.showError()));

  return _react2.default.createElement(
    _Field2.default,
    { label: props.label,
      getErrorMessage: function getErrorMessage() {
        return props.getErrorMessage();
      },
      showError: function showError() {
        return props.showError();
      },
      showRequired: function showRequired() {
        return props.showRequired();
      },
      useLabel: true },
    _react2.default.createElement('input', { type: 'text',
      className: classes,
      name: props.name,
      disabled: props.disabled,
      value: props.getValue(),
      onChange: function onChange(e) {
        return handleChange(e);
      } })
  );

  function handleChange(e) {
    props.setValue(e.currentTarget.value);
  }
};

TextInput.propTypes = {
  showRequired: _react2.default.PropTypes.func.isRequired,
  name: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  getValue: _react2.default.PropTypes.func.isRequired,
  setValue: _react2.default.PropTypes.func.isRequired,
  showError: _react2.default.PropTypes.func.isRequired,
  label: _react2.default.PropTypes.string
};

exports.default = (0, _formsyReact.HOC)(TextInput);
//# sourceMappingURL=index.js.map
