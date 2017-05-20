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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Content = function Content(props) {
  var className = (0, _classnames3.default)(props.className, _style2.default.Content, _defineProperty({}, _style2.default.__bottomless, props.withoutBottomPadding));
  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

Content.propTypes = {
  className: _react2.default.PropTypes.string,
  withoutBottomPadding: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node
};

exports.default = Content;
//# sourceMappingURL=index.js.map
