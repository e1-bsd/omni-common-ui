import { fetch, buildUrl } from 'domain/Api';
import ApiCall from 'containers/ApiCalls';

export const POST_IMPERSONATE_REQUEST = 'POST_IMPERSONATE_REQUEST';
export const POST_IMPERSONATE_SUCCESS = 'POST_IMPERSONATE_SUCCESS';
export const POST_IMPERSONATE_FAILURE = 'POST_IMPERSONATE_FAILURE';
export const CLEAR_IMPERSONATE_DATA = 'CLEAR_IMPERSONATE_DATA';
export const UNIMPERSONATE_REQUEST = 'UNIMPERSONATE_REQUEST';
export const UNIMPERSONATE_SUCCESS = 'UNIMPERSONATE_SUCCESS';
export const UNIMPERSONATE_FAILURE = 'UNIMPERSONATE_FAILURE';

export function setImpersonate(data) {
  return (dispatch, getState) => {
    const user = getState().get('singleSignOn').get('user');
    if (! user) return null;
    const localImpersonateData = JSON.parse(localStorage.getItem('impersonateData')) || {};
    localImpersonateData[user.profile.email] = data;
    localStorage.setItem('impersonateData', JSON.stringify(localImpersonateData));
  };
}

export function getImpersonate() {
  return (dispatch, getState) => {
    const user = getState().get('singleSignOn').get('user');
    if (! user) return null;
    const localImpersonateData = JSON.parse(localStorage.getItem('impersonateData'));
    return localImpersonateData ? localImpersonateData[user.profile.email] : undefined;
  };
}

export function removeImpersonate() {
  return (dispatch, getState) => {
    const user = getState().get('singleSignOn').get('user');
    if (! user) return null;
    const localImpersonateData = JSON.parse(localStorage.getItem('impersonateData'));
    if (localImpersonateData) {
      delete (localImpersonateData[user.profile.email]);
    }
    localStorage.setItem('impersonateData', JSON.stringify(localImpersonateData));
  };
}

export function postImpersonate(email) {
  return (dispatch) => {
    const url = buildUrl(`/users/${email}/impersonate`);
    const method = 'PUT';

    dispatch(postImpersonateRequest()).payload
      .then((response) => dispatch(postImpersonateSuccess(response)))
      .catch((error) => dispatch(postImpersonateFailure(error)));

    function postImpersonateRequest() {
      const param = {
        method,
        headers: { 'Content-Type': 'application/json' },
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
}

export function clearImpersonateData() {
  return {
    type: CLEAR_IMPERSONATE_DATA,
  };
}

export function unimpersonate() {
  return (dispatch) => {
    const url = buildUrl('/users/unimpersonate');
    const method = 'PUT';

    dispatch(unimpersonateRequest()).payload
      .then((response) => dispatch(unimpersonateSuccess(response)))
      .catch((error) => dispatch(unimpersonateFailure(error)));

    function unimpersonateRequest() {
      const param = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      return ApiCall.createAction({
        type: UNIMPERSONATE_REQUEST,
        payload: fetch(url, param),
        url,
        method,
      });
    }

    function unimpersonateSuccess(response) {
      return ApiCall.createAction({
        type: UNIMPERSONATE_SUCCESS,
        payload: response,
        url,
        method,
      });
    }

    function unimpersonateFailure(error) {
      return ApiCall.createAction({
        type: UNIMPERSONATE_FAILURE,
        error,
        url,
        method,
      });
    }
  };
}
