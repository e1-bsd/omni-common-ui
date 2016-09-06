import 'normalize.css/normalize.css';
import 'assets/styles/base/base.postcss';

import { setupStore } from './setupStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { SingleSignOnProvider } from 'containers/SingleSignOn';
import { Router } from 'react-router';

export function setupApp(routes, reducer) {
  const { store, syncBrowserHistory } = setupStore(reducer);

  setImmediate(() => {
    render(
      <Provider store={store}>
        <SingleSignOnProvider store={store}>
          <Router history={syncBrowserHistory} routes={routes} />
        </SingleSignOnProvider>
      </Provider>,
      document.getElementById('root')
    );
  });

  return store;
}

export default setupApp;
