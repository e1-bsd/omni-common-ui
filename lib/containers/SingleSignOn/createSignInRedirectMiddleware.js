'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSignInRedirectMiddleware = createSignInRedirectMiddleware;

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _actions = require('./../../data/SingleSignOn/actions');

var _SingleSignOn = require('./../../data/SingleSignOn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSignInRedirectMiddleware() {
  return function () {
    return function (next) {
      return function (action) {
        switch (action.type) {
          case _actions.USER_EXPIRED:
          case _actions.USER_NOT_FOUND:
          case _actions.LOAD_USER_ERROR:
          case _actions.SESSION_TERMINATED:
            if (location.pathname === '/callback') break; // still processing the callback
            _log2.default.info('createSignInRedirectMiddleware: Caught an invalid user/session action. Redirecting.');
            sessionStorage.lastUrlPath = location.pathname + location.search;
            (0, _SingleSignOn.createUserManager)().signInRedirectWithValidation();
            break;
          case _actions.TRIGGER_SIGNOUT_REDIRECT:
            sessionStorage.lastUrlPath = action.returnUrl || location.pathname + location.search;
            (0, _SingleSignOn.createUserManager)().forceSignOutRedirect();
            break;
          default:
            break;
        }
        return next(action);
      };
    };
  };
}

exports.default = createSignInRedirectMiddleware;
//# sourceMappingURL=createSignInRedirectMiddleware.js.map
