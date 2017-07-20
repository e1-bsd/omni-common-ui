import invariant from 'invariant';
import isomorphicFetch from 'isomorphic-fetch';
import is from 'is_js';
import camelCase from 'lodash.camelcase';
import log from 'domain/log';
import Store from 'domain/Store';
import Config from 'domain/Config';

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
const CORS_SIMPLE_METHODS = ['GET', 'HEAD'];  // omit POST, we must send a `Content-Type`
const SECURE_URL_REGEXP = /^(https:)?\/\//;
const IS_BEARER_TOKEN_IN_URLS_ENABLED = !! Config.get('includeBearerTokenInApiGetUrls');

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
  invariant(is.string(url), 'url must be a string');
  invariant(is.object(options), 'options must be a plain object');

  const user = Store.get().getState().get('singleSignOn').get('user') || {};
  const accessToken = user.get('access_token');
  const finalOptions = Object.assign({}, options, getDefaultFetchOpts(options, accessToken));

  // https://m.alphasights.com/killing-cors-preflight-requests-on-a-react-spa-1f9b04aa5730#4bdf
  let finalUrl = url;
  if (IS_BEARER_TOKEN_IN_URLS_ENABLED) {
    if (SECURE_URL_REGEXP.test(url)) {
      // eslint-disable-next-line prefer-template
      finalUrl = url + (url.includes('?') ? '&' : '?') + `bearer_token=${accessToken}`;
    } else {
      log.warn('Refusing to append `bearer_token` to a non-secure URL', url);
    }
  }

  return new Promise((resolve, reject) => {
    const onTimeout = () => reject(new FetchTimedOutError(`Call to ${url} has taken too long!`));
    const timeout = setTimeout(onTimeout, Config.get('fetchTimeout'));

    isomorphicFetch(finalUrl, finalOptions)
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

function getDefaultFetchOpts(options, token) {
  const isCorsSimpleMethod =
      is.empty(options) ||
      is.falsy(options.method) ||
      (is.string(options.method) &&
        CORS_SIMPLE_METHODS.includes(options.method.toUpperCase()));
  return {
    headers: Object.assign(
      { Accept: 'application/json; charset=utf-8' },
      ! IS_BEARER_TOKEN_IN_URLS_ENABLED ? {
        Authorization: `Bearer ${token}`,
      } : {},
      ! isCorsSimpleMethod ? {
        'Content-Type': 'application/json',
      } : {},
      is.not.object(options) ? undefined : options.headers
    ),
  };
}

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

class Api { }

Api.fetch = fetch;
Api.buildUrl = buildUrl;

export default Api;
