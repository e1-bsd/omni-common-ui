'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = function Content(props) {
  return _react2.default.createElement(
    'div',
    null,
    props.children
  );
};

Content.propTypes = {
  children: _react2.default.PropTypes.node
};

exports.default = Content;
//# sourceMappingURL=index.js.map
