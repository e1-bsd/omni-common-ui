import log from 'domain/log';
import {
  USER_EXPIRED,
  USER_NOT_FOUND,
  LOAD_USER_ERROR,
  SESSION_TERMINATED,
  TRIGGER_SIGNOUT_REDIRECT,
} from 'data/SingleSignOn/actions';
import { createUserManager } from 'data/SingleSignOn';

export function createSignInRedirectMiddleware() {
  return () => (next) => (action) => {
    switch (action.type) {
      case USER_EXPIRED:
      case USER_NOT_FOUND:
      case LOAD_USER_ERROR:
      case SESSION_TERMINATED:
        if (location.pathname === '/callback') break;  // still processing the callback
        log.info('createSignInRedirectMiddleware: Caught an invalid user/session action. Redirecting.');
        sessionStorage.lastUrlPath =
            location.pathname + location.search;
        createUserManager().signInRedirectWithValidation();
        break;
      case TRIGGER_SIGNOUT_REDIRECT:
        sessionStorage.lastUrlPath =
            action.returnUrl || location.pathname + location.search;
        createUserManager().forceSignOutRedirect();
        break;
      default: break;
    }
    return next(action);
  };
}

export default createSignInRedirectMiddleware;