import App from 'components/App';
import All from 'components/All';
import { routes as breadcrumbs } from 'containers/BreadcrumbsShowcase';
import { routes as buttons } from 'containers/ButtonShowcase';
import { routes as cards } from 'containers/CardShowcase';
import { routes as personCards } from 'containers/PersonCardShowcase';
import { routes as dialogs } from 'containers/DialogShowcase';
import { routes as forms } from 'containers/FormShowcase';
import { routes as progressBars } from 'containers/ProgressBarShowcase';
import { routes as tabs } from 'containers/TabsShowcase';
import { routes as selectionTable } from 'containers/SelectionTableShowcase';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: All,
  },
  childRoutes: [
    breadcrumbs,
    buttons,
    cards,
    personCards,
    dialogs,
    forms,
    progressBars,
    tabs,
    selectionTable,
  ],
};
