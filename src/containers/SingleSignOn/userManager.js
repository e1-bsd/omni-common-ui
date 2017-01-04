import { createUserManager } from 'redux-oidc';
import log from 'domain/log';
import Config from 'domain/Config';

const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port ?
    `:${window.location.port}` :
    '';

log.debug('SingleSignOn - userManager - ssoClientId', Config.get('ssoClientId'));
log.debug('SingleSignOn - userManager - ssoAuthorityUrl', Config.get('ssoAuthorityUrl'));

const userManagerConfig = {
  client_id: Config.get('ssoClientId'),
  redirect_uri: `${protocol}//${hostname}${port}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile email e1SystemAPI',
  authority: Config.get('ssoAuthorityUrl'),
  silent_redirect_uri: `${protocol}//${hostname}${port}/silent-renew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
