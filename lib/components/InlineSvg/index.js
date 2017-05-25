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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineSvg = function InlineSvg(_ref) {
  var children = _ref.children,
      className = _ref.className,
      title = _ref.title,
      onClick = _ref.onClick;
  return _react2.default.createElement('i', { className: (0, _classnames2.default)(className, _style2.default.InlineSvg),
    dangerouslySetInnerHTML: { __html: children },
    title: title,
    onClick: onClick });
};

InlineSvg.propTypes = {
  children: _propTypes2.default.string,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

exports.default = InlineSvg;
//# sourceMappingURL=index.js.map
