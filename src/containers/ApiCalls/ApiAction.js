import is from 'is_js';
import log from 'domain/log';

const TYPE_REQUEST = /_REQUEST$/i;
const TYPE_SUCCESS = /_SUCCESS$/i;
const TYPE_FAILURE = /_FAILURE$/i;
const TYPE_ANY = /(_REQUEST|_SUCCESS|_FAILURE)$/i;

class InvalidAction extends Error { }

const FINGERPRINT = Symbol('ApiAction');
const TIMESTAMP = Symbol('ApiAction/Timestamp');

export default class ApiAction {
  static create(originalAction) {
    const action = Object.assign({}, originalAction);
    if (is.not.object(action)) {
      throw new InvalidAction('An action should be an object');
    }

    if (is.not.string(action.url)) {
      throw new InvalidAction('The action should have a url property of type string');
    }

    action.url = action.url.toLowerCase();

    if (is.not.string(action.method)) {
      throw new InvalidAction('The action should have a method property of type string');
    }

    if (! /GET|PUT|DELETE|POST/i.test(action.method)) {
      throw new InvalidAction('The action should have a method property of type string');
    }

    action.method = action.method.toUpperCase();

    if (is.not.string(action.type)) {
      throw new InvalidAction('The action should have a type property of type string. ' +
          `Got one with a type of ${typeof action.type}`);
    }

    if (! TYPE_ANY.test(action.type)) {
      throw new InvalidAction('The type property of an action should end ' +
          `with _REQUEST, _SUCCESS or _FAILURE. Got ${action.type}`);
    }

    if (/[a-z]/.test(action.type)) {
      throw new InvalidAction('The type property of an action ' +
          `should not contain lower case letter. Got ${action.type}`);
    }

    if (ApiAction.isFailure(action) && is.not.existy(action.error)) {
      throw new InvalidAction('action.error should be defined for failed calls');
    }

    if (is.existy(action.error) && ! (action.error instanceof Error)) {
      action.error = new Error(action.error);
    }

    const newAction = Object.assign(action, {
      [FINGERPRINT]: true,
      [TIMESTAMP]: new Date(),
    });

    if (ApiAction.isFailure(newAction)) {
      log.error(newAction.error);
    }

    return Object.freeze(newAction);
  }

  static isApiAction(object) {
    if (is.not.object(object)) {
      return false;
    }

    return !! object[FINGERPRINT];
  }

  static isStarted(action) {
    return TYPE_REQUEST.test(action.type);
  }

  static isSuccess(action) {
    return TYPE_SUCCESS.test(action.type);
  }

  static isFailure(action) {
    return TYPE_FAILURE.test(action.type);
  }

  static getApiType(action) {
    return action.type.replace(TYPE_ANY, '');
  }

  static getTimestamp(action) {
    return action[TIMESTAMP];
  }
}
