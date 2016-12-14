import 'assets/styles/base/base.postcss';

import { setupStore } from './setupStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  SingleSignOnHandler,
  SingleSignOnProvider,
  routes as singleSignOnRoutes,
  IdleTimeoutHandler,
} from 'containers/SingleSignOn';
import { Router, browserHistory } from 'react-router';
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
import ErrorMessage from 'domain/ErrorMessage';
import ReactAI from 'react-appinsights';
import Config from 'domain/Config';
import Oidc from 'oidc-client';

if (! PRODUCTION) {
  log.enableAll();
} else {
  log.setLevel('error');
  ReactAI.init({ instrumentationKey: Config.get('appInsights') }, browserHistory);
}

Oidc.Log.logger = log;
Oidc.Log.level = Oidc.Log.INFO;

export function setupApp({ routes, reducer, errorMessageMap }) {
  const { store, syncBrowserHistory } = setupStore(reducer);

  Store.set(store);
  ErrorMessage.setMap(errorMessageMap);

  const parsedRoutes = parseRoutes([
    {
      path: '/health-check',
    },
    ...singleSignOnRoutes,
    {
      component: SingleSignOnHandler,
      childRoutes: [{
        component: IdleTimeoutHandler,
        childRoutes: [{
          component: App,
          childRoutes: [
            {
              component: LoadingOverlayHandler,
              childRoutes: [{
                component: PermissionHandler,
                childRoutes: [{
                  component: ErrorPageHandler,
                  childRoutes: [{
                    component: SavingBarHandler,
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
