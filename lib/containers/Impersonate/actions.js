'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLEAR_IMPERSONATE_DATA = exports.POST_IMPERSONATE_FAILURE = exports.POST_IMPERSONATE_SUCCESS = exports.POST_IMPERSONATE_REQUEST = undefined;
exports.postImpersonate = postImpersonate;
exports.getTokenEndPoint = getTokenEndPoint;
exports.clearImpersonateData = clearImpersonateData;

var _Api = require('./../../domain/Api');

var _SingleSignOn = require('./../SingleSignOn');

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POST_IMPERSONATE_REQUEST = exports.POST_IMPERSONATE_REQUEST = 'POST_IMPERSONATE_REQUEST';
var POST_IMPERSONATE_SUCCESS = exports.POST_IMPERSONATE_SUCCESS = 'POST_IMPERSONATE_SUCCESS';
var POST_IMPERSONATE_FAILURE = exports.POST_IMPERSONATE_FAILURE = 'POST_IMPERSONATE_FAILURE';
var CLEAR_IMPERSONATE_DATA = exports.CLEAR_IMPERSONATE_DATA = 'CLEAR_IMPERSONATE_DATA';

function postImpersonate(email, token) {
  return function (dispatch) {
    var url = getTokenEndPoint();
    var method = 'POST';

    dispatch(postImpersonateRequest()).payload.then(function (response) {
      return dispatch(postImpersonateSuccess(response));
    }).catch(function (error) {
      return dispatch(postImpersonateFailure(error));
    });

    function postImpersonateRequest() {
      var body = _queryString2.default.stringify({
        grant_type: 'impersonation',
        scope: _getSingleSingOnScope(),
        token: token,
        impersonated_user_email: email
      });

      var param = {
        method: method,
        headers: {
          'Content-Type': 'charset=utf-8',
          Accept: '',
          Authorization: _Config2.default.get('impersonateClientAuthorization')
        },
        body: body
      };
      return _ApiCalls2.default.createAction({
        type: POST_IMPERSONATE_REQUEST,
        payload: (0, _Api.fetch)(url, param),
        url: url,
        method: method
      });
    }

    function postImpersonateSuccess(response) {
      return _ApiCalls2.default.createAction({
        type: POST_IMPERSONATE_SUCCESS,
        payload: response,
        url: url,
        method: method
      });
    }

    function postImpersonateFailure(error) {
      return _ApiCalls2.default.createAction({
        type: POST_IMPERSONATE_FAILURE,
        error: error,
        url: url,
        method: method,
        disableDefault: true
      });
    }
  };

  function _getSingleSingOnScope() {
    return _SingleSignOn.userManager.settings._scope;
  }
}

function getTokenEndPoint() {
  return _SingleSignOn.userManager.settings._metadata.token_endpoint;
}

function clearImpersonateData() {
  return {
    type: CLEAR_IMPERSONATE_DATA
  };
}
//# sourceMappingURL=actions.js.map
