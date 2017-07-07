'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _connect = require('./../../domain/connect');

var _Icon = require('./../../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _testClass = require('./../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UserInfo = require('./UserInfo');

var _UserInfo2 = _interopRequireDefault(_UserInfo);

var _NotificationsTray = require('./NotificationsTray');

var _NotificationsTray2 = _interopRequireDefault(_NotificationsTray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Header = function Header(props) {
  _log2.default.debug('Header - impersonateData', props.impersonate);
  var classes = (0, _classnames3.default)(_style2.default.Header, (0, _testClass2.default)('header'), _defineProperty({}, _style2.default.__impersonating, props.impersonate));
  return _react2.default.createElement(
    'div',
    { className: classes },
    _react2.default.createElement(
      'div',
      { className: (0, _classnames3.default)(_style2.default.Header_burger, (0, _testClass2.default)('hamburger')),
        onClick: function onClick(e) {
          return _is_js2.default.function(props.onHamburgerClick) && props.onHamburgerClick(e);
        } },
      _react2.default.createElement(_Icon2.default, { id: 'burger' })
    ),
    _react2.default.createElement('div', { className: _style2.default.Header_logo }),
    _react2.default.createElement(
      'div',
      { className: _style2.default.Header_wrap },
      _Config2.default.get('notificationsTray') && !props.impersonate ? _react2.default.createElement(_NotificationsTray2.default, null) : null,
      _react2.default.createElement(_UserInfo2.default, { impersonate: props.impersonate,
        router: props.router,
        routes: props.routes })
    )
  );
};

Header.propTypes = {
  router: _propTypes2.default.any.isRequired,
  routes: _propTypes2.default.array.isRequired,
  impersonate: _propTypes2.default.object,
  onHamburgerClick: _propTypes2.default.func
};

function mapStateToProps(state) {
  var userProfile = state.get('singleSignOn').user.profile;
  var impersonate = void 0;
  if (!userProfile.impersonated_user_email) return { impersonate: impersonate };

  impersonate = {
    email: userProfile.impersonated_user_email,
    sub: userProfile.impersonated_user_id,
    avatarUrl: userProfile.impersonated_user_avatar_url,
    gender: userProfile.impersonated_user_gender,
    name: userProfile.impersonated_user_name,
    familyName: userProfile.impersonated_user_family_name,
    middleName: userProfile.impersonated_user_middle_name,
    givenName: userProfile.impersonated_user_given_name
  };
  return { impersonate: impersonate };
}

exports.default = (0, _connect.connect)(mapStateToProps, null)((0, _pure2.default)(Header));
//# sourceMappingURL=component.js.map
