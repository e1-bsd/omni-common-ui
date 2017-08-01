'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FETCH_PRIVILEGES_INVALIDATE = exports.FETCH_PRIVILEGES_FAILURE = exports.FETCH_PRIVILEGES_SUCCESS = exports.FETCH_PRIVILEGES_REQUEST = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.havePrivilegesLoaded = havePrivilegesLoaded;
exports.fetchPrivilegesIfNeeded = fetchPrivilegesIfNeeded;
exports.isLoading = isLoading;

var _Api = require('./../../domain/Api');

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FETCH_PRIVILEGES_REQUEST = exports.FETCH_PRIVILEGES_REQUEST = 'FETCH_PRIVILEGES_REQUEST';
var FETCH_PRIVILEGES_SUCCESS = exports.FETCH_PRIVILEGES_SUCCESS = 'FETCH_PRIVILEGES_SUCCESS';
var FETCH_PRIVILEGES_FAILURE = exports.FETCH_PRIVILEGES_FAILURE = 'FETCH_PRIVILEGES_FAILURE';
var FETCH_PRIVILEGES_INVALIDATE = exports.FETCH_PRIVILEGES_INVALIDATE = 'FETCH_PRIVILEGES_INVALIDATE';

var buildPrivilegesUrl = function buildPrivilegesUrl(userId) {
  return (0, _Api.buildUrl)('/users/' + userId + '/privileges');
};
var method = 'GET';

function getSSOUserId(state) {
  var user = state.get('singleSignOn').get('user');

  // logging out?
  if (!user) return null;

  var userId = user.get('profile').sub;
  return userId;
}

function havePrivilegesLoaded() {
  return function (dispatch, getState) {
    var state = getState();
    var userId = getSSOUserId(state);
    if (!userId) return false;
    var url = buildPrivilegesUrl(userId);
    var callState = _ApiCalls2.default.find(state, { url: url, method: method });
    return callState && _ApiCalls2.default.State.isValue(callState) && _ApiCalls2.default.State.hasSucceeded(callState);
  };
}

function fetchPrivilegesIfNeeded() {
  return function (dispatch, getState) {
    var state = getState();
    var userId = getSSOUserId(state);
    if (!userId) return false;
    var url = buildPrivilegesUrl(userId);
    var keyConfig = { method: method, url: url };
    var apiStateKey = _ApiCalls2.default.Key.create(keyConfig);

    if (!shouldFetchPrivileges(getState())) {
      return false;
    }

    return fetchPrivileges();

    function shouldFetchPrivileges() {
      if (_ApiCalls2.default.shouldPerform(state, apiStateKey)) {
        _log2.default.debug('fetchPrivilegesIfNeeded - ApiCall.shouldPerform() returned true');
        return true;
      }

      var privileges = state.get('privileges');
      if (privileges.didInvalidate === true) {
        _log2.default.debug('fetchPrivilegesIfNeeded - didInvalidate is true');
        return true;
      }

      return false;
    }

    function fetchPrivileges() {
      _log2.default.debug('fetchPrivilegesIfNeeded - Will fetch');
      return dispatch(fetchPrivilegesRequest()).payload.then(function (json) {
        return dispatch(fetchPrivilegesSuccess(json));
      }).catch(function (error) {
        dispatch(fetchPrivilegesFailure(error));throw error;
      });
    }

    function fetchPrivilegesRequest() {
      return _ApiCalls2.default.createAction(_extends({
        type: FETCH_PRIVILEGES_REQUEST,
        payload: (0, _Api.fetch)(url)
      }, keyConfig));
    }

    function fetchPrivilegesSuccess(privileges) {
      return _ApiCalls2.default.createAction(_extends({
        type: FETCH_PRIVILEGES_SUCCESS,
        privileges: privileges
      }, keyConfig));
    }

    function fetchPrivilegesFailure(error) {
      return _ApiCalls2.default.createAction(_extends({
        type: FETCH_PRIVILEGES_FAILURE,
        error: error
      }, keyConfig));
    }
  };
}

function isLoading(state) {
  var userId = getSSOUserId(state);
  if (!userId) return false;
  var keyConfig = { method: 'GET', url: (0, _Api.buildUrl)('/users/' + userId + '/privileges') };
  var apiCallState = _ApiCalls2.default.find(state, keyConfig);

  return !_ApiCalls2.default.State.isValue(apiCallState) || _ApiCalls2.default.State.isLoading(apiCallState);
}
//# sourceMappingURL=actions.js.map
