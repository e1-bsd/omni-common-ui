import _Config from 'domain/Config';
import Sinon from 'sinon';
import { expect } from 'chai';

describe('SingleSignOn', () => {
  let createOidcMiddleware;

  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  const requireMiddleware = (Config) => require('inject?domain/Config&redux-oidc!./')({
    'domain/Config': _Config.merge(Config),
    'redux-oidc': createOidcMiddleware,
  });

  beforeEach(() => {
    createOidcMiddleware = Sinon.spy();
  });

  it('exports the oidc middleware if featureLogin is true', () => {
    requireMiddleware({ featureLogin: true });
    expect(createOidcMiddleware.called).to.be.true;
  });

  it('exports a fake oidc middleware if featureLogin is not true', () => {
    requireMiddleware({ featureLogin: false });
    expect(createOidcMiddleware.called).to.be.false;
  });
});
