import 'normalize.css/normalize.css';
import 'assets/styles/base/base.postcss';

import { setupStore } from './setupStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { SingleSignOnProvider } from 'containers/SingleSignOn';
import { Router } from 'react-router';
import log from 'loglevel';
import Store from 'domain/Store';
import is from 'is_js';

if (! PRODUCTION) {
  log.enableAll();
} else {
  log.setLevel('error');
}

export function setupApp(routes, reducer) {
  const { store, syncBrowserHistory } = setupStore(reducer);
  Store.set(store);

  render(
    <Provider store={store}>
      <SingleSignOnProvider store={store}>
        <Router history={syncBrowserHistory} routes={parseRoutes(routes, store)} />
      </SingleSignOnProvider>
    </Provider>,
    document.getElementById('root')
  );
}

export default setupApp;

function parseRoutes(routes, store) {
  if (is.array(routes)) {
    return routes.map((route) => parseRoutes(route, store));
  }

  if (is.object(routes) && is.array(routes.childRoutes)) {
    routes.childRoutes = routes.childRoutes.map((route) => {
      if (is.not.function(route)) {
        return parseRoutes(route, store);
      }

      return parseRoutes(route(store), store);
    });

    return routes;
  }

  return routes;
}
