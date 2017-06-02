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

var _reduxLogger = require('redux-logger');

var _history = require('history');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _SingleSignOn = require('./containers/SingleSignOn');

var _Privileges = require('./containers/Privileges');

var _Impersonate = require('./containers/Impersonate');

var _reduxImmutable = require('redux-immutable');

var _ApiCalls = require('./containers/ApiCalls');

var _log = require('./domain/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!PRODUCTION) {
  (0, _immutableDevtools2.default)(_immutable2.default);
}

function setupStore(reducer) {
  var browserHistory = (0, _reactRouter.useRouterHistory)((0, _history.useBeforeUnload)((0, _history.useBasename)(_history.createHistory)))({
    basename: ''
  });

  var reduxRouterMiddleware = (0, _reactRouterRedux.routerMiddleware)(browserHistory);
  var createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)(_SingleSignOn.singleSignOnMiddleware, reduxRouterMiddleware, _reduxThunk2.default, getLoggerMiddleware()))(_redux.createStore);

  var store = createStoreWithMiddleware(createReducer(reducer), window.devToolsExtension && window.devToolsExtension());

  var syncBrowserHistory = (0, _reactRouterRedux.syncHistoryWithStore)(browserHistory, store, {
    selectLocationState: function selectLocationState(state) {
      return state.get('routing').toJS();
    }
  });

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

function getLoggerMiddleware() {
  if (PRODUCTION) {
    return function () {
      return function (next) {
        return function (action) {
          try {
            _log2.default.debug('Dispatched action:', JSON.stringify(action, null, 2));
          } catch (e) {
            _log2.default.warn('Could not log action:', e);
          }

          return next(action);
        };
      };
    };
  }

  return (0, _reduxLogger.createLogger)();
}

exports.default = setupStore;
//# sourceMappingURL=setupStore.js.map
