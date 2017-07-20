import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { useRouterHistory } from 'react-router';
import { createHistory, useBasename, useBeforeUnload } from 'history';
import { syncHistoryWithStore, routerMiddleware, LOCATION_CHANGE } from 'react-router-redux';
import { createUserManager, loadUser, reducer as oidcStateReducer } from 'data/SingleSignOn';
import { reducer as privileges } from 'containers/Privileges';
import { reducer as impersonate } from 'containers/Impersonate';
import { reducer as apiCalls } from 'containers/ApiCalls';
import { createSignInRedirectMiddleware } from 'containers/SingleSignOn';
import createLoggerMiddleware from 'domain/createLoggerMiddleware';
import createNotificationsMiddleware from 'domain/createNotificationsMiddleware';
import Config from 'domain/Config';

if (! PRODUCTION) {
  installDevTools(Immutable);
}

export function setupStore(reducer) {
  const browserHistory = useRouterHistory(useBeforeUnload(useBasename(createHistory)))({
    basename: '',
  });

  const notificationsTriggerConfig = Config.get('notificationsTrigger');

  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const createStoreWithMiddleware = compose(
    applyMiddleware.apply(this, [
      reduxRouterMiddleware,
      thunk,
      createSignInRedirectMiddleware(),
      createLoggerMiddleware(),
      notificationsTriggerConfig ?
          createNotificationsMiddleware(notificationsTriggerConfig) :
          undefined,
    ].filter((i) => i))
  )(createStore);

  const store = createStoreWithMiddleware(createReducer(reducer),
      window.devToolsExtension && window.devToolsExtension());

  const syncBrowserHistory = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.get('routing').toJS(),
  });

  if (Config.get('featureLogin')) {
    loadUser(store, createUserManager());
  }

  return { store, syncBrowserHistory };
}

function createReducer(reducer) {
  return combineReducers({
    rootReducer: combineReducers(reducer),
    routing,
    singleSignOn: oidcStateReducer,
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

export default setupStore;
