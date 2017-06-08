import ApiState from './ApiState';

describe('ApiCall', () => {
  describe('ApiState', () => {
    describe('#createSucceeded()', () => {
      test('creates a succeeded API call state object', () => {
        const apiState = ApiState.createSucceeded();
        expect(ApiState.isValue(apiState)).toBe(true);
        expect(apiState.status).toBe('succeeded');
      });
    });

    describe('#createLoading()', () => {
      test('creates a loading API call state object', () => {
        const apiState = ApiState.createLoading();
        expect(ApiState.isValue(apiState)).toBe(true);
        expect(apiState.status).toBe('loading');
      });

      test('creates a loading API call state object ' +
          'with disableDefault=true if truthy value passed', () => {
        const apiState = ApiState.createLoading('id', { disableDefault: true });
        expect(apiState.disableDefault).toBe(true);
      });

      test('creates a loading API call state object ' +
          'with disableDefault=false if falsy value passed', () => {
        const apiState = ApiState.createLoading('id');
        expect(apiState.disableDefault).toBe(false);
      });
    });

    describe('#createFailed()', () => {
      test('creates a failed API call state object', () => {
        const apiState = ApiState.createFailed();
        expect(ApiState.isValue(apiState)).toBe(true);
        expect(apiState.status).toBe('failed');
      });

      test('saves the error received as parameter', () => {
        const error = 'some error';
        const apiState = ApiState.createFailed('key', error);
        expect(ApiState.isValue(apiState)).toBe(true);
        expect(apiState.status).toBe('failed');
        expect(apiState.error).toBe(error);
      });

      test('creates a failed API call state object ' +
          'with disableDefault=true if truthy value passed', () => {
        const apiState = ApiState.createFailed('key', 'some error', { disableDefault: true });
        expect(apiState.disableDefault).toBe(true);
      });

      test('creates a failed API call state object ' +
          'with disableDefault=false if falsy value passed', () => {
        const apiState = ApiState.createFailed('key', 'some error');
        expect(apiState.disableDefault).toBe(false);
      });
    });

    describe('#isValue()', () => {
      test('returns true if passed an object created with the creators of Value', () => {
        expect(ApiState.isValue(ApiState.createLoading())).toBe(true);
        expect(ApiState.isValue(ApiState.createSucceeded())).toBe(true);
        expect(ApiState.isValue(ApiState.createFailed())).toBe(true);
      });

      test('returns false if passed an object not created with the creators of Value', () => {
        expect(ApiState.isValue({ status: 'loading' })).toBe(false);
        expect(ApiState.isValue({ status: 'succeeded' })).toBe(false);
        expect(ApiState.isValue({ status: 'failed' })).toBe(false);
        expect(ApiState.isValue({})).toBe(false);
        expect(ApiState.isValue()).toBe(false);
        expect(ApiState.isValue('')).toBe(false);
      });
    });

    describe('#isLoading()', () => {
      test('returns true if passed a Value#createLoading() object', () => {
        expect(ApiState.isLoading(ApiState.createLoading())).toBe(true);
      });

      test('returns false if passed any object not created with Value#createLoading()', () => {
        expect(ApiState.isLoading(ApiState.createSucceeded())).toBe(false);
        expect(ApiState.isLoading(ApiState.createFailed())).toBe(false);
      });
    });

    describe('#hasSucceeded()', () => {
      test('returns true if passed a Value#createSucceeded() object', () => {
        expect(ApiState.hasSucceeded(ApiState.createSucceeded())).toBe(true);
      });

      test('returns false if passed any object not created with Value#createSucceeded()', () => {
        expect(ApiState.hasSucceeded(ApiState.createLoading())).toBe(false);
        expect(ApiState.hasSucceeded(ApiState.createFailed())).toBe(false);
      });
    });

    describe('#hasFailed()', () => {
      test('returns true if passed a Value#createFailed() object', () => {
        expect(ApiState.hasFailed(ApiState.createFailed())).toBe(true);
      });

      test('returns false if passed any object not created with Value#createFailed()', () => {
        expect(ApiState.hasFailed(ApiState.createLoading())).toBe(false);
        expect(ApiState.hasFailed(ApiState.createSucceeded())).toBe(false);
      });
    });

    describe('#shouldPerform()', () => {
      test('returns true if passed anything that is not an ApiState', () => {
        expect(ApiState.shouldPerform()).toBe(true);
        expect(ApiState.shouldPerform(null)).toBe(true);
        expect(ApiState.shouldPerform('')).toBe(true);
        expect(ApiState.shouldPerform({})).toBe(true);
      });

      test('returns true if passed an ApiState ' +
          'that is not loading, has not succeeded and has not failed', () => {
        expect(ApiState.shouldPerform(ApiState.createLoading().clear())).toBe(true);
      });

      test('returns false if passed an ApiState that is loading', () => {
        expect(ApiState.shouldPerform(ApiState.createLoading())).toBe(false);
      });

      test('returns false if passed an ApiState that has succeeded', () => {
        expect(ApiState.shouldPerform(ApiState.createSucceeded())).toBe(false);
      });

      test('returns false if passed an ApiState that has failed', () => {
        expect(ApiState.shouldPerform(ApiState.createFailed('error'))).toBe(false);
      });
    });
  });
});
