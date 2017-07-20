import 'assets/styles/base.postcss';

import { setupStore } from './setupStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  SingleSignOnProvider,
  IdleTimeoutHandler,
  routes as singleSignOnRoutes,
} from 'containers/SingleSignOn';
import { Router, browserHistory } from 'react-router';
import Store from 'domain/Store';
import parseRoutes from 'domain/parseRoutes';
import App from 'components/App';
import is from 'is_js';
import AuthorizationHandler from 'containers/AuthorizationHandler';
import ErrorPageHandler from 'containers/ErrorPageHandler';
import LoadingOverlayHandler from 'containers/LoadingOverlayHandler';
import SaveBarHandler from 'containers/SaveBarHandler';
import NoMatchingRouteErrorHandler from 'containers/NoMatchingRouteErrorHandler';
import ErrorMessage from 'domain/ErrorMessage';
import ReactAI from 'react-appinsights';
import Config from 'domain/Config';
import Oidc from 'oidc-client';
import ReactGA from 'react-ga';
import Raven from 'raven-js';
import bindPolyfills from 'domain/Polyfills';
import log from 'domain/log';

bindPolyfills();

if (PRODUCTION) {
  ReactAI.init({ instrumentationKey: Config.get('appInsights') }, browserHistory);
}

Oidc.Log.logger = log;
Oidc.Log.level = PRODUCTION ? Oidc.Log.WARN : Oidc.Log.INFO;

Raven.config(Config.get('sentryDsn'), {
  release: COMMIT,
  environment: Config.get('sentryEnvironment'),
  tags: { version: VERSION },
  debug: ! PRODUCTION,
}).install();

export function setupApp({ routes, reducer, errorMessageMap }) {
  const { store, syncBrowserHistory } = setupStore(reducer);

  Store.set(store);
  ErrorMessage.setMap(errorMessageMap);

  const gaKey = Config.get('gaKey');
  if (Config.get('gaKey')) {
    ReactGA.initialize(gaKey,
      {
        debug: ! PRODUCTION,
        titleCase: false,
        gaOptions: { siteSpeedSampleRate: 100 },
      });
  }

  const parsedRoutes = parseRoutes([
    {
      path: '/health-check',
    },
    ...singleSignOnRoutes,
    {
      component: IdleTimeoutHandler,
      childRoutes: [{
        component: App,
        childRoutes: [
          {
            component: LoadingOverlayHandler,
            childRoutes: [{
              component: AuthorizationHandler,
              childRoutes: [{
                component: ErrorPageHandler,
                childRoutes: [{
                  component: SaveBarHandler,
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
        <Router history={syncBrowserHistory} routes={parsedRoutes} onUpdate={logPageView} />
      </SingleSignOnProvider>
    </Provider>,
    document.getElementById('root')
  );
}

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export default setupApp;
