import App from 'components/App';
import All from 'components/All';
import { routes as buttonShowcase } from 'containers/ButtonShowcase';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: All,
  },
  childRoutes: [
    buttonShowcase,
  ],
};
