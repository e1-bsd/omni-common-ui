import { fetch, buildUrl } from 'domain/Api';
import log from 'loglevel';
import ApiCall from 'containers/ApiCalls';

export const FETCH_PRIVILEGES_REQUEST = 'FETCH_PRIVILEGES_REQUEST';
export const FETCH_PRIVILEGES_SUCCESS = 'FETCH_PRIVILEGES_SUCCESS';
export const FETCH_PRIVILEGES_FAILURE = 'FETCH_PRIVILEGES_FAILURE';
export const FETCH_PRIVILEGES_INVALIDATE = 'FETCH_PRIVILEGES_INVALIDATE';

export function fetchPrivilegesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.get('singleSignOn').user.profile.sub;
    const url = buildUrl(`/users/${userId}/privileges`);
    const keyConfig = { method: 'GET', url };
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
