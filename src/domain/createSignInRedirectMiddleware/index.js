import log from 'domain/log';
import ApiCall from 'containers/ApiCalls';
import {
  LOAD_USER_ERROR,
  USER_EXPIRED,
  USER_NOT_FOUND,
  USER_SIGNED_OUT,
  SESSION_TERMINATED,
  TRIGGER_USER_CLEAR,
  TRIGGER_SIGNIN_REDIRECT,
  TRIGGER_SIGNOUT_REDIRECT,
} from 'data/SingleSignOn/actions';
import { createUserManager } from 'data/SingleSignOn';

const triggerSignInRedirectFlow = (returnUrl) => {
  sessionStorage.lastUrlPath =
      returnUrl || location.pathname + location.search;
  createUserManager().signInRedirectWithValidation();
};

const triggerSignOutRedirectFlow = (returnUrl) => {
  sessionStorage.lastUrlPath =
      returnUrl || location.pathname + location.search;
  createUserManager().forceSignOutRedirect();
};

export function createSignInRedirectMiddleware() {
  return (store) => (next) => (action) => {
    // bounce any 401s to the login page
    if (ApiCall.Action.isApiAction(action) &&
        ApiCall.Action.isFailure(action) &&
        action.error.status === 401) {
      // going back to the current URL might put us in a loop!
      triggerSignInRedirectFlow(action.returnUrl || '/');

    // handle trigger and state change actions
    } else {
      switch (action.type) {
        case LOAD_USER_ERROR:
        case USER_EXPIRED:
        case USER_NOT_FOUND:
        case SESSION_TERMINATED:
          if (location.pathname === '/callback') break;  // still processing the callback
          log.info('createSignInRedirectMiddleware: Caught an invalid user/session action. Redirecting.');
          // intentionally fall through to the next case!
        case TRIGGER_SIGNIN_REDIRECT:  // eslint-disable-line
          triggerSignInRedirectFlow(action.returnUrl);
          // in impersonate mode this prevents an infinite loop
          if (action.type === TRIGGER_SIGNIN_REDIRECT) {
            store.dispatch({ type: TRIGGER_USER_CLEAR });
          }
          break;
        case USER_SIGNED_OUT:
        case TRIGGER_SIGNOUT_REDIRECT:
          triggerSignOutRedirectFlow(action.returnUrl);
          break;
        default: break;
      }
    }

    return next(action);
  };
}

export default createSignInRedirectMiddleware;
