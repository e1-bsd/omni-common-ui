/* eslint import/prefer-default-export: "off" */
import {
  POST_IMPERSONATE_REQUEST,
  POST_IMPERSONATE_SUCCESS,
  CLEAR_IMPERSONATE_DATA,
} from './actions';
import { Map } from 'immutable';
import ApiResponseHelper from 'domain/ApiResponseHelper';
import { combineReducers } from 'redux-immutable';

export default combineReducers({
  postedImpersonate,
});

function postedImpersonate(state = Map({}), action) {
  switch (action.type) {
    case POST_IMPERSONATE_REQUEST:
      return state.set('impersonate', ApiResponseHelper.create({ loading: true }));
    case POST_IMPERSONATE_SUCCESS:
      return state.set('impersonate', ApiResponseHelper.create(action.payload));
    case CLEAR_IMPERSONATE_DATA:
      return Map({});
    default:
      return state;
  }
}
