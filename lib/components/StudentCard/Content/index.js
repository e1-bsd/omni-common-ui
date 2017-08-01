'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Content = function Content(_ref, _ref2) {
  var children = _ref.children;
  var withSeparatorLine = _ref2.withSeparatorLine;

  var classes = (0, _classnames3.default)(_style2.default.Content, _defineProperty({}, _style2.default.__withSeparatorLine, withSeparatorLine));
  return _react2.default.createElement(
    'div',
    { className: classes },
    children
  );
};

Content.propTypes = {
  children: _propTypes2.default.node
};

Content.contextTypes = {
  withSeparatorLine: _propTypes2.default.bool
};

exports.default = (0, _pure2.default)(Content);
//# sourceMappingURL=index.js.map
