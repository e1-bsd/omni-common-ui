import isomorphicFetch from 'isomorphic-fetch';
import is from 'is_js';
import Store from 'domain/Store';
import camelCase from 'camelcase';
import Config from 'domain/Config';

export const buildUrl = (path) => Config.get('apiBase') + path;

class FetchTimedOutError extends Error { }

export class ApiError extends Error {
  constructor(response = {}, message) {
    super(message || response.statusText);
    // https://fetch.spec.whatwg.org/#responses
    this.ok = response.ok;
    this.url = response.url;
    this.type = response.type;
    this.status = response.status;
    this.statusText = response.statusText;
    this.headers = response.headers;
    this.body = response.body;
  }
}

export const fetch = (url, options = {}) => {
  const finalOptions = Object.assign({}, options, getTokenHeader(options));
  return new Promise((resolve, reject) => {
    const onTimeout = () => reject(new FetchTimedOutError(`Call to ${url} has taken too long!`));
    const timeout = setTimeout(onTimeout, Config.get('fetchTimeout'));

    isomorphicFetch(url, finalOptions)
      .then(checkResponseStatus)
      .then(parseResponse)
      .then((response) => {
        clearTimeout(timeout);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

function parseResponse(rawResponse) {
  return rawResponse.text()
      .then((response) => {
        try {
          return JSON.parse(response);
        } catch (e) {
          return response;
        }
      });
}

function checkResponseStatus(response) {
  if (response.ok) {
    return response;
  }

  const error = new ApiError(response);
  try {
    return parseResponse(response)
        .then((apiResponse) => {
          if (is.not.object(apiResponse)) {
            error.response = apiResponse;
          } else {
            error.response = {};
            Object.keys(apiResponse).forEach((key) => {
              error.response[camelCase(key)] = apiResponse[key];
            });
          }

          throw error;
        });
  } catch (e) {
    throw error;
  }
}

function getTokenHeader(options) {
  const user = Store.get().getState().get('singleSignOn').user || {};
  const token = user.access_token;
  return {
    headers: Object.assign(
      {
        Accept: 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      is.not.object(options) ? undefined : options.headers
    ),
  };
}

class Api { }

Api.fetch = fetch;
Api.buildUrl = buildUrl;

export default Api;
