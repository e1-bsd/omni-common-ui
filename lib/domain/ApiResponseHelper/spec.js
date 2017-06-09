'use strict';

var _ApiResponse = require('./../ApiResponse');

var _ = require('./');

describe('#fetchWasCalled()', function () {
  test('returns false for any value that is not an object', function () {
    expect(_.ApiResponseHelper.fetchWasCalled(undefined)).toBe(false);
    expect(_.ApiResponseHelper.fetchWasCalled(null)).toBe(false);
    expect(_.ApiResponseHelper.fetchWasCalled(1)).toBe(false);
    expect(_.ApiResponseHelper.fetchWasCalled('test')).toBe(false);
    expect(_.ApiResponseHelper.fetchWasCalled(function () {})).toBe(false);
    expect(_.ApiResponseHelper.fetchWasCalled([])).toBe(false);
  });

  test('returns false for any object that is not an ApiResponse', function () {
    expect(_.ApiResponseHelper.fetchWasCalled({})).toBe(false);
    expect(_.ApiResponseHelper.fetchWasCalled({ a: 'a' })).toBe(false);
  });

  test('returns false for an object similar to ApiResponse', function () {
    var result = _.ApiResponseHelper.fetchWasCalled({ data: null, error: null, loading: null });
    expect(result).toBe(false);
  });

  test('returns false for a default ApiResponse', function () {
    expect(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse())).toBe(false);
  });

  test('returns true for an ApiResponse with loading=true', function () {
    expect(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse({ loading: true }))).toBe(true);
  });

  test('returns true for an ApiResponse with a data property different from undefined', function () {
    expect(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse({ data: null }))).toBe(true);
  });

  test('returns true for an ApiResponse with a error being an instance of Error', function () {
    expect(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse({ error: new Error() }))).toBe(true);
  });
});

describe('#shouldFetch()', function () {
  test('returns true for any value that is not an object', function () {
    expect(_.ApiResponseHelper.shouldFetch(undefined)).toBe(true);
    expect(_.ApiResponseHelper.shouldFetch(null)).toBe(true);
    expect(_.ApiResponseHelper.shouldFetch(1)).toBe(true);
    expect(_.ApiResponseHelper.shouldFetch('test')).toBe(true);
    expect(_.ApiResponseHelper.shouldFetch(function () {})).toBe(true);
    expect(_.ApiResponseHelper.shouldFetch([])).toBe(true);
  });

  test('returns true for any object that is not an ApiResponse', function () {
    expect(_.ApiResponseHelper.shouldFetch({})).toBe(true);
    expect(_.ApiResponseHelper.shouldFetch({ a: 'a' })).toBe(true);
  });

  test('returns true for an object similar to ApiResponse', function () {
    var result = _.ApiResponseHelper.shouldFetch({ data: null, error: null, loading: null });
    expect(result).toBe(true);
  });

  test('returns true for a default ApiResponse', function () {
    expect(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse())).toBe(true);
  });

  test('returns false for an ApiResponse with loading=true', function () {
    expect(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse({ loading: true }))).toBe(false);
  });

  test('returns false for an ApiResponse with a data property different from undefined', function () {
    expect(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse({ data: null }))).toBe(false);
  });

  test('returns false for an ApiResponse with a error being an instance of Error', function () {
    expect(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse({ error: new Error() }))).toBe(false);
  });
});

describe('#isLoading()', function () {
  test('returns false if apiResponse is not an ApiResponse', function () {
    expect(_.ApiResponseHelper.isLoading(undefined)).toBe(false);
    expect(_.ApiResponseHelper.isLoading({ loading: true })).toBe(false);
  });

  test('returns false if the ApiResponse\'s loading property is not true', function () {
    expect(_.ApiResponseHelper.isLoading(new _ApiResponse.ApiResponse({ loading: 20 }))).toBe(false);
  });

  test('returns true if the ApiResponse\'s loading=true', function () {
    expect(_.ApiResponseHelper.isLoading(new _ApiResponse.ApiResponse({ loading: true }))).toBe(true);
  });
});

