/* eslint import/prefer-default-export: "off" */
import {
  POST_IMPERSONATE_REQUEST,
  POST_IMPERSONATE_SUCCESS,
  POST_IMPERSONATE_FAILURE,
  CLEAR_IMPERSONATE_DATA,
  UNIMPERSONATE_REQUEST,
  UNIMPERSONATE_SUCCESS,
  UNIMPERSONATE_FAILURE,
} from './actions';
import { Map } from 'immutable';
import { ApiResponse } from 'domain/Api';
import { combineReducers } from 'redux-immutable';

export default combineReducers({
  postedImpersonate,
  unimpersonate,
});

function postedImpersonate(state = Map({}), action) {
  switch (action.type) {
    case POST_IMPERSONATE_REQUEST:
      return state.set('impersonate', new ApiResponse().setLoading());
    case POST_IMPERSONATE_SUCCESS:
      return state.update('impersonate', (impersonate) => impersonate.setData(action.payload));
    case POST_IMPERSONATE_FAILURE:
      return state.update('impersonate', (impersonate) => impersonate.setError(action.payload));
    case CLEAR_IMPERSONATE_DATA:
      return Map({});
    default:
      return state;
  }
}

function unimpersonate(state = Map({}), action) {
  switch (action.type) {
    case UNIMPERSONATE_REQUEST:
      return state.set('unimpersonate', new ApiResponse().setLoading());
    case UNIMPERSONATE_SUCCESS:
      return state.update(
        'unimpersonate',
        (impersonate) => impersonate.setData(action.payload || 'success'));
    case UNIMPERSONATE_FAILURE:
      return state.update('unimpersonate', (impersonate) => impersonate.setError(action.payload));
    default:
      return state;
  }
}
