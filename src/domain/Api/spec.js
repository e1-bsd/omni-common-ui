import { Map } from 'immutable';
import { expect } from 'chai';
import Sinon from 'sinon';

describe('Api', () => {
  let isomorphicFetch;

  const importDeps = (config = {}) => {
    // eslint-disable-next-line global-require,import/no-webpack-loader-syntax
    const imports = require('inject?isomorphic-fetch&domain/Config&domain/Store!./')({
      'isomorphic-fetch': isomorphicFetch = Sinon.spy(),
      'domain/Config': new Map(config),
      'domain/Store': {
        get: () => ({
          getState: () => new Map({ singleSignOn: { user: { access_token: 'TOKEN' } } }),
        }),
      },
    });
    return {
      buildUrl: imports.buildUrl,
      fetch: imports.fetch,
    };
  };

  describe('#buildUrl', () => {
    it('appends its parameter to Config.apiBase', () => {
      const { buildUrl } = importDeps({ apiBase: 'http://host/api' });
      expect(buildUrl('/somePath')).to.equal('http://host/api/somePath');
    });
  });

  describe('#fetch', () => {
    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=undefined)', () => {
      const { fetch } = importDeps();
      fetch('https://domain/somePath');
      expect(isomorphicFetch.called).to.be.true;
      expect(isomorphicFetch.args[0]).to.eql(['https://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          Authorization: 'Bearer TOKEN',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, non-https)', () => {
      const { fetch } = importDeps({ includeBearerTokenInApiGetUrls: true });
      fetch('http://domain/somePath');
      expect(isomorphicFetch.called).to.be.true;
      expect(isomorphicFetch.args[0]).to.eql(['http://domain/somePath', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true)', () => {
      const { fetch } = importDeps({ includeBearerTokenInApiGetUrls: true });
      fetch('https://domain/somePath');
      expect(isomorphicFetch.called).to.be.true;
      expect(isomorphicFetch.args[0]).to.eql(['https://domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, same scheme)', () => {
      const { fetch } = importDeps({ includeBearerTokenInApiGetUrls: true });
      fetch('//domain/somePath');
      expect(isomorphicFetch.called).to.be.true;
      expect(isomorphicFetch.args[0]).to.eql(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, PUT)', () => {
      const { fetch } = importDeps({ includeBearerTokenInApiGetUrls: true });
      fetch('//domain/somePath', { method: 'PUT' });
      expect(isomorphicFetch.called).to.be.true;
      expect(isomorphicFetch.args[0]).to.eql(['//domain/somePath?bearer_token=TOKEN', {
        method: 'PUT',
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json',
        },
      }]);
    });

    it('calls isomorphicFetch with the expected parameters (includeBearerTokenInApiGetUrls=true, custom headers)', () => {
      const { fetch } = importDeps({ includeBearerTokenInApiGetUrls: true });
      fetch('//domain/somePath', { headers: { 'X-Custom-Header': 'Content' } });
      expect(isomorphicFetch.called).to.be.true;
      expect(isomorphicFetch.args[0]).to.eql(['//domain/somePath?bearer_token=TOKEN', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'X-Custom-Header': 'Content',
        },
      }]);
    });
  });
});
