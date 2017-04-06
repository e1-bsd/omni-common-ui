import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { createHistory, useBasename, useBeforeUnload } from 'history';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, LOCATION_CHANGE } from 'react-router-redux';
import { singleSignOnMiddleware, reducer as singleSignOn } from 'containers/SingleSignOn';
import { reducer as privileges } from 'containers/Privileges';
import { reducer as impersonate } from 'containers/Impersonate';
import { combineReducers } from 'redux-immutable';
import { reducer as apiCalls } from 'containers/ApiCalls';
import log from 'domain/log';

if (! PRODUCTION) {
  installDevTools(Immutable);
}

export function setupStore(reducer) {
  const browserHistory = useRouterHistory(useBeforeUnload(useBasename(createHistory)))({
    basename: '',
  });

  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const createStoreWithMiddleware = compose(
    applyMiddleware(
      singleSignOnMiddleware,
      reduxRouterMiddleware,
      thunk,
      getLoggerMiddleware()
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
    rootReducer: combineReducers(reducer),
    routing,
    singleSignOn,
    privileges,
    impersonate,
    apiCalls,
  });
}

function routing(state = Immutable.fromJS({ locationBeforeTransitions: null }), action) {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
}

function getLoggerMiddleware() {
  if (PRODUCTION) {
    return () => (next) => (action) => {
      try {
        log.debug('Dispatched action:', JSON.stringify(action, null, 2));
      } catch (e) {
        log.warn('Could not log action:', e);
      }

      return next(action);
    };
  }

  return createLogger();
}

export default setupStore;
