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
import { actions as Privileges } from 'containers/Privileges';
import PermissionHandler from 'containers/PermissionHandler';
import ErrorPageHandler from 'containers/ErrorPageHandler';
import LoadingOverlayHandler from 'containers/LoadingOverlayHandler';
import SavingBarHandler from 'containers/SavingBarHandler';

if (! PRODUCTION) {
  log.enableAll();
} else {
  log.setLevel('error');
}

export function setupApp(routes, reducer) {
  const { store, syncBrowserHistory } = setupStore(reducer);
  Store.set(store);

  const parsedRoutes = parseRoutes(({ getState }) => [
    {
      path: '/health-check',
    },
    singleSignOnRoutes,
    {
      component: SingleSignOnHandler,
      childRoutes: [{
        component: PermissionHandler,
        childRoutes: [{
          component: App,
          // This will block calling any other checkPrivileges() until the privileges are loaded.
          checkPrivileges: () => Privileges.isLoading(getState()),
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
        }],
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
