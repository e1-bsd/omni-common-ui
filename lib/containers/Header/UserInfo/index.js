'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connect = require('./../../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Dialog = require('./../../../components/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Impersonate = require('./../../Impersonate');

var _Impersonate2 = _interopRequireDefault(_Impersonate);

var _userManager = require('./../../SingleSignOn/userManager');

var _userManager2 = _interopRequireDefault(_userManager);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _alertifyjs = require('alertifyjs');

var _alertifyjs2 = _interopRequireDefault(_alertifyjs);

var _Config = require('./../../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _AdultPicture = require('./../../../components/AdultPicture');

var _AdultPicture2 = _interopRequireDefault(_AdultPicture);

var _testClass = require('./../../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _DropdownBox = require('./../../../components/DropdownBox');

var _DropdownBox2 = _interopRequireDefault(_DropdownBox);

var _PrivilegeChecker = require('./../../../domain/PrivilegeChecker');

var _PrivilegeChecker2 = _interopRequireDefault(_PrivilegeChecker);

var _redux = require('redux');

var _Privileges = require('./../../Privileges');

var _Icon = require('./../../../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('alertifyjs/build/css/alertify.css');

var LOGOUT_POPUP_TITLE = 'Log out';
var LOGOUT_POPUP_MSG = 'Are you sure you want to leave this page and lose unsaved changes?';

var UserInfo = function (_PureComponent) {
  _inherits(UserInfo, _PureComponent);

  function UserInfo(props) {
    _classCallCheck(this, UserInfo);

    var _this = _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).call(this, props));

    _this.state = {
      isDropdownOpen: false,
      isShowImpersonate: false
    };
    _this._checkImpersonation(_this.props);
    return _this;
  }

  _createClass(UserInfo, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this._checkImpersonation(props);

      if (props.hasImpersonateFailed) {
        this.setState({ isShowImpersonate: false });
      }
    }
  }, {
    key: '_checkImpersonation',
    value: function _checkImpersonation(props) {
      if (props.hasUnimpersonated) {
        this._redirectToPortal();
      }
    }
  }, {
    key: '_onLogoutButtonClicked',
    value: function _onLogoutButtonClicked() {
      var _this2 = this;

      event.preventDefault();
      _alertifyjs2.default.confirm().setting({
        movable: false,
        transition: 'fade',
        labels: {
          ok: 'Leave',
          cancel: 'Stay'
        },
        message: LOGOUT_POPUP_MSG,
        title: LOGOUT_POPUP_TITLE,
        onok: function onok() {
          // don't show the unsaved changes warning
          if (_this2.props.router) {
            _this2.props.router.setRouteLeaveHook(_this2._getCurrentRoute(), null);
          }
          _userManager2.default.forceSignoutRedirect();
        }
      }).show();
    }
  }, {
    key: '_getCurrentRoute',
    value: function _getCurrentRoute() {
      return this.props.routes[this.props.routes.length - 1];
    }
  }, {
    key: '_redirectToPortal',
    value: function _redirectToPortal() {
      var url = _Config2.default.get('afterImpersonationRedirectTo');
      if (_is_js2.default.url(url)) {
        window.location = url;
      } else {
        window.location.reload();
      }
    }
  }, {
    key: '_onSwitchBackClicked',
    value: function _onSwitchBackClicked() {
      this.props.postImpersonate(undefined, this.props.token);
      this.setState({ impersonateData: undefined });
    }
  }, {
    key: '_toggleDropdown',
    value: function _toggleDropdown(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }
  }, {
    key: '_showImpersonateDialog',
    value: function _showImpersonateDialog() {
      this.setState({ isShowImpersonate: true, isDropdownOpen: false });
    }
  }, {
    key: '_closeImpersonateDialog',
    value: function _closeImpersonateDialog() {
      this.setState({ isShowImpersonate: false });
    }
  }, {
    key: '_handleImpersonateSuccess',
    value: function _handleImpersonateSuccess() {
      this._redirectToPortal();
    }
  }, {
    key: '_renderImpersonateDialog',
    value: function _renderImpersonateDialog() {
      var _this3 = this;

      if (!this.state.isShowImpersonate) {
        return null;
      }

      return _react2.default.createElement(
        _Dialog2.default,
        { isOpen: this.state.isShowImpersonate, className: (0, _testClass2.default)('impersonate-dialog') },
        _react2.default.createElement(_Impersonate2.default, { close: function close() {
            return _this3._closeImpersonateDialog();
          },
          success: function success() {
            return _this3._handleImpersonateSuccess();
          } })
      );
    }
  }, {
    key: '_renderImpersonateOption',
    value: function _renderImpersonateOption() {
      var _this4 = this;

      var canImpersonate = this.props.canImpersonate;

      if (this.props.impersonate) {
        return _react2.default.createElement(
          _DropdownBox2.default.Item,
          { className: (0, _testClass2.default)('header-user-dropdown-switch-back'),
            onClick: function onClick() {
              return _this4._onSwitchBackClicked();
            } },
          'Switch Back'
        );
      }

      return _react2.default.createElement(
        _DropdownBox2.default.Item,
        { className: (0, _testClass2.default)('header-user-dropdown-switch-user'),
          onClick: function onClick() {
            return _this4._showImpersonateDialog();
          },
          show: canImpersonate },
        'Switch User'
      );
    }
  }, {
    key: '_renderDropdown',
    value: function _renderDropdown() {
      var _this5 = this;

      return _react2.default.createElement(
        _DropdownBox2.default,
        { className: _style2.default.UserInfo_features, open: this.state.isDropdownOpen },
        this._renderImpersonateOption(),
        _react2.default.createElement(
          _DropdownBox2.default.Item,
          { onClick: function onClick() {
              return _this5._onLogoutButtonClicked();
            } },
          'Log Out'
        )
      );
    }
  }, {
    key: '_renderUser',
    value: function _renderUser() {
      var classes = (0, _classnames3.default)(_style2.default.UserInfo_container_user_img, (0, _testClass2.default)('user-picture'));
      return _react2.default.createElement(_AdultPicture2.default, { className: classes,
        src: this.props.user.profile.avatar_url,
        gender: this.props.user.profile.gender,
        userFirstName: this.props.user.profile.given_name,
        userLastName: this.props.user.profile.family_name,
        displayUserInitialsAsDefaultAvatar: true });
    }
  }, {
    key: '_renderImpersonatedUser',
    value: function _renderImpersonatedUser() {
      if (!this.props.impersonate) {
        return null;
      }

      var classes = (0, _classnames3.default)(_style2.default.UserInfo_container_user_img, _style2.default.__impersonated, (0, _testClass2.default)('impersonated-user-picture'));
      return _react2.default.createElement(_AdultPicture2.default, { src: this.props.impersonate.avatarUrl,
        className: classes,
        gender: this.props.impersonate.gender,
        userFirstName: this.props.impersonate.givenName,
        userLastName: this.props.impersonate.familyName,
        displayUserInitialsAsDefaultAvatar: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this6 = this;

      var havePrivilegesLoaded = this.props.havePrivilegesLoaded;

      if (!havePrivilegesLoaded()) {
        return null;
      }

      var classes = (0, _classnames3.default)(_style2.default.UserInfo, (_classnames = {}, _defineProperty(_classnames, _style2.default.__impersonating, this.props.impersonate), _defineProperty(_classnames, _style2.default.__open, this.state.isDropdownOpen), _classnames));

      return _react2.default.createElement(
        _DropdownBox2.default.Container,
        { className: classes,
          onClickOutside: function onClickOutside() {
            return _this6.setState({ isDropdownOpen: false });
          } },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames3.default)(_style2.default.UserInfo_container, (0, _testClass2.default)('header-user-dropdown')),
            onClick: function onClick(e) {
              return _this6._toggleDropdown(e);
            } },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames3.default)(_style2.default.UserInfo_container_expand) },
            _react2.default.createElement(_Icon2.default, { id: 'chevron-small-down' })
          ),
          _react2.default.createElement(
            'div',
            { className: (0, _classnames3.default)(_style2.default.UserInfo_container_user) },
            this._renderUser(),
            this._renderImpersonatedUser()
          )
        ),
        this._renderDropdown(),
        this._renderImpersonateDialog()
      );
    }
  }]);

  return UserInfo;
}(_react.PureComponent);

