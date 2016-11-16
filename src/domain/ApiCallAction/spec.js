import { expect } from 'chai';
import ApiCallAction from './';

describe('ApiCallAction', () => {
  it('throws an error if apiCallId does not exist', () => {
    expect(() => ApiCallAction.create()).to.throw();
  });

  it('throws an error if an object is not provided', () => {
    expect(() => ApiCallAction.create('apiCallId')).to.throw();
  });

  it('throws an error if the action does not have a type', () => {
    expect(() => ApiCallAction.create('apiCallId', {})).to.throw();
  });

  it('throws an error if action.type is not a string', () => {
    expect(() => ApiCallAction.create('apiCallId', { type: 1 })).to.throw();
  });

  it('throws an error if action.type does not end with _REQUEST, _SUCCESS or _FAILURE', () => {
    expect(() => ApiCallAction.create('apiCallId', { type: 'someString' })).to.throw();
  });

  it('returns the wrapped action if the provided one is valid', () => {
    expect(ApiCallAction.create('apiCallId', { type: 'CALL_REQUEST' }).__apiCallAction__)
        .to.be.true;
  });

  it('allows to access all the properties of the original action', () => {
    const callAction = ApiCallAction.create('apiCallId', {
      type: 'CALL_REQUEST',
      otherProp: 1,
    });
    expect(callAction.type).to.equal('CALL_REQUEST');
    expect(callAction.__apiCallId__).to.equal('apiCallId');
    expect(callAction.otherProp).to.equal(1);
  });

  it('throws an error if a _FAILURE action does not have a .error', () => {
    expect(() => ApiCallAction.create('apiCallId', { type: 'CALL_FAILURE' })).to.throw();
    expect(() => ApiCallAction.create('apiCallId', { type: 'CALL_FAILURE', error: null }))
        .to.throw();
    expect(() => ApiCallAction.create('apiCallId', {
      type: 'CALL_FAILURE',
      error: '',
    })).to.not.throw();
  });

  it('converts action.error into an instance of Error if it\'s not already the case', () => {
    expect(ApiCallAction.create('apiCallId', { type: 'CALL_FAILURE', error: '' }).error)
        .to.be.an.instanceof(Error);
  });

  context('#isRequestStarted()', () => {
    it('returns true if action.type ends with _REQUEST', () => {
      const callAction = ApiCallAction.create('apiCallId', {
        type: 'CALL_REQUEST',
      });
      expect(ApiCallAction.isRequestStarted(callAction)).to.be.true;
      expect(ApiCallAction.isRequestSuccess(callAction)).to.be.false;
      expect(ApiCallAction.isRequestFailure(callAction)).to.be.false;
    });
  });

  context('#isRequestSuccess()', () => {
    it('returns true if action.type ends with _SUCCESS', () => {
      const callAction = ApiCallAction.create('apiCallId', {
        type: 'CALL_SUCCESS',
        data: '',
      });
      expect(ApiCallAction.isRequestStarted(callAction)).to.be.false;
      expect(ApiCallAction.isRequestSuccess(callAction)).to.be.true;
      expect(ApiCallAction.isRequestFailure(callAction)).to.be.false;
    });
  });

  context('#isRequestFailure()', () => {
    it('returns true if action.type ends with _FAILURE', () => {
      const callAction = ApiCallAction.create('apiCallId', {
        type: 'CALL_FAILURE',
        error: new Error(),
      });
      expect(ApiCallAction.isRequestStarted(callAction)).to.be.false;
      expect(ApiCallAction.isRequestSuccess(callAction)).to.be.false;
      expect(ApiCallAction.isRequestFailure(callAction)).to.be.true;
    });
  });

  context('apiCallType', () => {
    it('is the original action type, removing the _REQUEST', () => {
      const callAction = ApiCallAction.create('apiCallId', { type: 'CALL_REQUEST' });
      expect(callAction.__apiCallType__).to.be.equal('CALL');
    });

    it('is the original action type, removing the _SUCCESS', () => {
      const callAction = ApiCallAction.create('apiCallId', {
        type: 'CALL_SUCCESS',
        data: '',
      });
      expect(callAction.__apiCallType__).to.be.equal('CALL');
    });

    it('is the original action type, removing the _FAILURE', () => {
      const callAction = ApiCallAction.create('apiCallId', {
        type: 'CALL_FAILURE',
        error: new Error(),
      });
      expect(callAction.__apiCallType__).to.be.equal('CALL');
    });
  });
});
