'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Item = function Item(props, _ref) {
  var grid = _ref.grid;
  var xs = props.xs;
  var sm = props.sm,
      md = props.md,
      lg = props.lg,
      className = props.className;


  if (!xs) {
    xs = 12;
  }

  var classes = (0, _classnames6.default)(_style2.default.Item, className, _defineProperty({}, grid['col-xs-' + xs], !!xs), _defineProperty({}, grid['col-sm-' + sm], !!sm), _defineProperty({}, grid['col-md-' + md], !!md), _defineProperty({}, grid['col-lg-' + lg], !!lg));
  return _react2.default.createElement(
    'div',
    { className: classes },
    props.children
  );
};

Item.propTypes = {
  children: _react2.default.PropTypes.node,
  xs: _react2.default.PropTypes.number,
  sm: _react2.default.PropTypes.number,
  md: _react2.default.PropTypes.number,
  lg: _react2.default.PropTypes.number,
  className: _react2.default.PropTypes.string
};

Item.contextTypes = {
  grid: _react2.default.PropTypes.object
};

exports.default = Item;
//# sourceMappingURL=index.js.map
