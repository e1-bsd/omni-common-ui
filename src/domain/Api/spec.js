import { Map } from 'immutable';
import isomorphicFetch from 'isomorphic-fetch';

jest.mock('domain/Store', () => ({
  get: () => {
    // eslint-disable-next-line no-shadow
    const { Map } = require('immutable');
    return { getState: () => new Map({ singleSignOn: { user: { access_token: 'TOKEN' } } }) };
  },
}));

jest.mock('isomorphic-fetch', () => global.fetch);

function mockConfig(config) {
  require('domain/Config').default = new Map(config);
}

beforeEach(() => {
  jest.resetModules();
  isomorphicFetch.resetMocks();
  isomorphicFetch.mockResponse(JSON.stringify({ foo: 'bar' }), { status: 200 });
});

describe('#buildUrl', () => {
  test('appends its parameter to Config.apiBase', () => {
    mockConfig({ apiBase: 'http://host/api' });
    const { buildUrl } = require('./');
    expect(buildUrl('/somePath')).toBe('http://host/api/somePath');
  });
});

describe('#fetch', () => {
  describe('includeBearerTokenInApiGetUrls=undefined', () => {
    test('calls isomorphicFetch with the expected parameters', async () => {
      expect.assertions(2);
      const { fetch } = require('./');
      try { await fetch('https://domain/somePath'); } catch (e) { throw e; }
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
    let fetch;

    beforeEach(() => {
      mockConfig({ includeBearerTokenInApiGetUrls: true });
      fetch = require('./').fetch;
    });

    test('calls isomorphicFetch with the expected parameters (non-https)', () => {
      fetch('http://domain/somePath');
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['http://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    test('calls isomorphicFetch with the expected parameters', () => {
      fetch('https://domain/somePath');
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['https://domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    test('calls isomorphicFetch with the expected parameters (same scheme)', () => {
      fetch('//domain/somePath');
      expect(isomorphicFetch).toHaveBeenCalled();
      expect(isomorphicFetch.mock.calls[0]).toEqual(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    test('calls isomorphicFetch with the expected parameters (PUT)', () => {
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

    test('calls isomorphicFetch with the expected parameters (custom headers)', () => {
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
