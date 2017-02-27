import _ApiKey from './ApiKey';
import _ApiAction from './ApiAction';
import _ApiState from './ApiState';
import is from 'is_js';

export default class ApiCall {
  static find(state, key) {
    if (is.object(key)) {
      const builtKey = ApiCall.Key.create(key);
      return ApiCall.find(state, builtKey);
    }

    return state.get('apiCalls').get(key);
  }

  static shouldPerform(state, key) {
    return ApiCall.State.shouldPerform(ApiCall.find(state, key));
  }

  static createAction(action) {
    return ApiCall.Action.create(action);
  }

  static clean(key) {
    return Object.freeze({
      type: ApiCall.API_CALL_CLEAN,
      key,
    });
  }

  static getErrors(state) {
    return state.get('apiCalls').filter((call) => ApiCall.State.hasFailed(call));
  }

  static get API_CALL_CLEAN() {
    return 'API_CALL_CLEAN';
  }

  static get Action() {
    return _ApiAction;
  }

  static get Key() {
    return _ApiKey;
  }

  static get State() {
    return _ApiState;
  }

  static set Action(param) {
    throw new Error('Not allowed to reassign!');
  }

  static set Key(param) {
    throw new Error('Not allowed to reassign!');
  }

  static set State(param) {
    throw new Error('Not allowed to reassign!');
  }
}
