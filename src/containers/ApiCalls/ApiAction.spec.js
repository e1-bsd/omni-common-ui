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
      expect(() => ApiAction.create()).toThrowError();
    });

    it('throws an error if a parameter that is not an object is passed', () => {
      expect(() => ApiAction.create('some string')).toThrowError();
    });

    it('throws an error if the action does not have a url property', () => {
      expect(() => ApiAction.create(buildAction({ url: undefined }))).toThrowError();
    });

    it('throws an error if the url property is not a string', () => {
      expect(() => ApiAction.create(buildAction({ url: {} }))).toThrowError();
    });

    it('throws an error if the action does not have a method proptery', () => {
      expect(() => ApiAction.create(buildAction({ method: undefined }))).toThrowError();
    });

    it('throws an error if the method property is not GET, PUT, POST or DELETE', () => {
      expect(() => ApiAction.create(buildAction({ method: 'some string' }))).toThrowError();
      expect(() => ApiAction.create(buildAction({ method: 'GET' }))).not.toThrowError();
      expect(() => ApiAction.create(buildAction({ method: 'PUT' }))).not.toThrowError();
      expect(() => ApiAction.create(buildAction({ method: 'POST' }))).not.toThrowError();
      expect(() => ApiAction.create(buildAction({ method: 'DELETE' }))).not.toThrowError();
    });

    it('throws an error if the action does not have a type proptery', () => {
      expect(() => ApiAction.create(buildAction({ type: undefined }))).toThrowError();
    });

    it('throws an error if the type proptery has lower case letters', () => {
      expect(() => ApiAction.create(buildAction({ type: 'Call_REQUEST' }))).toThrowError();
    });

    it('throws an error ' +
        'if the type property does not end with _REQUEST, _SUCCESS or _FAILURE', () => {
      expect(() => ApiAction.create(buildAction({ type: 'some string' }))).toThrowError();
      expect(() => ApiAction.create(buildAction({ type: 'CALL_REQUEST' }))).not.toThrowError();
      expect(() => ApiAction.create(buildAction({ type: 'CALL_SUCCESS' }))).not.toThrowError();
      expect(() => ApiAction.create(buildAction({ type: 'CALL_FAILURE' }))).not.toThrowError();
    });

    it('returns the wrapped action if the provided one is valid', () => {
      const action = ApiAction.create(buildAction());
      expect(action.url).toBe('/some/path');
      expect(action.method).toBe('GET');
    });

    it('does not return the same object instance it receives', () => {
      const originalAction = buildAction();
      const action = ApiAction.create(originalAction);
      expect(originalAction).not.toBe(action);
    });

    it('converts the provided URL to lower case', () => {
      const action = ApiAction.create(buildAction({ url: '/some/Path' }));
      expect(action.url).toBe('/some/path');
    });

    it('converts the provided method to upper case', () => {
      const action = ApiAction.create(buildAction({ method: 'get' }));
      expect(action.method).toBe('GET');
    });

    it('allows to access all the properties of the original action', () => {
      const callAction = ApiAction.create(buildAction({ otherProp: 1 }));
      expect(callAction.otherProp).toBe(1);
    });

    it('throws an error if a _FAILURE action does not have an error property', () => {
      expect(() => ApiAction.create(buildAction({ error: undefined }))).toThrowError();
      expect(() => ApiAction.create(buildAction({ error: null }))).toThrowError();
      expect(() => ApiAction.create(buildAction({ error: '' }))).not.toThrowError();
    });

    it('converts action.error into an instance of Error if it\'s not already the case', () => {
      expect(ApiAction.create(buildAction({ error: '' })).error).toBeInstanceOf(Error);
    });

    it('logs the error of a failure action', () => {
      const error = new Error('an error');
      ApiAction.create(buildAction({ error }));
      expect(log.error.args).toEqual([[error]]);
    });

    context('#isApiAction()', () => {
      it('returns true an action was created with ApiAction.create()', () => {
        const originalAction = buildAction({ type: 'CALL_REQUEST' });
        const callAction = ApiAction.create(originalAction);
        expect(ApiAction.isApiAction(callAction)).toBe(true);
        expect(ApiAction.isApiAction(originalAction)).toBe(false);
      });
    });

    context('#isStarted()', () => {
      it('returns true if action.type ends with _REQUEST', () => {
        const callAction = ApiAction.create(buildAction({ type: 'CALL_REQUEST' }));
        expect(ApiAction.isStarted(callAction)).toBe(true);
        expect(ApiAction.isSuccess(callAction)).toBe(false);
        expect(ApiAction.isFailure(callAction)).toBe(false);
      });
    });

    context('#isSuccess()', () => {
      it('returns true if action.type ends with _SUCCESS', () => {
        const callAction = ApiAction.create(buildAction({ type: 'CALL_SUCCESS' }));
        expect(ApiAction.isStarted(callAction)).toBe(false);
        expect(ApiAction.isSuccess(callAction)).toBe(true);
        expect(ApiAction.isFailure(callAction)).toBe(false);
      });
    });

    context('#isFailure()', () => {
      it('returns true if action.type ends with _FAILURE', () => {
        const callAction = ApiAction.create(buildAction());
        expect(ApiAction.isStarted(callAction)).toBe(false);
        expect(ApiAction.isSuccess(callAction)).toBe(false);
        expect(ApiAction.isFailure(callAction)).toBe(true);
      });
    });
  });
});
