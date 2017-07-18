import _userManager from './userManager';
import _SingleSignOnHandler from './SingleSignOnHandler';
import _routes, { singleSignOnSilentRenewRoutes } from './routes';
import _SingleSignOnProvider from './SingleSignOnProvider';
import _IdleTimeoutHandler from './IdleTimeoutHandler';

export const SingleSignOnHandler = _SingleSignOnHandler;
export const routes = [_routes, singleSignOnSilentRenewRoutes];
export const SingleSignOnProvider = _SingleSignOnProvider;
export const IdleTimeoutHandler = _IdleTimeoutHandler;
export const userManager = _userManager;
