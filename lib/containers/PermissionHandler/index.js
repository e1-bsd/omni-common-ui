'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PermissionHandler = undefined;
exports.mapStateToProps = mapStateToProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PermissionHandler = exports.PermissionHandler = function PermissionHandler(props) {
  var permissionChecks = props.permissionChecks,
      children = props.children,
      havePrivilegesLoaded = props.havePrivilegesLoaded;

  if (_Config2.default.get('featureLogin') !== true) {
    return children;
  }

  if (!havePrivilegesLoaded()) {
    return null;
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

PermissionHandler.propTypes = {
  permissionChecks: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    canAccess: _propTypes2.default.func.isRequired
  })),
  children: _propTypes2.default.node,
  havePrivilegesLoaded: _propTypes2.default.func.isRequired
};

function mapStateToProps(state, _ref2) {
  var routes = _ref2.routes;

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

  return { permissionChecks: permissionChecks, config: _ErrorPageConfig2.default.get(routes) };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(_Privileges.actions, dispatch);
}

exports.default = (0, _connect2.default)(mapStateToProps, mapDispatchToProps)((0, _pure2.default)(PermissionHandler));
//# sourceMappingURL=index.js.map
