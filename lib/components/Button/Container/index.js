'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonContainer = undefined;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ButtonContainer = exports.ButtonContainer = function ButtonContainer(_ref) {
  var _classnames;

  var align = _ref.align,
      className = _ref.className,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames3.default)(_style2.default.ButtonContainer, (_classnames = {}, _defineProperty(_classnames, _style2.default.__alignRight, align === 'right'), _defineProperty(_classnames, _style2.default.__alignCenter, align === 'center'), _classnames), className) },
    children
  );
};

ButtonContainer.propTypes = {
  align: _propTypes2.default.oneOf(['left', 'right', 'center']), // default: left
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};

exports.default = ButtonContainer;
//# sourceMappingURL=index.js.map
