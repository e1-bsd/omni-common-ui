import { ApiResponse } from 'domain/ApiResponse';
import { ApiResponseHelper } from './';

describe('ApiResponseHelper', () => {
  describe('#fetchWasCalled()', () => {
    test('returns false for any value that is not an object', () => {
      expect(ApiResponseHelper.fetchWasCalled(undefined)).toBe(false);
      expect(ApiResponseHelper.fetchWasCalled(null)).toBe(false);
      expect(ApiResponseHelper.fetchWasCalled(1)).toBe(false);
      expect(ApiResponseHelper.fetchWasCalled('test')).toBe(false);
      expect(ApiResponseHelper.fetchWasCalled(() => {})).toBe(false);
      expect(ApiResponseHelper.fetchWasCalled([])).toBe(false);
    });

    test('returns false for any object that is not an ApiResponse', () => {
      expect(ApiResponseHelper.fetchWasCalled({})).toBe(false);
      expect(ApiResponseHelper.fetchWasCalled({ a: 'a' })).toBe(false);
    });

    test('returns false for an object similar to ApiResponse', () => {
      const result = ApiResponseHelper.fetchWasCalled({ data: null, error: null, loading: null });
      expect(result).toBe(false);
    });

    test('returns false for a default ApiResponse', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse())).toBe(false);
    });

    test('returns true for an ApiResponse with loading=true', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse({ loading: true }))).toBe(true);
    });

    test('returns true for an ApiResponse with a data property different from undefined', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse({ data: null }))).toBe(true);
    });

    test('returns true for an ApiResponse with a error being an instance of Error', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse({ error: new Error() }))).toBe(true);
    });
  });

  describe('#shouldFetch()', () => {
    test('returns true for any value that is not an object', () => {
      expect(ApiResponseHelper.shouldFetch(undefined)).toBe(true);
      expect(ApiResponseHelper.shouldFetch(null)).toBe(true);
      expect(ApiResponseHelper.shouldFetch(1)).toBe(true);
      expect(ApiResponseHelper.shouldFetch('test')).toBe(true);
      expect(ApiResponseHelper.shouldFetch(() => {})).toBe(true);
      expect(ApiResponseHelper.shouldFetch([])).toBe(true);
    });

    test('returns true for any object that is not an ApiResponse', () => {
      expect(ApiResponseHelper.shouldFetch({})).toBe(true);
      expect(ApiResponseHelper.shouldFetch({ a: 'a' })).toBe(true);
    });

    test('returns true for an object similar to ApiResponse', () => {
      const result = ApiResponseHelper.shouldFetch({ data: null, error: null, loading: null });
      expect(result).toBe(true);
    });

    test('returns true for a default ApiResponse', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse())).toBe(true);
    });

    test('returns false for an ApiResponse with loading=true', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse({ loading: true }))).toBe(false);
    });

    test('returns false for an ApiResponse with a data property different from undefined', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse({ data: null }))).toBe(false);
    });

    test('returns false for an ApiResponse with a error being an instance of Error', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse({ error: new Error() }))).toBe(false);
    });
  });

  describe('#isLoading()', () => {
    test('returns false if apiResponse is not an ApiResponse', () => {
      expect(ApiResponseHelper.isLoading(undefined)).toBe(false);
      expect(ApiResponseHelper.isLoading({ loading: true })).toBe(false);
    });

    test('returns false if the ApiResponse\'s loading property is not true', () => {
      expect(ApiResponseHelper.isLoading(new ApiResponse({ loading: 20 }))).toBe(false);
    });

    test('returns true if the ApiResponse\'s loading=true', () => {
      expect(ApiResponseHelper.isLoading(new ApiResponse({ loading: true }))).toBe(true);
    });
  });

  describe('#hasFailed()', () => {
    test('returns false if apiResponse is not an ApiResponse', () => {
      expect(ApiResponseHelper.hasFailed(undefined)).toBe(false);
      expect(ApiResponseHelper.hasFailed({ loading: true })).toBe(false);
    });

    test('returns false if the ApiResponse\'s error property is not an Error', () => {
      expect(ApiResponseHelper.hasFailed(new ApiResponse({ error: 20 }))).toBe(false);
    });

    test('returns true if the ApiResponse\'s error=true', () => {
      expect(ApiResponseHelper.hasFailed(new ApiResponse({ error: new Error() }))).toBe(true);
    });
  });

  describe('#hasSucceeded()', () => {
    test('returns false if apiResponse is not an ApiResponse', () => {
      expect(ApiResponseHelper.hasSucceeded(undefined)).toBe(false);
      expect(ApiResponseHelper.hasSucceeded({ loading: true })).toBe(false);
    });

    test('returns true if the ApiResponse\'s data property is not undefined', () => {
      expect(ApiResponseHelper.hasSucceeded(new ApiResponse({ data: null }))).toBe(true);
    });
  });

  describe('#create', () => {
    test('returns the same ApiResponse if one is received', () => {
      const mock = new ApiResponse();
      expect(ApiResponseHelper.create(mock)).toBe(mock);
    });

    test('returns an errored ApiResponse if passed an instance of Error', () => {
      const error = new Error();
      expect(ApiResponseHelper.create(error).error).toBe(error);
    });

    test('returns an ApiResponse if passed undefined', () => {
      expect(ApiResponseHelper.create()).toBeInstanceOf(ApiResponse);
    });

    test('returns a succeeded ApiResponse if any other value', () => {
      expect(ApiResponseHelper.create(null).data).toBeNull();
    });

    describe('when received an object with just one key', () => {
      describe('when the key is loading', () => {
        test('returns an ApiResponse with the value of loading', () => {
          expect(ApiResponseHelper.create({ loading: true }).loading).toBe(true);
          expect(ApiResponseHelper.create({ loading: false }).loading).toBe(false);
        });

        test('keeps as false any value other than true', () => {
          expect(ApiResponseHelper.create({ loading: 'hi!' }).loading).toBe(false);
        });

        test('returns a default ApiResponse if loading set to undefined', () => {
          const result = ApiResponseHelper.create({ loading: undefined });
          expect(result.loading).toBe(false);
          expect(result.error).toBeUndefined();
          expect(result.data).toBeUndefined();
        });
      });

      describe('when the key is error', () => {
        test('returns an errored ApiResponse with the passed error' +
            ' if it is an instance of Error', () => {
          const error = new Error();
          expect(ApiResponseHelper.create({ error }).error).toBe(error);
        });

        test('wraps the error in an Error instance if it is not already', () => {
          const { error } = ApiResponseHelper.create({ error: 'hi!' });
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('hi!');
        });

        test('returns a default ApiResponse if error set to undefined', () => {
          const result = ApiResponseHelper.create({ error: undefined });
          expect(result.loading).toBe(false);
          expect(result.error).toBeUndefined();
          expect(result.data).toBeUndefined();
        });
      });

      describe('when the key is data', () => {
        test('returns an ApiResponse with the provided data', () => {
          expect(ApiResponseHelper.create({ data: 'hi!' }).data).toBe('hi!');
        });

        test('returns a default ApiResponse if data set to undefined', () => {
          const result = ApiResponseHelper.create({ data: undefined });
          expect(result.loading).toBe(false);
          expect(result.error).toBeUndefined();
          expect(result.data).toBeUndefined();
        });
      });

      describe('when the key is any other', () => {
        test('returns an ApiResponse with the provided object', () => {
          const object = { someKey: 'hi!' };
          expect(ApiResponseHelper.create(object).data).toBe(object);
        });
      });
    });
  });

  describe('#responsify', () => {
    test('is the same as #create()', () => {
      expect(ApiResponseHelper.responsify).toBe(ApiResponseHelper.create);
    });
  });
});
