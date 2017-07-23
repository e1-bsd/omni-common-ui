'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizationHandler = undefined;
exports.mapStateToProps = mapStateToProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Privileges = require('./../Privileges');

var _redux = require('redux');

var _AuthorisationErrorPage = require('./../../components/AuthorisationErrorPage');

var _AuthorisationErrorPage2 = _interopRequireDefault(_AuthorisationErrorPage);

var _ErrorPageConfig = require('./../../domain/ErrorPageConfig');

var _ErrorPageConfig2 = _interopRequireDefault(_ErrorPageConfig);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthorizationHandler = exports.AuthorizationHandler = function AuthorizationHandler(props) {
  var user = props.user,
      permissionChecks = props.permissionChecks,
      children = props.children,
      havePrivilegesLoaded = props.havePrivilegesLoaded;


  var spinner = _react2.default.createElement(
    'div',
    { className: 'pace' },
    _react2.default.createElement('div', { className: 'pace-activity' })
  );

  if (_Config2.default.get('featureLogin')) {
    if (!user) {
      return spinner;
    }
    var profile = user.get('profile');
    var userId = profile.sub;
    var email = profile.email;

    _reactGa2.default.set({ userId: userId });
    _ravenJs2.default.setUserContext({ email: email, id: userId });
  } else {
    return children;
  }

  if (!havePrivilegesLoaded()) {
    _log2.default.debug('PermissionHandler - Will call fetchPrivilegesIfNeeded()');
    props.fetchPrivilegesIfNeeded();
    return spinner;
  }

  if (_is_js2.default.undefined(permissionChecks)) {
    return children;
  }

  var forbiddenRoute = permissionChecks.find(function (_ref) {
    var canAccess = _ref.canAccess;
    return !canAccess(props);
  });
  if (_is_js2.default.undefined(forbiddenRoute)) {
    return children;
  }

  return _react2.default.createElement(_AuthorisationErrorPage2.default, props);
};

AuthorizationHandler.propTypes = {
  user: _propTypes2.default.shape({
    get: _propTypes2.default.function
  }),
  permissionChecks: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    canAccess: _propTypes2.default.func.isRequired
  })),
  children: _propTypes2.default.node,
  havePrivilegesLoaded: _propTypes2.default.func.isRequired,
  fetchPrivilegesIfNeeded: _propTypes2.default.func.isRequired
};

function mapStateToProps(state, _ref2) {
  var routes = _ref2.routes;

  var user = state.get('singleSignOn').get('user');
  var permissionChecks = routes.filter(function (route) {
    if (_is_js2.default.not.existy(route.canAccess)) {
      return false;
    }

    if (!PRODUCTION) {
      if (_is_js2.default.not.function(route.canAccess)) {
        throw new Error('canAccess in the route configuration should be a function');
      }
    }

    return true;
  });

  return { user: user, permissionChecks: permissionChecks, config: _ErrorPageConfig2.default.get(routes) };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(_Privileges.actions, dispatch);
}

exports.default = (0, _connect2.default)(mapStateToProps, mapDispatchToProps)((0, _pure2.default)(AuthorizationHandler));
//# sourceMappingURL=index.js.map
