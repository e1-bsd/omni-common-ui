import { expect } from 'chai';
import ApiCallAction from './';

describe('ApiCallAction', () => {
  it('throws an error if an object is not provided', () => {
    expect(() => new ApiCallAction()).to.throw();
  });

  it('throws an error if the action does not have a type', () => {
    expect(() => new ApiCallAction({})).to.throw();
  });

  it('throws an error if action.type is not a string', () => {
    expect(() => new ApiCallAction({ type: 1 })).to.throw();
  });

  it('throws an error if action.type does not end with _REQUEST, _SUCCESS or _FAILURE', () => {
    expect(() => new ApiCallAction({ type: 'someString' })).to.throw();
  });

  it('throws an error if action.apiCallId does not exist', () => {
    expect(() => new ApiCallAction({ type: 'CALL_REQUEST' })).to.throw();
  });

  it('returns the wrapped action if the provided one is valid', () => {
    expect(new ApiCallAction({ type: 'CALL_REQUEST', apiCallId: 'apiCallId' }))
        .to.be.an.instanceof(ApiCallAction);
  });

  it('allows to access all the properties of the original action', () => {
    const callAction = new ApiCallAction({
      type: 'CALL_REQUEST',
      apiCallId: 'apiCallId',
      otherProp: 1,
    });
    expect(callAction.type).to.equal('CALL_REQUEST');
    expect(callAction.apiCallId).to.equal('apiCallId');
    expect(callAction.otherProp).to.equal(1);
  });

  context('#isRequestStarted()', () => {
    it('returns true if action.type ends with _REQUEST', () => {
      const callAction = new ApiCallAction({ type: 'CALL_REQUEST', apiCallId: 'apiCallId' });
      expect(callAction.isRequestStarted()).to.be.true;
      expect(callAction.isRequestSuccess()).to.be.false;
      expect(callAction.isRequestFailure()).to.be.false;
    });
  });

  context('#isRequestSuccess()', () => {
    it('returns true if action.type ends with _SUCCESS', () => {
      const callAction = new ApiCallAction({ type: 'CALL_SUCCESS', apiCallId: 'apiCallId' });
      expect(callAction.isRequestStarted()).to.be.false;
      expect(callAction.isRequestSuccess()).to.be.true;
      expect(callAction.isRequestFailure()).to.be.false;
    });
  });

  context('#isRequestFailure()', () => {
    it('returns true if action.type ends with _FAILURE', () => {
      const callAction = new ApiCallAction({ type: 'CALL_FAILURE', apiCallId: 'apiCallId' });
      expect(callAction.isRequestStarted()).to.be.false;
      expect(callAction.isRequestSuccess()).to.be.false;
      expect(callAction.isRequestFailure()).to.be.true;
    });
  });

  context('apiCallType', () => {
    it('is the original action type, removing the _REQUEST', () => {
      const callAction = new ApiCallAction({ type: 'CALL_FAILURE', apiCallId: 'apiCallId' });
      expect(callAction.apiCallType).to.be.equal('CALL');
    });

    it('is the original action type, removing the _SUCCESS', () => {
      const callAction = new ApiCallAction({ type: 'CALL_SUCCESS', apiCallId: 'apiCallId' });
      expect(callAction.apiCallType).to.be.equal('CALL');
    });

    it('is the original action type, removing the _FAILURE', () => {
      const callAction = new ApiCallAction({ type: 'CALL_FAILURE', apiCallId: 'apiCallId' });
      expect(callAction.apiCallType).to.be.equal('CALL');
    });
  });
});
