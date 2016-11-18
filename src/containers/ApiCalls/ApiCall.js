import ApiKey from './ApiKey';
import ApiAction from './ApiAction';
import ApiState from './ApiState';
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
    return ApiState.shouldPerform(ApiCall.find(state, key));
  }

  static get Action() {
    return ApiAction;
  }

  static get Key() {
    return ApiKey;
  }

  static get State() {
    return ApiState;
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
