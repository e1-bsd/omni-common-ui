import { Map } from 'immutable';
import ApiCall from './';

export default function apiCalls(state = Map(), action) {
  if (action.type === ApiCall.API_CALL_CLEAN) {
    return state.remove(action.key);
  }

  if (! ApiCall.Action.isApiAction(action)) {
    return state;
  }

  const key = ApiCall.Key.create(action);
  if (ApiCall.Action.isStarted(action)) {
    const newState = ApiCall.State.createLoading(key, { disableDefault: action.disableDefault });
    return state.set(key, newState);
  }

  if (ApiCall.Action.isSuccess(action)) {
    return state.set(key, ApiCall.State.createSucceeded(key));
  }

  if (ApiCall.Action.isFailure(action)) {
    const newState = ApiCall.State.createFailed(key,
        action.error,
        { disableDefault: action.disableDefault });
    return state.set(key, newState);
  }

  return state;
}
