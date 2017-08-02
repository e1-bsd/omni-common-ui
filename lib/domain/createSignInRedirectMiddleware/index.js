'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSignInRedirectMiddleware = createSignInRedirectMiddleware;

var _log = require('./../log');

var _log2 = _interopRequireDefault(_log);

var _ApiCalls = require('./../../containers/ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _actions = require('./../../data/SingleSignOn/actions');

var _SingleSignOn = require('./../../data/SingleSignOn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var triggerSignInRedirectFlow = function triggerSignInRedirectFlow(returnUrl) {
  sessionStorage.lastUrlPath = returnUrl || location.pathname + location.search;
  (0, _SingleSignOn.createUserManager)().signInRedirectWithValidation();
};

var triggerSignOutRedirectFlow = function triggerSignOutRedirectFlow(returnUrl) {
  sessionStorage.lastUrlPath = returnUrl || location.pathname + location.search;
  (0, _SingleSignOn.createUserManager)().forceSignOutRedirect();
};

function createSignInRedirectMiddleware() {
  return function (store) {
    return function (next) {
      return function (action) {
        // bounce any 401s to the login page
        if (_ApiCalls2.default.Action.isApiAction(action) && _ApiCalls2.default.Action.isFailure(action) && action.error.status === 401) {
          // going back to the current URL might put us in a loop!
          triggerSignInRedirectFlow(action.returnUrl || '/');

          // handle trigger and state change actions
        } else {
          switch (action.type) {
            case _actions.LOAD_USER_ERROR:
            case _actions.USER_EXPIRED:
            case _actions.USER_NOT_FOUND:
            case _actions.SESSION_TERMINATED:
              if (location.pathname === '/callback') break; // still processing the callback
              _log2.default.info('createSignInRedirectMiddleware: Caught an invalid user/session action. Redirecting.');
            // intentionally fall through to the next case!
            case _actions.TRIGGER_SIGNIN_REDIRECT:
              // eslint-disable-line
              triggerSignInRedirectFlow(action.returnUrl);
              // in impersonate mode this prevents an infinite loop
              if (action.type === _actions.TRIGGER_SIGNIN_REDIRECT) {
                store.dispatch({ type: _actions.TRIGGER_USER_CLEAR });
              }
              break;
            case _actions.USER_SIGNED_OUT:
            case _actions.TRIGGER_SIGNOUT_REDIRECT:
              triggerSignOutRedirectFlow(action.returnUrl);
              break;
            default:
              break;
          }
        }

        return next(action);
      };
    };
  };
}

exports.default = createSignInRedirectMiddleware;
//# sourceMappingURL=index.js.map
