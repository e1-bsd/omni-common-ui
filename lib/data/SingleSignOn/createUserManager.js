'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oidcClient = require('oidc-client');

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var memoizeCache = {};

var memoize = function memoize(fn) {
  return function (arg) {
    var ret = memoizeCache[arg] || fn(arg);
    memoizeCache[arg] = ret;
    return ret;
  };
};

var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = window.location.port ? ':' + window.location.port : '';

_log2.default.debug('SingleSignOn - userManager - ssoClientId', _Config2.default.get('ssoClientId'));
_log2.default.debug('SingleSignOn - userManager - ssoAuthorityUrl', _Config2.default.get('ssoAuthorityUrl'));

var userManagerConfig = {
  client_id: _Config2.default.get('ssoClientId'),
  redirect_uri: protocol + '//' + hostname + port + '/callback',
  response_type: 'token id_token',
  scope: 'openid profile email e1SystemAPI',
  authority: _Config2.default.get('ssoAuthorityUrl'),
  silent_redirect_uri: protocol + '//' + hostname + port + '/silent-renew',
  automaticSilentRenew: true,
  filterProtocolClaims: true
};

var createCustomUserManager = memoize(function (config) {
  var newUserManager = new _oidcClient.UserManager(config);
  newUserManager.forceSignOutRedirect = function () {
    newUserManager.signOut = true;
    newUserManager.signoutRedirect();
  };
  newUserManager.signInRedirectWithValidation = function () {
    if (newUserManager.signOut === true) return;
    newUserManager.signinRedirect();
  };
  // fix casing in these inherited methods
  newUserManager.signInRedirect = function () {
    return newUserManager.signinRedirect();
  };
  newUserManager.signOutRedirect = function () {
    return newUserManager.signoutRedirect();
  };
  newUserManager.signInSilentCallback = function () {
    return newUserManager.signinSilentCallback();
  };
  return newUserManager;
});

var createUserManager = function createUserManager() {
  return createCustomUserManager(userManagerConfig);
};

exports.default = createUserManager;
//# sourceMappingURL=createUserManager.js.map
