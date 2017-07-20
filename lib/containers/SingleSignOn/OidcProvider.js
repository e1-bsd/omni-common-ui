'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('./../../data/SingleSignOn/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OidcProvider = function (_Component) {
  _inherits(OidcProvider, _Component);

  function OidcProvider(props) {
    _classCallCheck(this, OidcProvider);

    var _this = _possibleConstructorReturn(this, (OidcProvider.__proto__ || Object.getPrototypeOf(OidcProvider)).call(this, props));

    _this.userManager = props.userManager;
    _this._onUserLoaded = _this._onUserLoaded.bind(_this);
    _this._onSilentRenewError = _this._onSilentRenewError.bind(_this);
    _this._onAccessTokenExpired = _this._onAccessTokenExpired.bind(_this);
    _this._onUserUnloaded = _this._onUserUnloaded.bind(_this);
    _this._onAccessTokenExpiring = _this._onAccessTokenExpiring.bind(_this);
    _this._onAccessTokenExpired = _this._onAccessTokenExpired.bind(_this);
    _this._onUserSignedOut = _this._onUserSignedOut.bind(_this);
    return _this;
  }

  _createClass(OidcProvider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // register the event callbacks
      this.userManager.events.addUserLoaded(this._onUserLoaded);
      this.userManager.events.addSilentRenewError(this._onSilentRenewError);
      this.userManager.events.addAccessTokenExpired(this._onAccessTokenExpired);
      this.userManager.events.addAccessTokenExpiring(this._onAccessTokenExpiring);
      this.userManager.events.addUserUnloaded(this._onUserUnloaded);
      this.userManager.events.addUserSignedOut(this._onUserSignedOut);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // unregister the event callbacks
      this.userManager.events.removeUserLoaded(this._onUserLoaded);
      this.userManager.events.removeSilentRenewError(this._onSilentRenewError);
      this.userManager.events.removeAccessTokenExpired(this._onAccessTokenExpired);
      this.userManager.events.removeAccessTokenExpiring(this._onAccessTokenExpiring);
      this.userManager.events.removeUserUnloaded(this._onUserUnloaded);
      this.userManager.events.removeUserSignedOut(this._onUserSignedOut);
    }

    // event callback when the user has been loaded (on silent renew or redirect)

  }, {
    key: '_onUserLoaded',
    value: function _onUserLoaded(user) {
      this.props.store.dispatch((0, _actions.userFound)(user));
    }

    // event callback when silent renew errored

  }, {
    key: '_onSilentRenewError',
    value: function _onSilentRenewError(error) {
      this.props.store.dispatch((0, _actions.silentRenewError)(error));
    }

    // event callback when the access token expired

  }, {
    key: '_onAccessTokenExpired',
    value: function _onAccessTokenExpired() {
      this.props.store.dispatch((0, _actions.userExpired)());
    }

    // event callback when the user is logged out

  }, {
    key: '_onUserUnloaded',
    value: function _onUserUnloaded() {
      this.props.store.dispatch((0, _actions.sessionTerminated)());
    }

    // event callback when the user is expiring

  }, {
    key: '_onAccessTokenExpiring',
    value: function _onAccessTokenExpiring() {
      this.props.store.dispatch((0, _actions.userExpiring)());
    }

    // event callback when the user is signed out

  }, {
    key: '_onUserSignedOut',
    value: function _onUserSignedOut() {
      this.props.store.dispatch((0, _actions.userSignedOut)());
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return OidcProvider;
}(_react.Component);

OidcProvider.propTypes = {
  userManager: _propTypes2.default.object.isRequired,
  store: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node
};

exports.default = OidcProvider;
//# sourceMappingURL=OidcProvider.js.map
