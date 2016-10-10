import { fetch, buildUrl } from 'domain/Api';

export const POST_IMPERSONATE_REQUEST = 'POST_IMPERSONATE_REQUEST';
export const POST_IMPERSONATE_SUCCESS = 'POST_IMPERSONATE_SUCCESS';
export const POST_IMPERSONATE_FAILURE = 'POST_IMPERSONATE_FAILURE';
export const CLEAR_IMPERSONATE_DATA = 'CLEAR_IMPERSONATE_DATA';
export const UNIMPERSONATE_REQUEST = 'UNIMPERSONATE_REQUEST';
export const UNIMPERSONATE_SUCCESS = 'UNIMPERSONATE_SUCCESS';
export const UNIMPERSONATE_FAILURE = 'UNIMPERSONATE_FAILURE';

export function postImpersonate(email) {
  return (dispatch) => {
    const failurePostCallBack = (e) => dispatch(postImpersonateFailure(e));
    const successPostCallBack = (response) => dispatch(postImpersonateSuccess(response));
    dispatch(postImpersonateRequest(email)).payload
      .then((response) => successPostCallBack(response))
      .catch((error) => error.response.then(json => failurePostCallBack(json.ErrorCode)));
  };
}

export function clearImpersonateData() {
  return {
    type: CLEAR_IMPERSONATE_DATA,
  };
}

function postImpersonateRequest(email) {
  const url = buildUrl(`/users/${email}/impersonate`);
  const param = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };
  return {
    type: POST_IMPERSONATE_REQUEST,
    payload: fetch(url, param),
    url,
  };
}

function postImpersonateSuccess(response) {
  return {
    type: POST_IMPERSONATE_SUCCESS,
    payload: response,
  };
}

function postImpersonateFailure(error) {
  return {
    type: POST_IMPERSONATE_FAILURE,
    payload: error,
  };
}

export function unimpersonate() {
  return (dispatch) => {
    const failurePostCallBack = (e) => dispatch(unimpersonateFailure(e));
    const successPostCallBack = (response) => dispatch(unimpersonateSuccess(response));
    dispatch(unimpersonateRequest()).payload
      .then((response) => successPostCallBack(response))
      .catch((error) => error.response.then(json => failurePostCallBack(json.ErrorCode)));
  };
}

function unimpersonateRequest() {
  const url = buildUrl('/users/unimpersonate');
  const param = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };
  return {
    type: UNIMPERSONATE_REQUEST,
    payload: fetch(url, param),
    url,
  };
}

function unimpersonateSuccess(response) {
  return {
    type: UNIMPERSONATE_SUCCESS,
    payload: response,
  };
}

function unimpersonateFailure(error) {
  return {
    type: UNIMPERSONATE_FAILURE,
    payload: error,
  };
}
