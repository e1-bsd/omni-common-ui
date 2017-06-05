/* eslint-disable global-require */

import { Map } from 'immutable';
import * as ConfigPkg from 'domain/Config';
import isomorphicFetch from 'isomorphic-fetch';

jest.mock('domain/Store', () => ({
  get: () => {
    // eslint-disable-next-line global-require, no-shadow
    const { Map } = require('immutable');
    return { getState: () => new Map({ singleSignOn: { user: { access_token: 'TOKEN' } } }) };
  },
}));

jest.mock('isomorphic-fetch', () => jest.fn());

beforeEach(() => {
  isomorphicFetch.mockReset();
});

describe('#buildUrl', () => {
  it('appends its parameter to Config.apiBase', () => {
    ConfigPkg.default = new Map({ apiBase: 'http://host/api' });
    const { buildUrl } = require('./');
    expect(buildUrl('/somePath')).toBe('http://host/api/somePath');
  });
});

describe('#fetch', () => {
  describe('includeBearerTokenInApiGetUrls=undefined', () => {
    const { fetch } = require('./');

    it('calls isomorphicFetch with the expected parameters', () => {
      fetch('https://domain/somePath');
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['https://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          Authorization: 'Bearer TOKEN',
        },
      }]);
    });
  });

  describe('includeBearerTokenInApiGetUrls=true', () => {
    ConfigPkg.default = new Map({ includeBearerTokenInApiGetUrls: true });
    const { fetch } = require('./');

    it('calls isomorphicFetch with the expected parameters (non-https)', () => {
      fetch('http://domain/somePath');
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['http://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters', () => {
      fetch('https://domain/somePath');
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['https://domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (same scheme)', () => {
      fetch('//domain/somePath');
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (PUT)', () => {
      fetch('//domain/somePath', { method: 'PUT' });
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['//domain/somePath?bearer_token=TOKEN', {
        method: 'PUT',
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (custom headers)', () => {
      fetch('//domain/somePath', { headers: { 'X-Custom-Header': 'Content' } });
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'X-Custom-Header': 'Content',
        },
      }]);
    });
  });
});
