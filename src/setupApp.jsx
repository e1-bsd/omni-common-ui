import 'assets/styles/base/base.postcss';

import { setupStore } from './setupStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  SingleSignOnHandler,
  SingleSignOnProvider,
  routes as singleSignOnRoutes,
} from 'containers/SingleSignOn';
import { Router } from 'react-router';
import log from 'loglevel';
import Store from 'domain/Store';
import parseRoutes from 'domain/parseRoutes';
import App from 'components/App';
import is from 'is_js';
import PermissionHandler from 'containers/PermissionHandler';
import ErrorPageHandler from 'containers/ErrorPageHandler';
import LoadingOverlayHandler from 'containers/LoadingOverlayHandler';
import SavingBarHandler from 'containers/SavingBarHandler';
import NoMatchingRouteErrorHandler from 'containers/NoMatchingRouteErrorHandler';

if (! PRODUCTION) {
  log.enableAll();
} else {
  log.setLevel('error');
}

export function setupApp(routes, reducer) {
  const { store, syncBrowserHistory } = setupStore(reducer);
  Store.set(store);

  const parsedRoutes = parseRoutes([
    {
      path: '/health-check',
    },
    singleSignOnRoutes,
    {
      component: SingleSignOnHandler,
      childRoutes: [{
        component: App,
        childRoutes: [
          {
            component: PermissionHandler,
            childRoutes: [{
              component: ErrorPageHandler,
              childRoutes: [{
                component: SavingBarHandler,
                childRoutes: [{
                  component: LoadingOverlayHandler,
                  childRoutes: is.array(routes) ? routes : [routes],
                }],
              }],
            }],
          },
          {
            path: '*',
            component: NoMatchingRouteErrorHandler,
          },
        ],
      }],
    },
  ], store);

  render(
    <Provider store={store}>
      <SingleSignOnProvider store={store}>
        <Router history={syncBrowserHistory} routes={parsedRoutes} />
      </SingleSignOnProvider>
    </Provider>,
    document.getElementById('root')
  );
}

export default setupApp;
