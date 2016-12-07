import { createUserManager } from 'redux-oidc';
import log from 'loglevel';

const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port ?
    `:${window.location.port}` :
    '';

log.debug('SingleSignOn - userManager - ssoClientId', CONFIG.ssoClientId);
log.debug('SingleSignOn - userManager - ssoAuthorityUrl', CONFIG.ssoAuthorityUrl);

const userManagerConfig = {
  client_id: CONFIG.ssoClientId,
  redirect_uri: `${protocol}//${hostname}${port}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile email e1SystemAPI',
  authority: CONFIG.ssoAuthorityUrl,
  silent_redirect_uri: `${protocol}//${hostname}${port}/silent-renew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
