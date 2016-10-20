import { fetch, buildUrl } from 'domain/Api';
import { ApiResponseHelper } from 'domain/ApiResponseHelper';
import log from 'loglevel';

export const FETCH_PRIVILEGES_REQUEST = 'FETCH_PRIVILEGES_REQUEST';
export const FETCH_PRIVILEGES_SUCCESS = 'FETCH_PRIVILEGES_SUCCESS';
export const FETCH_PRIVILEGES_FAILURE = 'FETCH_PRIVILEGES_FAILURE';
export const FETCH_PRIVILEGES_INVALIDATE = 'FETCH_PRIVILEGES_INVALIDATE';

export function fetchPrivilegesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPrivileges(getState())) {
      return dispatch(fetchPrivileges());
    }
  };
}

function fetchPrivileges() {
  return (dispatch, getState) => {
    const user = getState().get('singleSignOn').get('oidc').user;
    return dispatch(fetchPrivilegesRequest(user.profile.sub)).payload
      .then((json) => dispatch(fetchPrivilegesSuccess(json)))
      .catch((error) => dispatch(fetchPrivilegesFailure(error)));
  };
}

function shouldFetchPrivileges(state) {
  const privileges = state.get('rootReducer').get('privileges');
  if (! ApiResponseHelper.shouldFetch(privileges)) {
    log.debug('shouldFetchPrivileges - shouldFetch() returned false');
    return false;
  }

  if (! ApiResponseHelper.hasSucceeded(privileges) || privileges.data.didInvalidate === true) {
    log.debug('shouldFetchPrivileges - Yes, we should!');
    return true;
  }

  log.debug('shouldFetchPrivileges - Nah…');
  return false;
}

function fetchPrivilegesRequest(userId) {
  const url = buildUrl(`/users/${userId}/privileges`);
  const MOCK = false;
  const payload = MOCK ?
      new Promise((resolve) => resolve([
        'BU_1_P020101',
        'BU_1_P020102',
        'BU_1_P020103',
        'BU_1_P020104',
        'BU_1_P020105',
        'BU_1_P020106',
      ])) :
      fetch(url);
  return {
    type: FETCH_PRIVILEGES_REQUEST,
    payload,
    url,
  };
}

function fetchPrivilegesSuccess(privileges) {
  return {
    type: FETCH_PRIVILEGES_SUCCESS,
    privileges,
  };
}

function fetchPrivilegesFailure(error) {
  return {
    type: FETCH_PRIVILEGES_FAILURE,
    error,
  };
}
