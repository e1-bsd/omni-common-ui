import Config from 'domain/Config';
import isomorphicFetch from 'isomorphic-fetch';
import is from 'is_js';
import Store from 'domain/Store';

export const buildUrl = (path) => Config.apiBase + path;

export const fetch = (url, options = {}) => {
  const finalOptions = Object.assign({}, getTokenHeader(), options);
  return isomorphicFetch(url, finalOptions)
    .then(checkResponseStatus)
    .then((response) => response.text())
    .then((response) => {
      if (is.empty(response)) {
        return response;
      }

      return JSON.parse(response);
    });
};

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function getTokenHeader() {
  const user = Store.get().getState().get('singleSignOn').get('oidc').user || {};
  const token = user.access_token;
  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
}

export const Api = { fetch };

export default Api;
