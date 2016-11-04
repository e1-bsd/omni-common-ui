import is from 'is_js';

const TYPE_REQUEST = /_REQUEST$/i;
const TYPE_SUCCESS = /_SUCCESS$/i;
const TYPE_FAILURE = /_FAILURE$/i;
const TYPE_ANY = /(_REQUEST|_SUCCESS|_FAILURE)$/i;

class InvalidAction extends Error { }

class ApiCallAction {
  static isApiCallAction(object) {
    return object instanceof ApiCallAction;
  }

  constructor(action) {
    Object.assign(this, action);

    if (is.not.object(action)) {
      throw new InvalidAction('An action should be an object');
    }

    if (is.not.string(this.type)) {
      throw new InvalidAction('action.type should be a string');
    }

    if (! TYPE_ANY.test(this.type)) {
      throw new InvalidAction('action.type should end with _REQUEST, _SUCCESS or _FAILURE');
    }

    if (is.not.existy(this.apiCallId)) {
      throw new InvalidAction('action.apiCallId is not defined');
    }

    if (this.isRequestSuccess() && is.not.existy(this.data)) {
      throw new InvalidAction('action.data should be defined for successful calls');
    }

    if (this.isRequestFailure() && ! (this.error instanceof Error)) {
      throw new InvalidAction('action.error should be defined as an Error for failed calls');
    }
  }

  isRequestStarted() {
    return TYPE_REQUEST.test(this.type);
  }

  isRequestSuccess() {
    return TYPE_SUCCESS.test(this.type);
  }

  isRequestFailure() {
    return TYPE_FAILURE.test(this.type);
  }

  get apiCallType() {
    return this.type.replace(TYPE_ANY, '');
  }
}

export default ApiCallAction;
