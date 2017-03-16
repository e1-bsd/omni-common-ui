import { UserManager } from 'oidc-client';
import log from 'domain/log';
import Config from 'domain/Config';
import { CALLBACK_PATH, SILENT_PATH } from './paths';

const baseUrl = (() => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port ?
      `:${window.location.port}` :
      '';

  return `${protocol}//${hostname}${port}`;
})();

log.debug('SingleSignOn - userManager - ssoClientId', Config.get('ssoClientId'));
log.debug('SingleSignOn - userManager - ssoAuthorityUrl', Config.get('ssoAuthorityUrl'));

const userManager = new UserManager({
  client_id: Config.get('ssoClientId'),
  redirect_uri: `${baseUrl}${CALLBACK_PATH}`,
  response_type: 'token id_token',
  scope: 'openid profile email e1SystemAPI',
  authority: Config.get('ssoAuthorityUrl'),
  silent_redirect_uri: `${baseUrl}${SILENT_PATH}`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
});

export default userManager;
