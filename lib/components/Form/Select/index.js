'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('react-select/dist/react-select.css');

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _formsyReact = require('formsy-react');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Icon = require('./../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select = function Select(props) {

  var _arrowRenderer = function _arrowRenderer() {
    return _react2.default.createElement(
      'span',
      { className: _style2.default.Select_icon },
      _react2.default.createElement(_Icon2.default, { id: 'chevron-fat-down' })
    );
  };

  var classes = (0, _classnames4.default)(_style2.default.Select_element, _defineProperty({}, _style2.default.__required, props.showRequired()), _defineProperty({}, _style2.default.__error, props.showError()));

  var select = _react2.default.createElement(_reactSelect2.default, _extends({ className: classes,
    onChange: function onChange(e) {
      return handleChange(e);
    },
    arrowRenderer: function arrowRenderer() {
      return _arrowRenderer();
    }
  }, props));

  if (_is_js2.default.not.undefined(props.label)) {
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
      select
    );
  }
  return select;

  function handleChange(e) {
    props.setValue(e.value);
  }
};

Select.propTypes = {
  showRequired: _propTypes2.default.func.isRequired,
  setValue: _propTypes2.default.func.isRequired,
  showError: _propTypes2.default.func.isRequired,
  label: _propTypes2.default.string
};

exports.default = (0, _formsyReact.HOC)(Select);
//# sourceMappingURL=index.js.map
