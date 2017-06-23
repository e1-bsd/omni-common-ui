'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = function Content(props) {
  return _react2.default.createElement(
    'div',
    null,
    props.children
  );
};

Content.propTypes = {
  children: _propTypes2.default.node
};

exports.default = (0, _pure2.default)(Content);
//# sourceMappingURL=index.js.map