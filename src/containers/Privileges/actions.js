import { fetch, buildUrl } from 'domain/Api';
import log from 'domain/log';
import ApiCall from 'containers/ApiCalls';

export const FETCH_PRIVILEGES_REQUEST = 'FETCH_PRIVILEGES_REQUEST';
export const FETCH_PRIVILEGES_SUCCESS = 'FETCH_PRIVILEGES_SUCCESS';
export const FETCH_PRIVILEGES_FAILURE = 'FETCH_PRIVILEGES_FAILURE';
export const FETCH_PRIVILEGES_INVALIDATE = 'FETCH_PRIVILEGES_INVALIDATE';

const buildPrivilegesUrl = (userId) => buildUrl(`/users/${userId}/privileges`);
const method = 'GET';

function getSSOUserId(state) {
  const user = state.get('singleSignOn').get('user');

  // logging out?
  if (! user) return null;

  const userId = user.get('profile').sub;
  return userId;
}

export function havePrivilegesLoaded() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = getSSOUserId(state);
    if (! userId) return false;
    const url = buildPrivilegesUrl(userId);
    const callState = ApiCall.find(state, { url, method });
    return callState &&
        ApiCall.State.isValue(callState) &&
        ApiCall.State.hasSucceeded(callState);
  };
}

export function fetchPrivilegesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = getSSOUserId(state);
    if (! userId) return false;
    const url = buildPrivilegesUrl(userId);
    const keyConfig = { method, url };
    const apiStateKey = ApiCall.Key.create(keyConfig);

    if (! shouldFetchPrivileges(getState())) {
      return false;
    }

    return fetchPrivileges();

    function shouldFetchPrivileges() {
      if (ApiCall.shouldPerform(state, apiStateKey)) {
        log.debug('fetchPrivilegesIfNeeded - ApiCall.shouldPerform() returned true');
        return true;
      }

      const privileges = state.get('privileges');
      if (privileges.didInvalidate === true) {
        log.debug('fetchPrivilegesIfNeeded - didInvalidate is true');
        return true;
      }

      return false;
    }

    function fetchPrivileges() {
      log.debug('fetchPrivilegesIfNeeded - Will fetch');
      return dispatch(fetchPrivilegesRequest()).payload
        .then((json) => dispatch(fetchPrivilegesSuccess(json)))
        .catch((error) => { dispatch(fetchPrivilegesFailure(error)); throw error; });
    }

    function fetchPrivilegesRequest() {
      return ApiCall.createAction({
        type: FETCH_PRIVILEGES_REQUEST,
        payload: fetch(url),
        ...keyConfig,
      });
    }

    function fetchPrivilegesSuccess(privileges) {
      return ApiCall.createAction({
        type: FETCH_PRIVILEGES_SUCCESS,
        privileges,
        ...keyConfig,
      });
    }

    function fetchPrivilegesFailure(error) {
      return ApiCall.createAction({
        type: FETCH_PRIVILEGES_FAILURE,
        error,
        ...keyConfig,
      });
    }
  };
}

export function isLoading(state) {
  const userId = getSSOUserId(state);
  if (! userId) return false;
  const keyConfig = { method: 'GET', url: buildUrl(`/users/${userId}/privileges`) };
  const apiCallState = ApiCall.find(state, keyConfig);

  return ! ApiCall.State.isValue(apiCallState) || ApiCall.State.isLoading(apiCallState);
}