UserInfo.propTypes = {
  router: _propTypes2.default.any.isRequired,
  routes: _propTypes2.default.array.isRequired,
  havePrivilegesLoaded: _propTypes2.default.func.isRequired,
  postImpersonate: _propTypes2.default.func,
  token: _propTypes2.default.string,
  impersonate: _propTypes2.default.object,
  privileges: _propTypes2.default.object,
  hasUnimpersonated: _propTypes2.default.bool.isRequired,
  user: _propTypes2.default.object,
  canImpersonate: _propTypes2.default.bool,
  hasImpersonateFailed: _propTypes2.default.bool.isRequired
};

function mapStateToProps(state) {
  var postedImpersonate = state.get('impersonate').get('postedImpersonate').get('impersonate');
  return {
    arePrivilegesLoaded: state.get('privileges').items,
    user: state.get('singleSignOn').user,
    canImpersonate: _PrivilegeChecker2.default.hasPrivilege(state, _Config2.default.get('impersonatePermission')),
    hasUnimpersonated: !!(postedImpersonate && (postedImpersonate.get('error') || postedImpersonate.get('data'))),
    hasImpersonateFailed: !!(postedImpersonate && postedImpersonate.get('error')),
    token: state.get('singleSignOn').user.id_token
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, (0, _redux.bindActionCreators)(_Privileges.actions, dispatch), (0, _redux.bindActionCreators)(_Impersonate.actions, dispatch));
}

exports.default = (0, _connect2.default)(mapStateToProps, mapDispatchToProps)(UserInfo);
//# sourceMappingURL=index.js.map
