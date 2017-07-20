import _OidcProvider from './OidcProvider';
import _CallbackComponent from './CallbackComponent';
import _SingleSignOnProvider from './SingleSignOnProvider';
import _IdleTimeoutHandler from './IdleTimeoutHandler';
import _createSignInRedirectMiddleware from './createSignInRedirectMiddleware';
import _routes, { singleSignOnSilentRenewRoutes } from './routes';

export const OidcProvider = _OidcProvider;
export const CallbackComponent = _CallbackComponent;
export const SingleSignOnProvider = _SingleSignOnProvider;
export const IdleTimeoutHandler = _IdleTimeoutHandler;
export const createSignInRedirectMiddleware = _createSignInRedirectMiddleware;
export const routes = [_routes, singleSignOnSilentRenewRoutes];
