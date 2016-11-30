import { expect } from 'chai';
import ApiCall from './ApiCall';
import _ApiKey from './ApiKey';
import _ApiAction from './ApiAction';
import _ApiState from './ApiState';
import { Map } from 'immutable';
import Sinon from 'sinon';

describe('ApiCall', () => {
  it('exposes API_CALL_CLEAN action type', () => {
    expect(ApiCall.API_CALL_CLEAN).to.equal('API_CALL_CLEAN');
  });

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

    it('builds the key by itself if provided an object', () => {
      expect(ApiCall.find(state, { method: 'POST', url: '/path/1' })).to.equal(call2);
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
      expect(ApiCall.shouldPerform(state, 'GET /new/path')).to.equal(true, 'should fetch new');
    });

    it('builds the key by itself if provided an object', () => {
      expect(ApiCall.shouldPerform(state, { method: 'POST', url: '/path/1' })).to.be.false;
    });
  });

  describe('#createAction()', () => {
    const originalCreate = ApiCall.Action.create;

    afterEach(() => {
      ApiCall.Action.create = originalCreate;
    });

    it('calls ApiCall.Action.create()', () => {
      ApiCall.Action.create = Sinon.spy();
      const originalAction = { type: 'CALL_REQUEST', url: '/path', method: 'GET' };
      ApiCall.createAction(originalAction);
      expect(ApiCall.Action.create.args[0]).to.eql([originalAction]);
    });
  });

  describe('#clean()', () => {
    it('returns an action of API_CALL_CLEAN type with the passed key', () => {
      const action = ApiCall.clean('key');
      expect(action.type).to.equal(ApiCall.API_CALL_CLEAN);
      expect(action.key).to.equal('key');
    });
  });
});
