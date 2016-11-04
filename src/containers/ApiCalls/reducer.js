import { Map } from 'immutable';
import ApiCallAction from 'domain/ApiCallAction';
import ApiCallKey from './ApiCallKey';
import ApiResponseHelper from 'domain/ApiResponseHelper';

export default function apiCalls(state = Map(), action) {
  if (! ApiCallAction.isApiCallAction(action)) {
    return state;
  }

  const key = new ApiCallKey({ id: action.apiCallId, type: action.apiCallType });
  if (ApiCallAction.isRequestStarted(action)) {
    return state.set(key, ApiResponseHelper.create({ loading: true }));
  }

  if (ApiCallAction.isRequestSuccess(action)) {
    return state.set(key, ApiResponseHelper.create({ data: action.data }));
  }

  if (ApiCallAction.isRequestFailure(action)) {
    return state.set(key, ApiResponseHelper.create({ error: action.error }));
  }

  return state;
}
