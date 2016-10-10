import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { createHistory, useBasename, useBeforeUnload } from 'history';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { singleSignOnMiddleware, reducer as singleSignOn } from 'containers/SingleSignOn';
import { reducer as privileges } from 'containers/Privileges';
import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';
import is from 'is_js';

if (DEVELOPMENT) {
  installDevTools(Immutable);
}

export function setupStore(reducer) {
  const browserHistory = useRouterHistory(useBeforeUnload(useBasename(createHistory)))({
    basename: '/',
  });

  const loggerMiddleware = createLogger();
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const createStoreWithMiddleware = compose(
    applyMiddleware(
      singleSignOnMiddleware,
      reduxRouterMiddleware,
      thunk,
      loggerMiddleware
    )
  )(createStore);

  const store = createStoreWithMiddleware(createReducer(reducer),
      window.devToolsExtension && window.devToolsExtension());

  const syncBrowserHistory = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.get('routing').toJS(),
  });

  return { store, syncBrowserHistory };
}

function createReducer(reducer) {
  return combineReducers({
    rootReducer: buildRootReducer(reducer),
    routing: routerReducer,
    singleSignOn,
  });
}

function buildRootReducer(reducer) {
  if (is.not.object(reducer) || is.empty(reducer)) {
    return combineReducers({ privileges });
  }

  return combineReducers(Object.assign({ privileges }, reducer));
}

export default setupStore;
