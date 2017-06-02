import { expect } from 'chai';
import Sinon from 'sinon';

describe('ApiCall', () => {
  describe('ApiAction', () => {
    let log;
    let ApiAction;

    const buildAction = (configParam = {}) => Object.assign({},
      {
        type: 'CALL_FAILURE',
        error: new Error(),
        url: '/some/path',
        method: 'GET',
      },
      configParam);

    beforeEach(() => {
      log = { error: Sinon.spy() };
      // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
      ApiAction = require('inject-loader?domain/log!./ApiAction')({
        'domain/log': log,
      }).default;
    });

    it('throws an error if nothing is passed', () => {
      expect(() => ApiAction.create()).to.throw();
    });

    it('throws an error if a parameter that is not an object is passed', () => {
      expect(() => ApiAction.create('some string')).to.throw();
    });

    it('throws an error if the action does not have a url property', () => {
      expect(() => ApiAction.create(buildAction({ url: undefined }))).to.throw();
    });

    it('throws an error if the url property is not a string', () => {
      expect(() => ApiAction.create(buildAction({ url: {} }))).to.throw();
    });

    it('throws an error if the action does not have a method proptery', () => {
      expect(() => ApiAction.create(buildAction({ method: undefined }))).to.throw();
    });

    it('throws an error if the method property is not GET, PUT, POST or DELETE', () => {
      expect(() => ApiAction.create(buildAction({ method: 'some string' }))).to.throw();
      expect(() => ApiAction.create(buildAction({ method: 'GET' }))).to.not.throw();
      expect(() => ApiAction.create(buildAction({ method: 'PUT' }))).to.not.throw();
      expect(() => ApiAction.create(buildAction({ method: 'POST' }))).to.not.throw();
      expect(() => ApiAction.create(buildAction({ method: 'DELETE' }))).to.not.throw();
    });

    it('throws an error if the action does not have a type proptery', () => {
      expect(() => ApiAction.create(buildAction({ type: undefined }))).to.throw();
    });

    it('throws an error if the type proptery has lower case letters', () => {
      expect(() => ApiAction.create(buildAction({ type: 'Call_REQUEST' }))).to.throw();
    });

    it('throws an error ' +
        'if the type property does not end with _REQUEST, _SUCCESS or _FAILURE', () => {
      expect(() => ApiAction.create(buildAction({ type: 'some string' }))).to.throw();
      expect(() => ApiAction.create(buildAction({ type: 'CALL_REQUEST' }))).to.not.throw();
      expect(() => ApiAction.create(buildAction({ type: 'CALL_SUCCESS' }))).to.not.throw();
      expect(() => ApiAction.create(buildAction({ type: 'CALL_FAILURE' }))).to.not.throw();
    });

    it('returns the wrapped action if the provided one is valid', () => {
      const action = ApiAction.create(buildAction());
      expect(action.url).to.equal('/some/path');
      expect(action.method).to.equal('GET');
    });

    it('does not return the same object instance it receives', () => {
      const originalAction = buildAction();
      const action = ApiAction.create(originalAction);
      expect(originalAction).to.not.equal(action);
    });

    it('converts the provided URL to lower case', () => {
      const action = ApiAction.create(buildAction({ url: '/some/Path' }));
      expect(action.url).to.equal('/some/path');
    });

    it('converts the provided method to upper case', () => {
      const action = ApiAction.create(buildAction({ method: 'get' }));
      expect(action.method).to.equal('GET');
    });

    it('allows to access all the properties of the original action', () => {
      const callAction = ApiAction.create(buildAction({ otherProp: 1 }));
      expect(callAction.otherProp).to.equal(1);
    });

    it('throws an error if a _FAILURE action does not have an error property', () => {
      expect(() => ApiAction.create(buildAction({ error: undefined }))).to.throw();
      expect(() => ApiAction.create(buildAction({ error: null }))).to.throw();
      expect(() => ApiAction.create(buildAction({ error: '' }))).to.not.throw();
    });

    it('converts action.error into an instance of Error if it\'s not already the case', () => {
      expect(ApiAction.create(buildAction({ error: '' })).error).to.be.an.instanceof(Error);
    });

    it('logs the error of a failure action', () => {
      const error = new Error('an error');
      ApiAction.create(buildAction({ error }));
      expect(log.error.args).to.eql([[error]]);
    });

    context('#isApiAction()', () => {
      it('returns true an action was created with ApiAction.create()', () => {
        const originalAction = buildAction({ type: 'CALL_REQUEST' });
        const callAction = ApiAction.create(originalAction);
        expect(ApiAction.isApiAction(callAction)).to.equal(true, 'api action');
        expect(ApiAction.isApiAction(originalAction)).to.equal(false, 'original action');
      });
    });

    context('#isStarted()', () => {
      it('returns true if action.type ends with _REQUEST', () => {
        const callAction = ApiAction.create(buildAction({ type: 'CALL_REQUEST' }));
        expect(ApiAction.isStarted(callAction)).to.be.true;
        expect(ApiAction.isSuccess(callAction)).to.be.false;
        expect(ApiAction.isFailure(callAction)).to.be.false;
      });
    });

    context('#isSuccess()', () => {
      it('returns true if action.type ends with _SUCCESS', () => {
        const callAction = ApiAction.create(buildAction({ type: 'CALL_SUCCESS' }));
        expect(ApiAction.isStarted(callAction)).to.be.false;
        expect(ApiAction.isSuccess(callAction)).to.be.true;
        expect(ApiAction.isFailure(callAction)).to.be.false;
      });
    });

    context('#isFailure()', () => {
      it('returns true if action.type ends with _FAILURE', () => {
        const callAction = ApiAction.create(buildAction());
        expect(ApiAction.isStarted(callAction)).to.be.false;
        expect(ApiAction.isSuccess(callAction)).to.be.false;
        expect(ApiAction.isFailure(callAction)).to.be.true;
      });
    });
  });
});
