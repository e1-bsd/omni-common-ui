'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MAX_LENGTH = 500;

var TextArea = function TextArea(props) {
  var value = props.value,
      onChange = props.onChange,
      maxLength = props.maxLength,
      className = props.className;

  return _react2.default.createElement('textarea', _extends({ onChange: onChange,
    maxLength: maxLength || DEFAULT_MAX_LENGTH,
    value: value
  }, props, {
    className: (0, _classnames2.default)(_style2.default.TextArea, className) }));
};

TextArea.propTypes = {
  className: _propTypes2.default.string,
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  maxLength: _propTypes2.default.number
};

exports.default = (0, _pure2.default)(TextArea);
//# sourceMappingURL=index.js.map
