'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxOidc = require('redux-oidc');

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  filterProtocolClaims: true,
  loadUserInfo: true
};

var customUserManager = function customUserManager(userManager) {
  var newUserManager = userManager;
  newUserManager.forceSignoutRedirect = function () {
    newUserManager.signOut = true;
    newUserManager.signoutRedirect();
  };
  newUserManager.signinRedirectWithValidation = function () {
    if (newUserManager.signOut === true) return;
    newUserManager.signinRedirect();
  };

  return newUserManager;
};

var userManager = customUserManager((0, _reduxOidc.createUserManager)(userManagerConfig));

exports.default = userManager;
//# sourceMappingURL=userManager.js.map
