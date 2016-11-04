import { expect } from 'chai';
import ApiCallAction from './';

describe('ApiCallAction', () => {
  it('throws an error if an object is not provided', () => {
    expect(() => ApiCallAction.create()).to.throw();
  });

  it('throws an error if the action does not have a type', () => {
    expect(() => ApiCallAction.create({})).to.throw();
  });

  it('throws an error if action.type is not a string', () => {
    expect(() => ApiCallAction.create({ type: 1 })).to.throw();
  });

  it('throws an error if action.type does not end with _REQUEST, _SUCCESS or _FAILURE', () => {
    expect(() => ApiCallAction.create({ type: 'someString' })).to.throw();
  });

  it('throws an error if action.apiCallId does not exist', () => {
    expect(() => ApiCallAction.create({ type: 'CALL_REQUEST' })).to.throw();
  });

  it('returns the wrapped action if the provided one is valid', () => {
    expect(ApiCallAction.create({ type: 'CALL_REQUEST', apiCallId: 'apiCallId' }).__apiCallAction__)
        .to.be.true;
  });

  it('allows to access all the properties of the original action', () => {
    const callAction = ApiCallAction.create({
      type: 'CALL_REQUEST',
      apiCallId: 'apiCallId',
      otherProp: 1,
    });
    expect(callAction.type).to.equal('CALL_REQUEST');
    expect(callAction.apiCallId).to.equal('apiCallId');
    expect(callAction.otherProp).to.equal(1);
  });

  it('throws an error if a _SUCCESS action does not have a .data property', () => {
    expect(() => ApiCallAction.create({ type: 'CALL_SUCCESS', apiCallId: 'apiCallId' })).to.throw();
    expect(() => ApiCallAction.create({ type: 'CALL_SUCCESS', apiCallId: 'apiCallId', data: '' }))
        .to.not.throw();
  });

  it('throws an error ' +
      'if a _FAILURE action does not have a .error property that is an Error', () => {
    expect(() => ApiCallAction.create({ type: 'CALL_FAILURE', apiCallId: 'apiCallId' })).to.throw();
    expect(() => ApiCallAction.create({ type: 'CALL_FAILURE', apiCallId: 'apiCallId', error: {} }))
        .to.throw();
    expect(() => ApiCallAction.create({
      type: 'CALL_FAILURE',
      apiCallId: 'apiCallId',
      error: new Error(),
    })).to.not.throw();
  });

  context('#isRequestStarted()', () => {
    it('returns true if action.type ends with _REQUEST', () => {
      const callAction = ApiCallAction.create({
        type: 'CALL_REQUEST',
        apiCallId: 'apiCallId',
      });
      expect(ApiCallAction.isRequestStarted(callAction)).to.be.true;
      expect(ApiCallAction.isRequestSuccess(callAction)).to.be.false;
      expect(ApiCallAction.isRequestFailure(callAction)).to.be.false;
    });
  });

  context('#isRequestSuccess()', () => {
    it('returns true if action.type ends with _SUCCESS', () => {
      const callAction = ApiCallAction.create({
        type: 'CALL_SUCCESS',
        apiCallId: 'apiCallId',
        data: '',
      });
      expect(ApiCallAction.isRequestStarted(callAction)).to.be.false;
      expect(ApiCallAction.isRequestSuccess(callAction)).to.be.true;
      expect(ApiCallAction.isRequestFailure(callAction)).to.be.false;
    });
  });

  context('#isRequestFailure()', () => {
    it('returns true if action.type ends with _FAILURE', () => {
      const callAction = ApiCallAction.create({
        type: 'CALL_FAILURE',
        apiCallId: 'apiCallId',
        error: new Error(),
      });
      expect(ApiCallAction.isRequestStarted(callAction)).to.be.false;
      expect(ApiCallAction.isRequestSuccess(callAction)).to.be.false;
      expect(ApiCallAction.isRequestFailure(callAction)).to.be.true;
    });
  });

  context('apiCallType', () => {
    it('is the original action type, removing the _REQUEST', () => {
      const callAction = ApiCallAction.create({ type: 'CALL_REQUEST', apiCallId: 'apiCallId' });
      expect(callAction.apiCallType).to.be.equal('CALL');
    });

    it('is the original action type, removing the _SUCCESS', () => {
      const callAction = ApiCallAction.create({
        type: 'CALL_SUCCESS',
        apiCallId: 'apiCallId',
        data: '',
      });
      expect(callAction.apiCallType).to.be.equal('CALL');
    });

    it('is the original action type, removing the _FAILURE', () => {
      const callAction = ApiCallAction.create({
        type: 'CALL_FAILURE',
        apiCallId: 'apiCallId',
        error: new Error(),
      });
      expect(callAction.apiCallType).to.be.equal('CALL');
    });
  });
});
