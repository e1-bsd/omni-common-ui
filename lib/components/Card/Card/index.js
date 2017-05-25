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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Card = function Card(props, _ref) {
  var _classnames;

  var backgroundless = _ref.backgroundless;

  var classes = (0, _classnames3.default)(_style2.default.Card, props.className, _style2.default.__1, (_classnames = {}, _defineProperty(_classnames, _style2.default.__backgroundless, !!backgroundless), _defineProperty(_classnames, _style2.default.__borderless, !!props.borderless), _classnames));
  return _react2.default.createElement(
    'div',
    { className: classes },
    props.children
  );
};

Card.contextTypes = {
  backgroundless: _propTypes2.default.bool
};

Card.propTypes = {
  borderless: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};

exports.default = Card;
//# sourceMappingURL=index.js.map
