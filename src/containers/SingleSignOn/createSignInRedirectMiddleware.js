import log from 'domain/log';
import {
  USER_EXPIRED,
  USER_NOT_FOUND,
  LOAD_USER_ERROR,
  USER_SIGNED_OUT,
  SESSION_TERMINATED,
  TRIGGER_SIGNIN_REDIRECT,
  TRIGGER_SIGNOUT_REDIRECT,
} from 'data/SingleSignOn/actions';
import { createUserManager } from 'data/SingleSignOn';

export function createSignInRedirectMiddleware() {
  return (store) => (next) => (action) => {
    switch (action.type) {
      case USER_EXPIRED:
      case USER_NOT_FOUND:
      case LOAD_USER_ERROR:
      case SESSION_TERMINATED:
        if (location.pathname === '/callback') break;  // still processing the callback
        log.info('createSignInRedirectMiddleware: Caught an invalid user/session action. Redirecting.');
        // intentionally fall through to the next case!
      case TRIGGER_SIGNIN_REDIRECT:  // eslint-disable-line
        sessionStorage.lastUrlPath =
            action.returnUrl || location.pathname + location.search;
        createUserManager().signInRedirectWithValidation();
        if (action.type === TRIGGER_SIGNIN_REDIRECT) {
          store.dispatch({ type: USER_SIGNED_OUT });
        }
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
