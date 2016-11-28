import userManager from './userManager';
import _SingleSignOnHandler from './SingleSignOnHandler';
import _reducer from './reducer';
import _routes, { singleSignOnSilentRenewRoutes } from './routes';
import createOidcMiddleware from 'redux-oidc';
import _SingleSignOnProvider from './SingleSignOnProvider';

export const SingleSignOnHandler = _SingleSignOnHandler;
export const reducer = _reducer;
export const routes = [_routes, singleSignOnSilentRenewRoutes];
export const singleSignOnMiddleware = createOidcMiddleware(userManager, null, true);
export const SingleSignOnProvider = _SingleSignOnProvider;
