import 'normalize.css/normalize.css';
import 'assets/styles/base/base.postcss';

import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { createHistory, useBasename } from 'history';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import reducer from './rootReducer';
import routes from './routes';
import Config from 'domain/Config';
import log from 'loglevel';

const browserHistory = useRouterHistory(useBasename(createHistory))({
  basename: Config.baseUrl,
});

const loggerMiddleware = createLogger();
const reduxRouterMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunk,
  loggerMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducer);
const syncBrowserHistory = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get('routing').toJS(),
});

if (! PRODUCTION) {
  log.enableAll();
}

render(
  <Provider store={store}>
    <Router history={syncBrowserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
