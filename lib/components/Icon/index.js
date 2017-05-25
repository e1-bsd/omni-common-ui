'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _InlineSvg = require('./../InlineSvg');

var _InlineSvg2 = _interopRequireDefault(_InlineSvg);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Icon = function Icon(_ref) {
  var className = _ref.className,
      id = _ref.id,
      title = _ref.title,
      onClick = _ref.onClick;

  var classes = (0, _classnames3.default)(_style2.default.Icon, className, _defineProperty({}, _style2.default.__clickable, _is_js2.default.function(onClick)));
  return _react2.default.createElement(
    _InlineSvg2.default,
    { className: classes,
      title: title,
      onClick: onClick },
    _icons2.default.get(id)
  );
};

Icon.propTypes = {
  className: _propTypes2.default.string,
  id: _propTypes2.default.oneOf(Object.keys(_icons2.default.toObject())),
  title: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

exports.default = Icon;
//# sourceMappingURL=index.js.map
