import { expect } from 'chai';
import ApiCall, { reducer } from './';
import { Map } from 'immutable';

const { Key, State } = ApiCall;

describe('ApiCalls', () => {
  describe('reducer', () => {
    let state;

    beforeEach(() => {
      state = Map();
    });

    it('does not modify the state if the action is not an Action', () => {
      expect(reducer(state, {})).to.equal(state);
    });

    it('sets the proper map item to loading when received a _REQUEST action', () => {
      const action = ApiCall.createAction({
        type: 'FETCH_REQUEST',
        url: 'url',
        method: 'GET',
      });

      const key = Key.create(action);
      const value = reducer(state, action).get(key);
      expect(State.isValue(value)).to.equal(true, 'type check');
      expect(State.isLoading(value)).to.equal(true, 'is loading');
      expect(State.hasSucceeded(value)).to.equal(false, 'has succeeded');
      expect(State.hasFailed(value)).to.equal(false, 'has failed');
      expect(value.error).to.equal(undefined, 'error is undefined');
      expect(value.id).to.equal(key, 'state.id = key');
    });

    it('sets the proper map item to success when received a _SUCCESS action', () => {
      const action = ApiCall.createAction({
        type: 'FETCH_SUCCESS',
        url: 'url',
        method: 'GET',
      });

      const key = Key.create(action);
      const value = reducer(state, action).get(key);
      expect(State.isValue(value)).to.equal(true, 'type check');
      expect(State.isLoading(value)).to.equal(false, 'is loading');
      expect(State.hasSucceeded(value)).to.equal(true, 'has succeeded');
      expect(State.hasFailed(value)).to.equal(false, 'has failed');
      expect(value.error).to.equal(undefined, 'error is undefined');
      expect(value.id).to.equal(key, 'state.id = key');
    });

    it('sets the proper map item to error when received a _FAILURE action', () => {
      const action = ApiCall.createAction({
        type: 'FETCH_FAILURE',
        error: new Error(),
        url: 'url',
        method: 'GET',
      });

      const key = Key.create(action);
      const value = reducer(state, action).get(key);
      expect(State.isValue(value)).to.equal(true, 'type check');
      expect(State.isLoading(value)).to.equal(false, 'is loading');
      expect(State.hasSucceeded(value)).to.equal(false, 'has succeeded');
      expect(State.hasFailed(value)).to.equal(true, 'has failed');
      expect(value.error).to.equal(action.error, 'error is the error');
      expect(value.id).to.equal(key, 'state.id = key');
    });
  });
});
