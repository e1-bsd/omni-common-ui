import App from 'components/App';
import All from 'components/All';
import { routes as buttons } from 'containers/ButtonShowcase';
import { routes as cards } from 'containers/CardShowcase';
import { routes as dialogs } from 'containers/DialogShowcase';
import { routes as forms } from 'containers/FormShowcase';
import { routes as profile } from 'containers/ProfileShowcase';
import { routes as tables } from 'containers/TableShowcase';
import { routes as topnav } from 'containers/TopNavShowcase';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: All,
  },
  childRoutes: [
    buttons,
    cards,
    dialogs,
    forms,
    profile,
    tables,
    topnav,
  ],
};
