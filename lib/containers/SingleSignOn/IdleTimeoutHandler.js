'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _Timer = require('./Timer');

var _Timer2 = _interopRequireDefault(_Timer);

var _SingleSignOn = require('./../../data/SingleSignOn');

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdleTimeoutHandler = function (_PureComponent) {
  _inherits(IdleTimeoutHandler, _PureComponent);

  function IdleTimeoutHandler() {
    _classCallCheck(this, IdleTimeoutHandler);

    return _possibleConstructorReturn(this, (IdleTimeoutHandler.__proto__ || Object.getPrototypeOf(IdleTimeoutHandler)).apply(this, arguments));
  }

  _createClass(IdleTimeoutHandler, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_is_js2.default.not.number(_Config2.default.get('autoSignOutTimeout'))) {
        return false;
      }

      this.timer = new _Timer2.default();

      this._signOut = this._signOut.bind(this);
      this._invokeIdleTimer = this._invokeIdleTimer.bind(this);

      this._invokeIdleTimer();
      window.document.addEventListener('click', this._invokeIdleTimer);
      window.document.addEventListener('keypress', this._invokeIdleTimer);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_is_js2.default.not.number(_Config2.default.get('autoSignOutTimeout'))) {
        return false;
      }

      this.timer.cancel();
      window.document.removeEventListener('click', this._invokeIdleTimer);
      window.document.removeEventListener('keypress', this._invokeIdleTimer);
    }
  }, {
    key: '_invokeIdleTimer',
    value: function _invokeIdleTimer() {
      _log2.default.debug('IdleTimeoutHandler - Will start a new timer');
      this.timer.invoke(this._signOut, _Config2.default.get('autoSignOutTimeout') * 1000);
    }
  }, {
    key: '_signOut',
    value: function _signOut() {
      _log2.default.debug('IdleTimeoutHandler - Will sign out!');
      // SignOut should not be with the route hook.
      if (this.props.router) {
        this.props.router.setRouteLeaveHook(this._getCurrentRoute(), null);
      }
      (0, _SingleSignOn.createUserManager)().forceSignOutRedirect();
    }
  }, {
    key: '_getCurrentRoute',
    value: function _getCurrentRoute() {
      return this.props.routes[this.props.routes.length - 1];
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return IdleTimeoutHandler;
}(_react.PureComponent);

exports.default = IdleTimeoutHandler;


IdleTimeoutHandler.propTypes = {
  children: _propTypes2.default.node,
  router: _propTypes2.default.any.isRequired,
  routes: _propTypes2.default.array.isRequired
};
//# sourceMappingURL=IdleTimeoutHandler.js.map
