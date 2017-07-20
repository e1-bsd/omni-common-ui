import { fetch } from 'domain/Api';
import { createUserManager } from 'data/SingleSignOn';
import Config from 'domain/Config';
import ApiCall from 'containers/ApiCalls';
import QueryString from 'query-string';

export const POST_IMPERSONATE_REQUEST = 'POST_IMPERSONATE_REQUEST';
export const POST_IMPERSONATE_SUCCESS = 'POST_IMPERSONATE_SUCCESS';
export const POST_IMPERSONATE_FAILURE = 'POST_IMPERSONATE_FAILURE';
export const CLEAR_IMPERSONATE_DATA = 'CLEAR_IMPERSONATE_DATA';

export function postImpersonate(email, token) {
  return (dispatch) => {
    const url = getTokenEndPoint();
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
          'Content-Type': 'charset=utf-8',
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
        disableDefault: true,
      });
    }
  };

  function _getSingleSingOnScope() {
    return createUserManager().settings._scope;
  }
}

export function getTokenEndPoint() {
  return createUserManager().settings._metadata.token_endpoint;
}

export function clearImpersonateData() {
  return {
    type: CLEAR_IMPERSONATE_DATA,
  };
}
