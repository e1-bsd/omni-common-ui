import { createUserManager } from 'redux-oidc';
import Config from 'domain/Config';
import log from 'loglevel';

const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port ?
    `:${window.location.port}` :
    '';

log.debug('SingleSignOn - userManager - ssoClientId', Config.ssoClientId);
log.debug('SingleSignOn - userManager - ssoAuthorityUrl', Config.ssoAuthorityUrl);

const userManagerConfig = {
  client_id: Config.ssoClientId,
  redirect_uri: `${protocol}//${hostname}${port}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile email e1SystemAPI',
  authority: Config.ssoAuthorityUrl,
  silent_redirect_uri: `${protocol}//${hostname}${port}/`,
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
