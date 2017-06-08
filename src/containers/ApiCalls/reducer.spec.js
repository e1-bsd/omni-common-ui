import ApiCall, { reducer } from './';
import { Map } from 'immutable';

const { Key, State } = ApiCall;

describe('ApiCalls', () => {
  describe('reducer', () => {
    let state;

    beforeEach(() => {
      state = Map();
    });

    test('does not modify the state if the action is not an Action', () => {
      expect(reducer(state, {})).toBe(state);
    });

    test('removes an entry when API_CALL_CLEAN action is received', () => {
      state = state.set('key', 'value');
      expect(reducer(state, ApiCall.clean('key')).get('key')).toBeUndefined();
    });

    test('sets the proper map item to loading when received a _REQUEST action', () => {
      const action = ApiCall.createAction({
        type: 'FETCH_REQUEST',
        url: 'url',
        method: 'GET',
      });

      const key = Key.create(action);
      const value = reducer(state, action).get(key);
      expect(State.isValue(value)).toBe(true);
      expect(State.isLoading(value)).toBe(true);
      expect(State.hasSucceeded(value)).toBe(false);
      expect(State.hasFailed(value)).toBe(false);
      expect(value.error).toBe(undefined);
      expect(value.id).toBe(key);
    });

    test('sets the proper map item to success when received a _SUCCESS action', () => {
      const action = ApiCall.createAction({
        type: 'FETCH_SUCCESS',
        url: 'url',
        method: 'GET',
      });

      const key = Key.create(action);
      const value = reducer(state, action).get(key);
      expect(State.isValue(value)).toBe(true);
      expect(State.isLoading(value)).toBe(false);
      expect(State.hasSucceeded(value)).toBe(true);
      expect(State.hasFailed(value)).toBe(false);
      expect(value.error).toBe(undefined);
      expect(value.id).toBe(key);
    });

    test('sets the proper map item to error when received a _FAILURE action', () => {
      const action = ApiCall.createAction({
        type: 'FETCH_FAILURE',
        error: new Error(),
        url: 'url',
        method: 'GET',
      });

      const key = Key.create(action);
      const value = reducer(state, action).get(key);
      expect(State.isValue(value)).toBe(true);
      expect(State.isLoading(value)).toBe(false);
      expect(State.hasSucceeded(value)).toBe(false);
      expect(State.hasFailed(value)).toBe(true);
      expect(value.error).toBe(action.error);
      expect(value.id).toBe(key);
    });
  });
});