describe('#hasFailed()', function () {
  test('returns false if apiResponse is not an ApiResponse', function () {
    expect(_.ApiResponseHelper.hasFailed(undefined)).toBe(false);
    expect(_.ApiResponseHelper.hasFailed({ loading: true })).toBe(false);
  });

  test('returns false if the ApiResponse\'s error property is not an Error', function () {
    expect(_.ApiResponseHelper.hasFailed(new _ApiResponse.ApiResponse({ error: 20 }))).toBe(false);
  });

  test('returns true if the ApiResponse\'s error=true', function () {
    expect(_.ApiResponseHelper.hasFailed(new _ApiResponse.ApiResponse({ error: new Error() }))).toBe(true);
  });
});

describe('#hasSucceeded()', function () {
  test('returns false if apiResponse is not an ApiResponse', function () {
    expect(_.ApiResponseHelper.hasSucceeded(undefined)).toBe(false);
    expect(_.ApiResponseHelper.hasSucceeded({ loading: true })).toBe(false);
  });

  test('returns true if the ApiResponse\'s data property is not undefined', function () {
    expect(_.ApiResponseHelper.hasSucceeded(new _ApiResponse.ApiResponse({ data: null }))).toBe(true);
  });
});

describe('#create', function () {
  test('returns the same ApiResponse if one is received', function () {
    var mock = new _ApiResponse.ApiResponse();
    expect(_.ApiResponseHelper.create(mock)).toBe(mock);
  });

  test('returns an errored ApiResponse if passed an instance of Error', function () {
    var error = new Error();
    expect(_.ApiResponseHelper.create(error).error).toBe(error);
  });

  test('returns an ApiResponse if passed undefined', function () {
    expect(_.ApiResponseHelper.create()).toBeInstanceOf(_ApiResponse.ApiResponse);
  });

  test('returns a succeeded ApiResponse if any other value', function () {
    expect(_.ApiResponseHelper.create(null).data).toBeNull();
  });

  describe('when received an object with just one key', function () {
    describe('when the key is loading', function () {
      test('returns an ApiResponse with the value of loading', function () {
        expect(_.ApiResponseHelper.create({ loading: true }).loading).toBe(true);
        expect(_.ApiResponseHelper.create({ loading: false }).loading).toBe(false);
      });

      test('keeps as false any value other than true', function () {
        expect(_.ApiResponseHelper.create({ loading: 'hi!' }).loading).toBe(false);
      });

      test('returns a default ApiResponse if loading set to undefined', function () {
        var result = _.ApiResponseHelper.create({ loading: undefined });
        expect(result.loading).toBe(false);
        expect(result.error).toBeUndefined();
        expect(result.data).toBeUndefined();
      });
    });

    describe('when the key is error', function () {
      test('returns an errored ApiResponse with the passed error' + ' if it is an instance of Error', function () {
        var error = new Error();
        expect(_.ApiResponseHelper.create({ error: error }).error).toBe(error);
      });

      test('wraps the error in an Error instance if it is not already', function () {
        var _ApiResponseHelper$cr = _.ApiResponseHelper.create({ error: 'hi!' }),
            error = _ApiResponseHelper$cr.error;

        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('hi!');
      });

      test('returns a default ApiResponse if error set to undefined', function () {
        var result = _.ApiResponseHelper.create({ error: undefined });
        expect(result.loading).toBe(false);
        expect(result.error).toBeUndefined();
        expect(result.data).toBeUndefined();
      });
    });

    describe('when the key is data', function () {
      test('returns an ApiResponse with the provided data', function () {
        expect(_.ApiResponseHelper.create({ data: 'hi!' }).data).toBe('hi!');
      });

      test('returns a default ApiResponse if data set to undefined', function () {
        var result = _.ApiResponseHelper.create({ data: undefined });
        expect(result.loading).toBe(false);
        expect(result.error).toBeUndefined();
        expect(result.data).toBeUndefined();
      });
    });

    describe('when the key is any other', function () {
      test('returns an ApiResponse with the provided object', function () {
        var object = { someKey: 'hi!' };
        expect(_.ApiResponseHelper.create(object).data).toBe(object);
      });
    });
  });
});

describe('#responsify', function () {
  test('is the same as #create()', function () {
    expect(_.ApiResponseHelper.responsify).toBe(_.ApiResponseHelper.create);
  });
});
//# sourceMappingURL=spec.js.map
