import SingleSignOnCallback from './SingleSignOnCallback';
import SingleSignOnSilentRenew from './SingleSignOnSilentRenew';

export default {
  path: '/callback',
  component: SingleSignOnCallback,
}

export const singleSignOnSilentRenewRoutes = {
  path: '/silent-renew',
  component: SingleSignOnSilentRenew,
};
