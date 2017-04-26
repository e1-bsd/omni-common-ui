import { fetch } from 'domain/Api';
import { userManager } from 'containers/SingleSignOn';
import Config from 'domain/Config';
import ApiCall from 'containers/ApiCalls';
import QueryString from 'query-string';

export const POST_IMPERSONATE_REQUEST = 'POST_IMPERSONATE_REQUEST';
export const POST_IMPERSONATE_SUCCESS = 'POST_IMPERSONATE_SUCCESS';
export const POST_IMPERSONATE_FAILURE = 'POST_IMPERSONATE_FAILURE';
export const CLEAR_IMPERSONATE_DATA = 'CLEAR_IMPERSONATE_DATA';

export function postImpersonate(email, token) {
  return (dispatch) => {
    const url = _getTokenEndPoint();
    const method = 'POST';

    dispatch(postImpersonateRequest()).payload
      .then((response) => dispatch(postImpersonateSuccess(response)))
      .catch((error) => dispatch(postImpersonateFailure(error)));

    function postImpersonateRequest() {
      const body = QueryString.stringify({
        grant_type: 'impersonation',
        scope: _getSingleSingOnScope(),
        token,
        impersonated_user_email: email,
      });

      const param = {
        method,
        headers: {
          'Content-Type': '',
          Accept: '',
          Authorization: Config.get('impersonateClientAuthorization'),
        },
        body,
      };
      return ApiCall.createAction({
        type: POST_IMPERSONATE_REQUEST,
        payload: fetch(url, param),
        url,
        method,
      });
    }

    function postImpersonateSuccess(response) {
      return ApiCall.createAction({
        type: POST_IMPERSONATE_SUCCESS,
        payload: response,
        url,
        method,
      });
    }

    function postImpersonateFailure(error) {
      return ApiCall.createAction({
        type: POST_IMPERSONATE_FAILURE,
        error,
        url,
        method,
      });
    }
  };

  function _getTokenEndPoint() {
    return userManager.settings._metadata.token_endpoint;
  }

  function _getSingleSingOnScope() {
    return userManager.settings._scope;
  }
}

export function clearImpersonateData() {
  return {
    type: CLEAR_IMPERSONATE_DATA,
  };
}
