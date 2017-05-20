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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageCardContent = function PageCardContent(props) {
  var className = props.className;


  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_style2.default.PageCardContent, className) },
    props.children
  );
};

PageCardContent.propTypes = {
  className: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node
};

exports.default = PageCardContent;
//# sourceMappingURL=index.js.map
