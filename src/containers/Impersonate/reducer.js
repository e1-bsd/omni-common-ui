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
import ApiResponseHelper from 'domain/ApiResponseHelper';
import { combineReducers } from 'redux-immutable';

export default combineReducers({
  postedImpersonate,
  unimpersonate,
});

function postedImpersonate(state = Map({}), action) {
  switch (action.type) {
    case POST_IMPERSONATE_REQUEST:
      return state.set('impersonate', ApiResponseHelper.create({ loading: true }));
    case POST_IMPERSONATE_SUCCESS:
      return state.set('impersonate', ApiResponseHelper.create(action.payload));
    case POST_IMPERSONATE_FAILURE:
      return state.set('impersonate', ApiResponseHelper.create(new Error(action.payload)));
    case CLEAR_IMPERSONATE_DATA:
      return Map({});
    default:
      return state;
  }
}

function unimpersonate(state = Map({}), action) {
  switch (action.type) {
    case UNIMPERSONATE_REQUEST:
      return state.set('unimpersonate', ApiResponseHelper.create({ loading: true }));
    case UNIMPERSONATE_SUCCESS:
      return state.set('unimpersonate', ApiResponseHelper.create(action.payload || 'success'));
    case UNIMPERSONATE_FAILURE:
      return state.set('unimpersonate', ApiResponseHelper.create(new Error(action.payload)));
    default:
      return state;
  }
}
