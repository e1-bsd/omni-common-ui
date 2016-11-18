import { Map } from 'immutable';
import ApiCall from './';

export default function apiCalls(state = Map(), action) {
  if (! ApiCall.Action.isApiAction(action)) {
    return state;
  }

  const key = ApiCall.Key.create(action);
  if (ApiCall.Action.isStarted(action)) {
    return state.set(key, ApiCall.State.createLoading());
  }

  if (ApiCall.Action.isSuccess(action)) {
    return state.set(key, ApiCall.State.createSucceeded());
  }

  if (ApiCall.Action.isFailure(action)) {
    return state.set(key, ApiCall.State.createFailed(action.error));
  }

  return state;
}
