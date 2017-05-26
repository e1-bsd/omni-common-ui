'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleSignOnHandler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _Privileges = require('./../Privileges');

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _userManager = require('./userManager');

var _userManager2 = _interopRequireDefault(_userManager);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MockSingleSignOnHandler = function MockSingleSignOnHandler(props) {
  return props.children;
};

MockSingleSignOnHandler.propTypes = {
  children: _propTypes2.default.node
};

var SingleSignOnHandlerImpl = function (_PureComponent) {
  _inherits(SingleSignOnHandlerImpl, _PureComponent);

  function SingleSignOnHandlerImpl() {
    _classCallCheck(this, SingleSignOnHandlerImpl);

    return _possibleConstructorReturn(this, (SingleSignOnHandlerImpl.__proto__ || Object.getPrototypeOf(SingleSignOnHandlerImpl)).apply(this, arguments));
  }

  _createClass(SingleSignOnHandlerImpl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._setLastUrlPath();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._checkUserAndPrivileges(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._checkUserAndPrivileges(nextProps);
    }
  }, {
    key: '_checkUserAndPrivileges',
    value: function _checkUserAndPrivileges(props) {
      if (!this._isUserValid()) {
        return _userManager2.default.signinRedirectWithValidation();
      }

      this._logUser(props);
      _log2.default.debug('SingleSignOnHandler - Will call fetchPrivilegesIfNeeded()');
      props.fetchPrivilegesIfNeeded();
    }
  }, {
    key: '_logUser',
    value: function _logUser(props) {
      if (!props.user) {
        return;
      }

      var user = props.user.profile;
      var userId = user.sub;
      var email = user.email;


      _reactGa2.default.set({ userId: userId });
      _ravenJs2.default.setUserContext({ email: email, id: userId });
    }
  }, {
    key: '_setLastUrlPath',
    value: function _setLastUrlPath() {
      if (location.pathname === _routes2.default.path) {
        _log2.default.debug('SingleSignOnHandler - New lastUrlPath is ' + _routes2.default.path + '. Will not modify it.');
        return;
      }

      sessionStorage.lastUrlPath = location.pathname + location.search;
    }
  }, {
    key: '_isUserValid',
    value: function _isUserValid() {
      var user = this.props.user;

      return user && !user.expired;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this._isUserValid()) {
        _log2.default.debug('SingleSignOnHandler - User is valid', this.props.user);
        return this.props.children;
      }

      return null;
    }
  }]);

  return SingleSignOnHandlerImpl;
}(_react.PureComponent);

SingleSignOnHandlerImpl.propTypes = {
  children: _propTypes2.default.node,
  user: _propTypes2.default.object,
  fetchPrivilegesIfNeeded: _propTypes2.default.func.isRequired
};

function mapStateToProps(state) {
  var user = state.get('singleSignOn').user;
  return { user: user };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(_Privileges.actions, dispatch);
}

var SingleSignOnHandler = exports.SingleSignOnHandler = _Config2.default.get('featureLogin') !== true ? MockSingleSignOnHandler : SingleSignOnHandlerImpl;

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
//# sourceMappingURL=SingleSignOnHandler.js.map
