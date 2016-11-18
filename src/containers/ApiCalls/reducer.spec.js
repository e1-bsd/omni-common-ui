// import { expect } from 'chai';
// import ApiCall, { reducer } from './';
// import { Map } from 'immutable';
//
// const { Action, Key, Value } = ApiCall;
//
// describe('apiCalls reducer', () => {
//   let state;
//
//   beforeEach(() => {
//     state = Map();
//   });
//
//   it('does not modify the state if the action is not an Action', () => {
//     expect(reducer(state, {})).to.equal(state);
//   });
//
//   it('sets the proper map item to loading when received a _REQUEST action', () => {
//     const action = Action.create('apiCallId', {
//       type: 'FETCH_REQUEST',
//     });
//
//     const key = Key.create({ id: action.__apiCallId__, type: action.__apiCallType__ });
//     const value = reducer(state, action).get(key);
//     expect(Value.isValue(value)).to.equal(true, 'type check');
//     expect(Value.isLoading(value)).to.equal(true, 'is loading');
//     expect(Value.hasSucceeded(value)).to.equal(false, 'has succeeded');
//     expect(Value.hasFailed(value)).to.equal(false, 'has failed');
//     expect(value.error).to.equal(undefined, 'error is undefined');
//   });
//
//   it('sets the proper map item to success when received a _SUCCESS action', () => {
//     const action = Action.create('apiCallId', {
//       type: 'FETCH_SUCCESS',
//       data: 'thedata',
//     });
//
//     const key = Key.create({ id: action.__apiCallId__, type: action.__apiCallType__ });
//     const value = reducer(state, action).get(key);
//     expect(Value.isValue(value)).to.equal(true, 'type check');
//     expect(Value.isLoading(value)).to.equal(false, 'is loading');
//     expect(Value.hasSucceeded(value)).to.equal(true, 'has succeeded');
//     expect(Value.hasFailed(value)).to.equal(false, 'has failed');
//     expect(value.error).to.equal(undefined, 'error is undefined');
//   });
//
//   it('sets the proper map item to error when received a _FAILURE action', () => {
//     const action = Action.create('apiCallId', {
//       type: 'FETCH_FAILURE',
//       error: new Error(),
//     });
//
//     const key = Key.create({ id: action.__apiCallId__, type: action.__apiCallType__ });
//     const value = reducer(state, action).get(key);
//     expect(Value.isValue(value)).to.equal(true, 'type check');
//     expect(Value.isLoading(value)).to.equal(false, 'is loading');
//     expect(Value.hasSucceeded(value)).to.equal(false, 'has succeeded');
//     expect(Value.hasFailed(value)).to.equal(true, 'has failed');
//     expect(value.error).to.equal(action.error, 'error is the error');
//   });
// });
