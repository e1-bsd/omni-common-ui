import is from 'is_js';

const TYPE_REQUEST = /_REQUEST$/i;
const TYPE_SUCCESS = /_SUCCESS$/i;
const TYPE_FAILURE = /_FAILURE$/i;
const TYPE_ANY = /(_REQUEST|_SUCCESS|_FAILURE)$/i;

class InvalidAction extends Error { }

class ApiCallAction {
  static create(apiCallId, originalAction) {
    const action = Object.assign({}, originalAction);
    if (is.not.existy(apiCallId)) {
      throw new InvalidAction('apiCallId is not defined');
    }

    if (is.not.object(action)) {
      throw new InvalidAction('An action should be an object');
    }

    if (is.not.string(action.type)) {
      throw new InvalidAction('action.type should be a string');
    }

    if (! TYPE_ANY.test(action.type)) {
      throw new InvalidAction('action.type should end with _REQUEST, _SUCCESS or _FAILURE');
    }

    if (ApiCallAction.isRequestFailure(action) && is.not.existy(action.error)) {
      throw new InvalidAction('action.error should be defined for failed calls');
    }

    if (! (action.error instanceof Error)) {
      action.error = new Error(action.error);
    }

    return Object.assign({}, action, {
      __apiCallAction__: true,
      __apiCallType__: ApiCallAction.getApiCallType(action),
      __apiCallId__: apiCallId,
    });
  }

  static isApiCallAction(object) {
    return object.__apiCallAction__ === true;
  }

  static isRequestStarted(action) {
    return TYPE_REQUEST.test(action.type);
  }

  static isRequestSuccess(action) {
    return TYPE_SUCCESS.test(action.type);
  }

  static isRequestFailure(action) {
    return TYPE_FAILURE.test(action.type);
  }

  static getApiCallType(action) {
    return action.type.replace(TYPE_ANY, '');
  }
}

export default ApiCallAction;
