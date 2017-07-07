'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Card = require('./../../Card');

var _Card2 = _interopRequireDefault(_Card);

var _testClass = require('./../../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Profile = function Profile(props, _ref) {
  var backgroundless = _ref.backgroundless,
      vertical = _ref.vertical;
  var status = props.status,
      statusHighlighted = props.statusHighlighted;


  var renderName = function renderName(prop, name, nameClasses, nameLink) {
    if (!name) {
      return;
    }
    var nameProps = { className: nameClasses, 'data-prop': prop };
    return _is_js2.default.existy(nameLink) ? _react2.default.createElement(
      _reactRouter.Link,
      _extends({}, nameProps, { to: nameLink }),
      name
    ) : _react2.default.createElement(
      'div',
      nameProps,
      name
    );
  };

  var getStr = function getStr(name) {
    if (_is_js2.default.undefined(name)) {
      return '';
    }
    return name;
  };

  var nameClass = (0, _classnames4.default)(_style2.default.StudentCard_profile_name, (0, _testClass2.default)('studentCard-name'), _defineProperty({}, _style2.default.__vertical, vertical));

  var localNameClass = (0, _classnames4.default)(_style2.default.StudentCard_profile_localName, (0, _testClass2.default)('studentCard-localName'), _defineProperty({}, _style2.default.__vertical, vertical));

  var name = getStr(props.name) + ' ' + getStr(props.surname);

  return _react2.default.createElement(
    _Card2.default.Content,
    { withoutBottomPadding: true },
    _react2.default.createElement(_2.default.Person, { className: props.className,
      avatarUrl: props.avatarUrl,
      gender: props.gender,
      nameNode: renderName('name', name, nameClass, props.nameLink),
      localNameNode: renderName('localName', props.localName, localNameClass),
      backgroundless: backgroundless,
      vertical: vertical,
      withBiggerAvatar: props.withBiggerAvatar,
      statusClassName: (0, _testClass2.default)('studentCard-status'),
      status: status,
      statusHighlighted: statusHighlighted })
  );
};

Profile.contextTypes = {
  backgroundless: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool
};

Profile.propTypes = {
  className: _propTypes2.default.string,
  name: _propTypes2.default.string,
  surname: _propTypes2.default.string,
  localName: _propTypes2.default.string,
  gender: _propTypes2.default.any,
  avatarUrl: _propTypes2.default.string,
  status: _propTypes2.default.string,
  statusInitial: _propTypes2.default.string,
  statusHighlighted: _propTypes2.default.bool,
  withBiggerAvatar: _propTypes2.default.bool,
  nameLink: _propTypes2.default.string
};

exports.default = Profile;
//# sourceMappingURL=index.js.map
