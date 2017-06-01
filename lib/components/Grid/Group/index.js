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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};

Group.contextTypes = {
  grid: _propTypes2.default.object
};

exports.default = Group;
//# sourceMappingURL=index.js.map
