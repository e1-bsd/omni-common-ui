'use strict';

var _ApiState = require('./ApiState');

var _ApiState2 = _interopRequireDefault(_ApiState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#createSucceeded()', function () {
  test('creates a succeeded API call state object', function () {
    var apiState = _ApiState2.default.createSucceeded();
    expect(_ApiState2.default.isValue(apiState)).toBe(true);
    expect(apiState.status).toBe('succeeded');
  });
});

describe('#createLoading()', function () {
  test('creates a loading API call state object', function () {
    var apiState = _ApiState2.default.createLoading();
    expect(_ApiState2.default.isValue(apiState)).toBe(true);
    expect(apiState.status).toBe('loading');
  });

  test('creates a loading API call state object ' + 'with disableDefault=true if truthy value passed', function () {
    var apiState = _ApiState2.default.createLoading('id', { disableDefault: true });
    expect(apiState.disableDefault).toBe(true);
  });

  test('creates a loading API call state object ' + 'with disableDefault=false if falsy value passed', function () {
    var apiState = _ApiState2.default.createLoading('id');
    expect(apiState.disableDefault).toBe(false);
  });
});

describe('#createFailed()', function () {
  test('creates a failed API call state object', function () {
    var apiState = _ApiState2.default.createFailed();
    expect(_ApiState2.default.isValue(apiState)).toBe(true);
    expect(apiState.status).toBe('failed');
  });

  test('saves the error received as parameter', function () {
    var error = 'some error';
    var apiState = _ApiState2.default.createFailed('key', error);
    expect(_ApiState2.default.isValue(apiState)).toBe(true);
    expect(apiState.status).toBe('failed');
    expect(apiState.error).toBe(error);
  });

  test('creates a failed API call state object ' + 'with disableDefault=true if truthy value passed', function () {
    var apiState = _ApiState2.default.createFailed('key', 'some error', { disableDefault: true });
    expect(apiState.disableDefault).toBe(true);
  });

  test('creates a failed API call state object ' + 'with disableDefault=false if falsy value passed', function () {
    var apiState = _ApiState2.default.createFailed('key', 'some error');
    expect(apiState.disableDefault).toBe(false);
  });
});

describe('#isValue()', function () {
  test('returns true if passed an object created with the creators of Value', function () {
    expect(_ApiState2.default.isValue(_ApiState2.default.createLoading())).toBe(true);
    expect(_ApiState2.default.isValue(_ApiState2.default.createSucceeded())).toBe(true);
    expect(_ApiState2.default.isValue(_ApiState2.default.createFailed())).toBe(true);
  });

  test('returns false if passed an object not created with the creators of Value', function () {
    expect(_ApiState2.default.isValue({ status: 'loading' })).toBe(false);
    expect(_ApiState2.default.isValue({ status: 'succeeded' })).toBe(false);
    expect(_ApiState2.default.isValue({ status: 'failed' })).toBe(false);
    expect(_ApiState2.default.isValue({})).toBe(false);
    expect(_ApiState2.default.isValue()).toBe(false);
    expect(_ApiState2.default.isValue('')).toBe(false);
  });
});

describe('#isLoading()', function () {
  test('returns true if passed a Value#createLoading() object', function () {
    expect(_ApiState2.default.isLoading(_ApiState2.default.createLoading())).toBe(true);
  });

  test('returns false if passed any object not created with Value#createLoading()', function () {
    expect(_ApiState2.default.isLoading(_ApiState2.default.createSucceeded())).toBe(false);
    expect(_ApiState2.default.isLoading(_ApiState2.default.createFailed())).toBe(false);
  });
});

describe('#hasSucceeded()', function () {
  test('returns true if passed a Value#createSucceeded() object', function () {
    expect(_ApiState2.default.hasSucceeded(_ApiState2.default.createSucceeded())).toBe(true);
  });

  test('returns false if passed any object not created with Value#createSucceeded()', function () {
    expect(_ApiState2.default.hasSucceeded(_ApiState2.default.createLoading())).toBe(false);
    expect(_ApiState2.default.hasSucceeded(_ApiState2.default.createFailed())).toBe(false);
  });
});

describe('#hasFailed()', function () {
  test('returns true if passed a Value#createFailed() object', function () {
    expect(_ApiState2.default.hasFailed(_ApiState2.default.createFailed())).toBe(true);
  });

  test('returns false if passed any object not created with Value#createFailed()', function () {
    expect(_ApiState2.default.hasFailed(_ApiState2.default.createLoading())).toBe(false);
    expect(_ApiState2.default.hasFailed(_ApiState2.default.createSucceeded())).toBe(false);
  });
});

describe('#shouldPerform()', function () {
  test('returns true if passed anything that is not an ApiState', function () {
    expect(_ApiState2.default.shouldPerform()).toBe(true);
    expect(_ApiState2.default.shouldPerform(null)).toBe(true);
    expect(_ApiState2.default.shouldPerform('')).toBe(true);
    expect(_ApiState2.default.shouldPerform({})).toBe(true);
  });

  test('returns true if passed an ApiState ' + 'that is not loading, has not succeeded and has not failed', function () {
    expect(_ApiState2.default.shouldPerform(_ApiState2.default.createLoading().clear())).toBe(true);
  });

  test('returns false if passed an ApiState that is loading', function () {
    expect(_ApiState2.default.shouldPerform(_ApiState2.default.createLoading())).toBe(false);
  });

  test('returns false if passed an ApiState that has succeeded', function () {
    expect(_ApiState2.default.shouldPerform(_ApiState2.default.createSucceeded())).toBe(false);
  });

  test('returns false if passed an ApiState that has failed', function () {
    expect(_ApiState2.default.shouldPerform(_ApiState2.default.createFailed('error'))).toBe(false);
  });
});
//# sourceMappingURL=ApiState.spec.js.map
