'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Person = require('./../../Person');

var _Person2 = _interopRequireDefault(_Person);

var _StudentPicture = require('./../../StudentPicture');

var _StudentPicture2 = _interopRequireDefault(_StudentPicture);

var _ProductionStatus = require('./../../ProductionStatus');

var _ProductionStatus2 = _interopRequireDefault(_ProductionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PersonComp = function PersonComp(props) {
  var _classnames, _classnames2;

  var classes = (0, _classnames4.default)(_style2.default.Person, _style2.default.__1, (_classnames = {}, _defineProperty(_classnames, _style2.default.__backgroundless, props.backgroundless), _defineProperty(_classnames, _style2.default.__vertical, props.vertical), _classnames), props.className);

  return _react2.default.createElement(
    _Person2.default,
    { className: classes, vertical: props.vertical },
    _react2.default.createElement(_StudentPicture2.default, { src: props.avatarUrl,
      gender: props.gender,
      className: (0, _classnames4.default)(_style2.default.Person_picture, (_classnames2 = {}, _defineProperty(_classnames2, _style2.default.__bigger, !!props.withBiggerAvatar), _defineProperty(_classnames2, _style2.default.__vertical, !!props.vertical), _classnames2)) }),
    props.nameNode,
    props.localNameNode,
    _react2.default.createElement(_ProductionStatus2.default, { className: props.statusClassName,
      status: props.status,
      highlighted: props.statusHighlighted })
  );
};

PersonComp.propTypes = {
  className: _propTypes2.default.string,
  statusClassName: _propTypes2.default.string,
  pictureClassName: _propTypes2.default.string,
  avatarUrl: _propTypes2.default.string,
  gender: _propTypes2.default.string,
  nameNode: _propTypes2.default.node,
  localNameNode: _propTypes2.default.node,
  status: _propTypes2.default.string,
  statusHighlighted: _propTypes2.default.bool,
  backgroundless: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool,
  withBiggerAvatar: _propTypes2.default.bool
};

exports.default = (0, _pure2.default)(PersonComp);
//# sourceMappingURL=index.js.map
