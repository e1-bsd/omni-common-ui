import Config from 'domain/Config';
import isomorphicFetch from 'isomorphic-fetch';
import is from 'is_js';

export const buildUrl = (path) => Config.apiBase + path;

export const fetch = (...args) => isomorphicFetch(...args)
    .then(checkResponseStatus)
    .then((response) => response.text())
    .then((response) => {
      if (is.empty(response)) {
        return response;
      }

      return JSON.parse(response);
    });

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export const Api = { fetch };

export default Api;
