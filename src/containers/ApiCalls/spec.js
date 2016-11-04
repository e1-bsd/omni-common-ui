import { expect } from 'chai';
import reducer from './';
import { Map } from 'immutable';
import ApiCallAction from 'domain/ApiCallAction';
import ApiCallKey from './ApiCallKey';
import ApiResponse from 'domain/ApiResponse';

describe('apiCalls reducer', () => {
  let state;

  beforeEach(() => {
    state = Map();
  });

  it('does not modify the state if the action is not an ApiCallAction', () => {
    expect(reducer(state, {})).to.equal(state);
  });

  it('sets the proper map item to loading when received a _REQUEST action', () => {
    const action = new ApiCallAction({
      type: 'FETCH_REQUEST',
      apiCallId: 'apiCallId',
    });

    const key = new ApiCallKey({ id: action.apiCallId, type: action.apiCallType });
    const result = reducer(state, action);
    expect(result.get(key)).to.be.an.instanceof(ApiResponse);
    expect(result.get(key).loading).to.be.true;
    expect(result.get(key).data).to.be.undefined;
    expect(result.get(key).error).to.be.undefined;
  });

  it('sets the proper map item to success when received a _SUCCESS action', () => {
    const action = new ApiCallAction({
      type: 'FETCH_SUCCESS',
      apiCallId: 'apiCallId',
      data: 'thedata',
    });

    const key = new ApiCallKey({ id: action.apiCallId, type: action.apiCallType });
    const result = reducer(state, action);
    expect(result.get(key)).to.be.an.instanceof(ApiResponse);
    expect(result.get(key).loading).to.be.false;
    expect(result.get(key).data).to.equal('thedata');
    expect(result.get(key).error).to.be.undefined;
  });

  it('sets the proper map item to error when received a _FAILURE action', () => {
    const action = new ApiCallAction({
      type: 'FETCH_FAILURE',
      apiCallId: 'apiCallId',
      error: new Error(),
    });

    const key = new ApiCallKey({ id: action.apiCallId, type: action.apiCallType });
    const result = reducer(state, action);
    expect(result.get(key)).to.be.an.instanceof(ApiResponse);
    expect(result.get(key).loading).to.be.false;
    expect(result.get(key).data).to.be.undefined;
    expect(result.get(key).error).to.equal(action.error);
  });
});
