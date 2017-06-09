'use strict';

var _ = require('./');

describe('#fetchWasCalled()', function () {
  test('returns false for a default ApiResponse', function () {
    expect(new _.ApiResponse().fetchWasCalled()).toBe(false);
  });

  test('returns true for an ApiResponse with loading=true', function () {
    expect(new _.ApiResponse({ loading: true }).fetchWasCalled()).toBe(true);
  });

  test('returns true for an ApiResponse with a data property different from undefined', function () {
    expect(new _.ApiResponse({ data: null }).fetchWasCalled()).toBe(true);
  });

  test('returns true for an ApiResponse with a error being an instance of Error', function () {
    expect(new _.ApiResponse({ error: new Error() }).fetchWasCalled()).toBe(true);
  });
});

describe('#shouldFetch()', function () {
  test('returns true for a default ApiResponse', function () {
    expect(new _.ApiResponse().shouldFetch()).toBe(true);
  });

  test('returns false for an ApiResponse with loading=true', function () {
    expect(new _.ApiResponse({ loading: true }).shouldFetch()).toBe(false);
  });

  test('returns false for an ApiResponse with a data property different from undefined', function () {
    expect(new _.ApiResponse({ data: null }).shouldFetch()).toBe(false);
  });

  test('returns false for an ApiResponse with a error being an instance of Error', function () {
    expect(new _.ApiResponse({ error: new Error() }).shouldFetch()).toBe(false);
  });
});

describe('#isLoading()', function () {
  test('returns false if the ApiResponse\'s loading property is not true', function () {
    expect(new _.ApiResponse({ loading: 20 }).isLoading()).toBe(false);
  });

  test('returns true if the ApiResponse\'s loading=true', function () {
    expect(new _.ApiResponse({ loading: true }).isLoading()).toBe(true);
  });
});

describe('#hasFailed()', function () {
  test('returns false if the ApiResponse\'s error property is not an Error', function () {
    expect(new _.ApiResponse({ error: 20 }).hasFailed()).toBe(false);
  });

  test('returns true if the ApiResponse\'s error=true', function () {
    expect(new _.ApiResponse({ error: new Error() }).hasFailed()).toBe(true);
  });
});

describe('#hasSucceeded()', function () {
  test('returns true if the ApiResponse\'s data property is not undefined', function () {
    expect(new _.ApiResponse({ data: null }).hasSucceeded()).toBe(true);
  });
});
//# sourceMappingURL=spec.js.map
