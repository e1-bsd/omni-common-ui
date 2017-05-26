'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MAX_LENGTH = 500;

var TextArea = function TextArea(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      maxLength = _ref.maxLength,
      className = _ref.className;
  return _react2.default.createElement('textarea', { className: (0, _classnames2.default)(_style2.default.TextArea, className),
    onChange: onChange,
    maxLength: maxLength || DEFAULT_MAX_LENGTH,
    value: value });
};

TextArea.propTypes = {
  className: _propTypes2.default.string,
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  maxLength: _propTypes2.default.number
};

exports.default = (0, _recompose.pure)(TextArea);
//# sourceMappingURL=index.js.map
