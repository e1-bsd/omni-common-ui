'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupStore = setupStore;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _immutableDevtools = require('immutable-devtools');

var _immutableDevtools2 = _interopRequireDefault(_immutableDevtools);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reduxImmutable = require('redux-immutable');

var _reactRouter = require('react-router');

var _history = require('history');

var _reactRouterRedux = require('react-router-redux');

var _SingleSignOn = require('./data/SingleSignOn');

var _Privileges = require('./containers/Privileges');

var _Impersonate = require('./containers/Impersonate');

var _ApiCalls = require('./containers/ApiCalls');

var _SingleSignOn2 = require('./containers/SingleSignOn');

var _createLoggerMiddleware = require('./domain/createLoggerMiddleware');

var _createLoggerMiddleware2 = _interopRequireDefault(_createLoggerMiddleware);

var _createNotificationsMiddleware = require('./domain/createNotificationsMiddleware');

var _createNotificationsMiddleware2 = _interopRequireDefault(_createNotificationsMiddleware);

var _Config = require('./domain/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!PRODUCTION) {
  (0, _immutableDevtools2.default)(_immutable2.default);
}

function setupStore(reducer) {
  var browserHistory = (0, _reactRouter.useRouterHistory)((0, _history.useBeforeUnload)((0, _history.useBasename)(_history.createHistory)))({
    basename: ''
  });

  var notificationsTriggerConfig = _Config2.default.get('notificationsTrigger');

  var reduxRouterMiddleware = (0, _reactRouterRedux.routerMiddleware)(browserHistory);
  var createStoreWithMiddleware = (0, _redux.compose)(_redux.applyMiddleware.apply(this, [reduxRouterMiddleware, _reduxThunk2.default, (0, _SingleSignOn2.createSignInRedirectMiddleware)(), (0, _createLoggerMiddleware2.default)(), notificationsTriggerConfig ? (0, _createNotificationsMiddleware2.default)(notificationsTriggerConfig) : undefined].filter(function (i) {
    return i;
  })))(_redux.createStore);

  var store = createStoreWithMiddleware(createReducer(reducer), window.devToolsExtension && window.devToolsExtension());

  var syncBrowserHistory = (0, _reactRouterRedux.syncHistoryWithStore)(browserHistory, store, {
    selectLocationState: function selectLocationState(state) {
      return state.get('routing').toJS();
    }
  });

  if (_Config2.default.get('featureLogin')) {
    (0, _SingleSignOn.loadUser)(store, (0, _SingleSignOn.createUserManager)());
  }

  return { store: store, syncBrowserHistory: syncBrowserHistory };
}

function createReducer(reducer) {
  return (0, _reduxImmutable.combineReducers)({
    rootReducer: (0, _reduxImmutable.combineReducers)(reducer),
    routing: routing,
    singleSignOn: _SingleSignOn.reducer,
    privileges: _Privileges.reducer,
    impersonate: _Impersonate.reducer,
    apiCalls: _ApiCalls.reducer
  });
}

function routing() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _immutable2.default.fromJS({ locationBeforeTransitions: null });
  var action = arguments[1];

  if (action.type === _reactRouterRedux.LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload
    });
  }

  return state;
}

exports.default = setupStore;
//# sourceMappingURL=setupStore.js.map
