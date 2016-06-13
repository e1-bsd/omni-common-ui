import App from 'components/App';
import All from 'components/All';
import { routes as buttons } from 'containers/ButtonShowcase';
import { routes as cards } from 'containers/CardShowcase';
import { routes as dialogs } from 'containers/DialogShowcase';
import { routes as forms } from 'containers/FormShowcase';
import { routes as tables } from 'containers/TableShowcase';
import { routes as topNav } from 'containers/TopNavShowcase';
import { routes as progressBars } from 'containers/ProgressBarShowcase';
import { routes as tabs } from 'containers/TabsShowcase';

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
    tables,
    topNav,
    progressBars,
    tabs,
  ],
};
