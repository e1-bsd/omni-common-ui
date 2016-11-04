import is from 'is_js';

const TYPE_REQUEST = /_REQUEST$/i;
const TYPE_SUCCESS = /_SUCCESS$/i;
const TYPE_FAILURE = /_FAILURE$/i;
const TYPE_ANY = /(_REQUEST|_SUCCESS|_FAILURE)$/i;

class ApiCallAction {
  static isApiCallAction(object) {
    return object instanceof ApiCallAction;
  }

  constructor(action) {
    if (is.not.object(action)) {
      throw new Error('Invalid action! An action should be an object');
    }

    if (is.not.string(action.type)) {
      throw new Error('Invalid action! action.type should be a string');
    }

    if (! TYPE_ANY.test(action.type)) {
      throw new Error('Invalid action! action.type should end with _REQUEST, _SUCCESS or _FAILURE');
    }

    if (is.not.existy(action.apiCallId)) {
      throw new Error('Invalid action! action.apiCallId is not defined');
    }

    Object.assign(this, action);
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
    return this.action.type.replace(TYPE_ANY, '');
  }
}

export default ApiCallAction;
