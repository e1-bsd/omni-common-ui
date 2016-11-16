import { Map } from 'immutable';
import ApiCall from './';

export default function apiCalls(state = Map(), action) {
  if (! ApiCall.Action.isApiCallAction(action)) {
    return state;
  }

  const key = ApiCall.Key.create({ id: action.__apiCallId__, type: action.__apiCallType__ });
  if (ApiCall.Action.isRequestStarted(action)) {
    return state.set(key, ApiCall.Value.createLoading());
  }

  if (ApiCall.Action.isRequestSuccess(action)) {
    return state.set(key, ApiCall.Value.createSucceeded());
  }

  if (ApiCall.Action.isRequestFailure(action)) {
    return state.set(key, ApiCall.Value.createFailed(action.error));
  }

  return state;
}
