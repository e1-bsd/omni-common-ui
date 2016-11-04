import is from 'is_js';

const TYPE_REQUEST = /_REQUEST$/i;
const TYPE_SUCCESS = /_SUCCESS$/i;
const TYPE_FAILURE = /_FAILURE$/i;
const TYPE_ANY = /(_REQUEST|_SUCCESS|_FAILURE)$/i;

class InvalidAction extends Error { }

class ApiCallAction {
  static create(action) {
    if (is.not.object(action)) {
      throw new InvalidAction('An action should be an object');
    }

    if (is.not.string(action.type)) {
      throw new InvalidAction('action.type should be a string');
    }

    if (! TYPE_ANY.test(action.type)) {
      throw new InvalidAction('action.type should end with _REQUEST, _SUCCESS or _FAILURE');
    }

    if (is.not.existy(action.apiCallId)) {
      throw new InvalidAction('action.apiCallId is not defined');
    }

    if (ApiCallAction.isRequestSuccess(action) && is.not.existy(action.data)) {
      throw new InvalidAction('action.data should be defined for successful calls');
    }

    if (ApiCallAction.isRequestFailure(action) && ! (action.error instanceof Error)) {
      throw new InvalidAction('action.error should be defined as an Error for failed calls');
    }

    return Object.assign({}, action, {
      __apiCallAction__: true,
      apiCallType: ApiCallAction.getApiCallType(action),
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
