import is from 'is_js';
import ApiAction from './ApiAction';

export default class ApiKey {
  static create(param) {
    if (ApiAction.isApiAction(param)) {
      return createFromApiAction(param);
    }

    if (is.not.object(param)) {
      throw new Error('Expected an ApiAction or an object');
    }

    return createFromObject(param);
  }
}

function createFromApiAction(apiAction) {
  return `${apiAction.method} ${apiAction.url}`;
}

function createFromObject({ method, url }) {
  if (is.not.string(method)) {
    throw new Error('The method property should be a string');
  }

  if (is.not.string(url)) {
    throw new Error('The url property should be a string');
  }

  return `${method.toUpperCase()} ${url.toLowerCase()}`;
}
