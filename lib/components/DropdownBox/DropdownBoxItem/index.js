'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownBoxItem = function DropdownBoxItem(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      show = _ref.show,
      className = _ref.className;

  if (show === false) {
    return null;
  }

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_style2.default.DropdownBoxItem, className),
      onClick: onClick },
    children
  );
};

DropdownBoxItem.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onClick: _propTypes2.default.func,
  show: _propTypes2.default.bool
};

exports.default = (0, _recompose.pure)(DropdownBoxItem);
//# sourceMappingURL=index.js.map
