'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _StudentPicture = require('./../../StudentPicture');

var _StudentPicture2 = _interopRequireDefault(_StudentPicture);

var _Card = require('./../../Card');

var _Card2 = _interopRequireDefault(_Card);

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

var _ProductionStatus = require('./../../ProductionStatus');

var _ProductionStatus2 = _interopRequireDefault(_ProductionStatus);

var _Person = require('./../../Person');

var _Person2 = _interopRequireDefault(_Person);

var _testClass = require('./../../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Profile = function Profile(props, _ref) {
  var _classnames, _classnames4;

  var withSeparatorLine = _ref.withSeparatorLine,
      backgroundless = _ref.backgroundless,
      vertical = _ref.vertical;
  var status = props.status,
      statusHighlighted = props.statusHighlighted;

  var classes = (0, _classnames6.default)(_style2.default.StudentCard_profile, _style2.default.__1, (_classnames = {}, _defineProperty(_classnames, _style2.default.__separated, withSeparatorLine), _defineProperty(_classnames, _style2.default.__backgroundless, backgroundless), _defineProperty(_classnames, _style2.default.__vertical, vertical), _classnames), props.className);

  var renderName = function renderName(prop, name, nameClasses, onClick) {
    if (!name) {
      return;
    }
    return _react2.default.createElement(
      'div',
      { className: nameClasses,
        'data-prop': prop,
        onClick: onClick },
      name
    );
  };
  var getStr = function getStr(name) {
    if (_is_js2.default.undefined(name)) {
      return '';
    }
    return name;
  };
  var nameClass = (0, _classnames6.default)(_style2.default.StudentCard_profile_name, (0, _testClass2.default)('studentCard-name'), _defineProperty({}, _style2.default.__vertical, vertical));
  var localNameClass = (0, _classnames6.default)(_style2.default.StudentCard_profile_localName, (0, _testClass2.default)('studentCard-localName'), _defineProperty({}, _style2.default.__vertical, vertical));
  var statusClass = (0, _classnames6.default)(_style2.default.StudentCard_profile_status, (0, _testClass2.default)('studentCard-status'));
  var name = getStr(props.name) + ' ' + getStr(props.surname);
  return _react2.default.createElement(
    _Card2.default.Content,
    { withoutBottomPadding: true },
    _react2.default.createElement(
      _Person2.default,
      { className: classes, vertical: vertical },
      _react2.default.createElement(_StudentPicture2.default, { src: props.avatarUrl,
        gender: props.gender,
        className: (0, _classnames6.default)(_style2.default.StudentCard_profile_image, (_classnames4 = {}, _defineProperty(_classnames4, _style2.default.__bigger, !!props.withBiggerAvatar), _defineProperty(_classnames4, _style2.default.__vertical, vertical), _classnames4)) }),
      renderName('name', name, nameClass, props.onNameClick),
      renderName('localName', props.localName, localNameClass),
      _react2.default.createElement(_ProductionStatus2.default, { className: statusClass,
        status: status,
        highlighted: statusHighlighted })
    )
  );
};

Profile.contextTypes = {
  backgroundless: _propTypes2.default.bool,
  withSeparatorLine: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool
};

Profile.propTypes = {
  className: _propTypes2.default.string,
  name: _propTypes2.default.string,
  surname: _propTypes2.default.string,
  localName: _propTypes2.default.string,
  gender: _propTypes2.default.string,
  avatarUrl: _propTypes2.default.string,
  status: _propTypes2.default.string,
  statusInitial: _propTypes2.default.string,
  statusHighlighted: _propTypes2.default.bool,
  withBiggerAvatar: _propTypes2.default.bool,
  onNameClick: _propTypes2.default.func
};

exports.default = Profile;
//# sourceMappingURL=index.js.map
