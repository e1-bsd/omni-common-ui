'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('../Item');

var _Item2 = _interopRequireDefault(_Item);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = function Group(props, _ref) {
  var grid = _ref.grid;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(grid.row, props.className) },
    buildChildren()
  );

  function buildChildren() {
    return _react2.default.Children.map(props.children, wrapChildIfNeeded);
  }

  function wrapChildIfNeeded(child) {
    if (!child) {
      return null;
    }

    if (child.type === _Item2.default) {
      return child;
    }

    return _react2.default.createElement(
      _Item2.default,
      null,
      child
    );
  }
};

Group.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string
};

Group.contextTypes = {
  grid: _react2.default.PropTypes.object
};

exports.default = Group;
//# sourceMappingURL=index.js.map
