import ApiCall from './ApiCall';
import _ApiKey from './ApiKey';
import _ApiAction from './ApiAction';
import _ApiState from './ApiState';
import { Map } from 'immutable';
import Sinon from 'sinon';

test('exposes API_CALL_CLEAN action type', () => {
  expect(ApiCall.API_CALL_CLEAN).toBe('API_CALL_CLEAN');
});

test('exposes ApiKey as Key', () => {
  expect(ApiCall.Key).toBe(_ApiKey);
});

test('exposes ApiAction as Action', () => {
  expect(ApiCall.Action).toBe(_ApiAction);
});

test('exposes ApiState as State', () => {
  expect(ApiCall.State).toBe(_ApiState);
});

test('does not allow to reassign its inner classes', () => {
  expect(() => { ApiCall.State = {}; }).toThrowError();
  expect(() => { ApiCall.Action = {}; }).toThrowError();
  expect(() => { ApiCall.Key = {}; }).toThrowError();
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

  test('returns the state for the API call with the provided key', () => {
    const key = ApiCall.Key.create({ method: 'GET', url: '/path/1' });
    expect(ApiCall.find(state, key)).toBe(call1);
  });

  test('builds the key by itself if provided an object', () => {
    expect(ApiCall.find(state, { method: 'POST', url: '/path/1' })).toBe(call2);
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

  test('returns whether an API call should be performed or not', () => {
    expect(ApiCall.shouldPerform(state, 'GET /path/1')).toBe(false);
    expect(ApiCall.shouldPerform(state, 'POST /path/1')).toBe(false);
    expect(ApiCall.shouldPerform(state, 'GET /path/2')).toBe(false);
    expect(ApiCall.shouldPerform(state, 'GET /path/3')).toBe(true);
    expect(ApiCall.shouldPerform(state, 'GET /new/path')).toBe(true);
  });

  test('builds the key by itself if provided an object', () => {
    expect(ApiCall.shouldPerform(state, { method: 'POST', url: '/path/1' })).toBe(false);
  });
});

describe('#createAction()', () => {
  const originalCreate = ApiCall.Action.create;

  afterEach(() => {
    ApiCall.Action.create = originalCreate;
  });

  test('calls ApiCall.Action.create()', () => {
    ApiCall.Action.create = Sinon.spy();
    const originalAction = { type: 'CALL_REQUEST', url: '/path', method: 'GET' };
    ApiCall.createAction(originalAction);
    expect(ApiCall.Action.create.args[0]).toEqual([originalAction]);
  });
});

describe('#clean()', () => {
  test('returns an action of API_CALL_CLEAN type with the passed key', () => {
    const action = ApiCall.clean('key');
    expect(action.type).toBe(ApiCall.API_CALL_CLEAN);
    expect(action.key).toBe('key');
  });
});

describe('#getErrors()', () => {
  const state = new Map({
    apiCalls: new Map({
      [ApiCall.Key.create({ method: 'GET', url: '/path/1' })]: ApiCall.State.createLoading(),
      [ApiCall.Key.create({ method: 'POST', url: '/path/1' })]: ApiCall.State.createFailed(),
      [ApiCall.Key.create({ method: 'GET', url: '/path/2' })]: ApiCall.State.createFailed(),
      [ApiCall.Key.create({ method: 'GET', url: '/path/3' })]: ApiCall.State.createSucceeded(),
    }),
  });

  test('returns all errored API calls', () => {
    const errors = ApiCall.getErrors(state);
    expect(errors.size).toBe(2);
  });
});
