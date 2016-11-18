import { expect } from 'chai';
import ApiCall from './ApiCall';
import _ApiKey from './ApiKey';
import _ApiAction from './ApiAction';
import _ApiState from './ApiState';
import { Map } from 'immutable';

describe('ApiCall', () => {
  it('exposes ApiKey as Key', () => {
    expect(ApiCall.Key).to.equal(_ApiKey);
  });

  it('exposes ApiAction as Action', () => {
    expect(ApiCall.Action).to.equal(_ApiAction);
  });

  it('exposes ApiState as State', () => {
    expect(ApiCall.State).to.equal(_ApiState);
  });

  it('does not allow to reassign its inner classes', () => {
    expect(() => { ApiCall.State = {}; }).to.throw();
    expect(() => { ApiCall.Action = {}; }).to.throw();
    expect(() => { ApiCall.Key = {}; }).to.throw();
  });

  describe('#find()', () => {
    const call1 = ApiCall.State.createLoading();
    const call2 = ApiCall.State.createSucceeded();
    const call3 = ApiCall.State.createFailed();
    const state = new Map({
      apiCalls: new Map({
        [ApiCall.Key.create({ method: 'GET', url: '/path/1' })]: call1,
        [ApiCall.Key.create({ method: 'POST', url: '/path/1' })]: call2,
        [ApiCall.Key.create({ method: 'GET', url: '/path/2' })]: call3,
      }),
    });

    it('returns the state for the API call with the provided key', () => {
      const key = ApiCall.Key.create({ method: 'GET', url: '/path/1' });
      expect(ApiCall.find(state, key)).to.equal(call1);
    });
  });

  describe('#shouldPerform()', () => {
    const call1 = ApiCall.State.createLoading();
    const call2 = ApiCall.State.createSucceeded();
    const call3 = ApiCall.State.createFailed();
    const state = new Map({
      apiCalls: new Map({
        [ApiCall.Key.create({ method: 'GET', url: '/path/1' })]: call1,
        [ApiCall.Key.create({ method: 'POST', url: '/path/1' })]: call2,
        [ApiCall.Key.create({ method: 'GET', url: '/path/2' })]: call3,
        [ApiCall.Key.create({ method: 'GET', url: '/path/3' })]: undefined,
      }),
    });

    it('returns whether an API call should be performed or not', () => {
      expect(ApiCall.shouldPerform(state, 'GET /path/1')).to.equal(false, 'loading');
      expect(ApiCall.shouldPerform(state, 'POST /path/1')).to.equal(false, 'succeeded');
      expect(ApiCall.shouldPerform(state, 'GET /path/2')).to.equal(false, 'failed');
      expect(ApiCall.shouldPerform(state, 'GET /path/3')).to.equal(true, 'should fetch');
    });
  });
});
