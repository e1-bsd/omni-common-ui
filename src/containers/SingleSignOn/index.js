import _userManager from './userManager';
import _SingleSignOnHandler from './SingleSignOnHandler';
import _reducer from './reducer';
import _routes, { singleSignOnSilentRenewRoutes } from './routes';
import createOidcMiddleware from 'redux-oidc';
import _SingleSignOnProvider from './SingleSignOnProvider';
import _IdleTimeoutHandler from './IdleTimeoutHandler';
import Config from 'domain/Config';

export const SingleSignOnHandler = _SingleSignOnHandler;
export const reducer = _reducer;
export const routes = [_routes, singleSignOnSilentRenewRoutes];
export const singleSignOnMiddleware = Config.get('featureLogin') === true ?
    createOidcMiddleware(_userManager, null, true) :
    () => (next) => (action) => next(action); // Just an dummy middleware.
export const SingleSignOnProvider = _SingleSignOnProvider;
export const IdleTimeoutHandler = _IdleTimeoutHandler;
export const userManager = _userManager;
