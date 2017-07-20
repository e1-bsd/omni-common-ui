import _OidcProvider from './OidcProvider';
import _CallbackComponent from './CallbackComponent';
import _SingleSignOnProvider from './SingleSignOnProvider';
import _IdleTimeoutHandler from './IdleTimeoutHandler';
import _createSigninRedirectMiddleware from './createSigninRedirectMiddleware';
import _routes, { singleSignOnSilentRenewRoutes } from './routes';

export const OidcProvider = _OidcProvider;
export const CallbackComponent = _CallbackComponent;
export const SingleSignOnProvider = _SingleSignOnProvider;
export const IdleTimeoutHandler = _IdleTimeoutHandler;
export const createSigninRedirectMiddleware = _createSigninRedirectMiddleware;
export const routes = [_routes, singleSignOnSilentRenewRoutes];
