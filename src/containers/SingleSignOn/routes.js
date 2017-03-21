import SingleSignOnRedirectCallback from './SingleSignOnRedirectCallback';
import SingleSignOnSilentCallback from './SingleSignOnSilentCallback';
import { CALLBACK_PATH, SILENT_PATH } from './paths';

export default {
  childRoutes: [
    {
      path: CALLBACK_PATH,
      component: SingleSignOnRedirectCallback,
    },
    {
      path: SILENT_PATH,
      component: SingleSignOnSilentCallback,
    },
  ],
};
