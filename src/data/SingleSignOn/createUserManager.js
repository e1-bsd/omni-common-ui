import { UserManager } from 'oidc-client';
import log from 'domain/log';
import Config from 'domain/Config';

const memoizeCache = {};

const memoize = (fn) => (arg) => {
  const ret = memoizeCache[arg] || fn(arg);
  memoizeCache[arg] = ret;
  return ret;
};

const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port ?
    `:${window.location.port}` :
    '';

log.debug('SingleSignOn - userManager - ssoClientId', Config.get('ssoClientId'));
log.debug('SingleSignOn - userManager - ssoAuthorityUrl', Config.get('ssoAuthorityUrl'));

const userManagerConfig = {
  acr_values: Config.get('ssoProvider') === undefined || Config.get('ssoProvider') === 'local' ?
    '' :
    `idp:${Config.get('ssoProvider')}`,
  client_id: Config.get('ssoClientId'),
  redirect_uri: `${protocol}//${hostname}${port}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile email e1SystemAPI',
  authority: Config.get('ssoAuthorityUrl'),
  silent_redirect_uri: `${protocol}//${hostname}${port}/sso-silent-renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  clockSkew: 1800, // 30 minutes
  checkSessionInterval: 60 * 1000 * 60 * 24 * 7,
};

const createCustomUserManager = memoize((config) => {
  const newUserManager = new UserManager(config);
  newUserManager.forceSignOutRedirect = () => {
    newUserManager.signOut = true;
    newUserManager.signoutRedirect();
  };
  newUserManager.signInRedirectWithValidation = () => {
    if (newUserManager.signOut === true) return;
    newUserManager.signinRedirect();
  };
  // fix casing in these inherited methods
  newUserManager.signInRedirect = () => newUserManager.signinRedirect();
  newUserManager.signOutRedirect = () => newUserManager.signoutRedirect();
  newUserManager.signInSilentCallback = () => newUserManager.signinSilentCallback();
  return newUserManager;
});

const createUserManager = () =>
  createCustomUserManager(userManagerConfig);

export default createUserManager;
