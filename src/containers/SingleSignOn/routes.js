import SingleSignOnPopUpCallback from './SingleSignOnPopUpCallback';
import SingleSignOnSilentCallback from './SingleSignOnSilentCallback';
import { CALLBACK_PATH, SILENT_PATH } from './paths';

export default {
  childRoutes: [
    {
      path: CALLBACK_PATH,
      component: SingleSignOnPopUpCallback,
    },
    {
      path: SILENT_PATH,
      component: SingleSignOnSilentCallback,
    },
  ],
};
