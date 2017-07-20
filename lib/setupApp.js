'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupApp = setupApp;

require('./assets/styles/base.postcss');

var _setupStore2 = require('./setupStore');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _SingleSignOn = require('./containers/SingleSignOn');

var _reactRouter = require('react-router');

var _Store = require('./domain/Store');

var _Store2 = _interopRequireDefault(_Store);

var _parseRoutes = require('./domain/parseRoutes');

var _parseRoutes2 = _interopRequireDefault(_parseRoutes);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _AuthorizationHandler = require('./containers/AuthorizationHandler');

var _AuthorizationHandler2 = _interopRequireDefault(_AuthorizationHandler);

var _ErrorPageHandler = require('./containers/ErrorPageHandler');

var _ErrorPageHandler2 = _interopRequireDefault(_ErrorPageHandler);

var _LoadingOverlayHandler = require('./containers/LoadingOverlayHandler');

var _LoadingOverlayHandler2 = _interopRequireDefault(_LoadingOverlayHandler);

var _SaveBarHandler = require('./containers/SaveBarHandler');

var _SaveBarHandler2 = _interopRequireDefault(_SaveBarHandler);

var _NoMatchingRouteErrorHandler = require('./containers/NoMatchingRouteErrorHandler');

var _NoMatchingRouteErrorHandler2 = _interopRequireDefault(_NoMatchingRouteErrorHandler);

var _ErrorMessage = require('./domain/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _reactAppinsights = require('react-appinsights');

var _reactAppinsights2 = _interopRequireDefault(_reactAppinsights);

var _Config = require('./domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _oidcClient = require('oidc-client');

var _oidcClient2 = _interopRequireDefault(_oidcClient);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _Polyfills = require('./domain/Polyfills');

var _Polyfills2 = _interopRequireDefault(_Polyfills);

var _log = require('./domain/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(0, _Polyfills2.default)();

if (PRODUCTION) {
  _reactAppinsights2.default.init({ instrumentationKey: _Config2.default.get('appInsights') }, _reactRouter.browserHistory);
}

_oidcClient2.default.Log.logger = _log2.default;
_oidcClient2.default.Log.level = PRODUCTION ? _oidcClient2.default.Log.WARN : _oidcClient2.default.Log.INFO;

_ravenJs2.default.config(_Config2.default.get('sentryDsn'), {
  release: COMMIT,
  environment: _Config2.default.get('sentryEnvironment'),
  tags: { version: VERSION },
  debug: !PRODUCTION
}).install();

function setupApp(_ref) {
  var routes = _ref.routes,
      reducer = _ref.reducer,
      errorMessageMap = _ref.errorMessageMap;

  var _setupStore = (0, _setupStore2.setupStore)(reducer),
      store = _setupStore.store,
      syncBrowserHistory = _setupStore.syncBrowserHistory;

  _Store2.default.set(store);
  _ErrorMessage2.default.setMap(errorMessageMap);

  var gaKey = _Config2.default.get('gaKey');
  if (_Config2.default.get('gaKey')) {
    _reactGa2.default.initialize(gaKey, {
      debug: !PRODUCTION,
      titleCase: false,
      gaOptions: { siteSpeedSampleRate: 100 }
    });
  }

  var parsedRoutes = (0, _parseRoutes2.default)([{
    path: '/health-check'
  }].concat(_toConsumableArray(_SingleSignOn.routes), [{
    component: _SingleSignOn.IdleTimeoutHandler,
    childRoutes: [{
      component: _App2.default,
      childRoutes: [{
        component: _LoadingOverlayHandler2.default,
        childRoutes: [{
          component: _AuthorizationHandler2.default,
          childRoutes: [{
            component: _ErrorPageHandler2.default,
            childRoutes: [{
              component: _SaveBarHandler2.default,
              childRoutes: _is_js2.default.array(routes) ? routes : [routes]
            }]
          }]
        }]
      }, {
        path: '*',
        component: _NoMatchingRouteErrorHandler2.default
      }]
    }]
  }]), store);

  (0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _SingleSignOn.SingleSignOnProvider,
      { store: store },
      _react2.default.createElement(_reactRouter.Router, { history: syncBrowserHistory, routes: parsedRoutes, onUpdate: logPageView })
    )
  ), document.getElementById('root'));
}

function logPageView() {
  _reactGa2.default.set({ page: window.location.pathname });
  _reactGa2.default.pageview(window.location.pathname);
}

exports.default = setupApp;
//# sourceMappingURL=setupApp.js.map
