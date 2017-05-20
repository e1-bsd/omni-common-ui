'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _PathComparator = require('./../../../domain/PathComparator');

var _PathComparator2 = _interopRequireDefault(_PathComparator);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkComponent = function LinkComponent(_ref) {
  var currentPath = _ref.currentPath,
      to = _ref.to,
      children = _ref.children;

  if (_PathComparator2.default.equal(currentPath, to)) {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_style2.default.LinkComponent, _style2.default.__current) },
      children
    );
  }

  if (_is_js2.default.not.url(to)) {
    return _react2.default.createElement(
      _reactRouter.Link,
      { to: to, className: _style2.default.LinkComponent },
      children
    );
  }

  return _react2.default.createElement(
    'a',
    { href: to, className: _style2.default.LinkComponent },
    children
  );
};

LinkComponent.propTypes = {
  children: _react2.default.PropTypes.node,
  to: _react2.default.PropTypes.string,
  currentPath: _react2.default.PropTypes.string
};

exports.default = LinkComponent;
//# sourceMappingURL=index.js.map
