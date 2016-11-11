import 'assets/styles/base/base.postcss';

import { setupStore } from './setupStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { SingleSignOnProvider, routes as singleSignOnRoutes } from 'containers/SingleSignOn';
import { Router } from 'react-router';
import log from 'loglevel';
import Store from 'domain/Store';
import parseRoutes from 'domain/parseRoutes';
import App from 'components/App';
import is from 'is_js';

if (! PRODUCTION) {
  log.enableAll();
} else {
  log.setLevel('error');
}

export function setupApp(routes, reducer) {
  const { store, syncBrowserHistory } = setupStore(reducer);
  Store.set(store);

  const parsedRoutes = parseRoutes([
    singleSignOnRoutes,
    {
      component: App,
      childRoutes: is.array(routes) ? routes : [routes],
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
