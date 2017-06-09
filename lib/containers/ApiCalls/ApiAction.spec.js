'use strict';

var _ApiAction = require('./ApiAction');

var _ApiAction2 = _interopRequireDefault(_ApiAction);

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildAction = function buildAction() {
  var configParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign({}, {
    type: 'CALL_FAILURE',
    error: new Error(),
    url: '/some/path',
    method: 'GET'
  }, configParam);
};

test('throws an error if nothing is passed', function () {
  expect(function () {
    return _ApiAction2.default.create();
  }).toThrowError();
});

test('throws an error if a parameter that is not an object is passed', function () {
  expect(function () {
    return _ApiAction2.default.create('some string');
  }).toThrowError();
});

test('throws an error if the action does not have a url property', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ url: undefined }));
  }).toThrowError();
});

test('throws an error if the url property is not a string', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ url: {} }));
  }).toThrowError();
});

test('throws an error if the action does not have a method proptery', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ method: undefined }));
  }).toThrowError();
});

test('throws an error if the method property is not GET, PUT, POST or DELETE', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ method: 'some string' }));
  }).toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ method: 'GET' }));
  }).not.toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ method: 'PUT' }));
  }).not.toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ method: 'POST' }));
  }).not.toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ method: 'DELETE' }));
  }).not.toThrowError();
});

test('throws an error if the action does not have a type proptery', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ type: undefined }));
  }).toThrowError();
});

test('throws an error if the type proptery has lower case letters', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ type: 'Call_REQUEST' }));
  }).toThrowError();
});

test('throws an error ' + 'if the type property does not end with _REQUEST, _SUCCESS or _FAILURE', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ type: 'some string' }));
  }).toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ type: 'CALL_REQUEST' }));
  }).not.toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ type: 'CALL_SUCCESS' }));
  }).not.toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ type: 'CALL_FAILURE' }));
  }).not.toThrowError();
});

test('returns the wrapped action if the provided one is valid', function () {
  var action = _ApiAction2.default.create(buildAction());
  expect(action.url).toBe('/some/path');
  expect(action.method).toBe('GET');
});

test('does not return the same object instance it receives', function () {
  var originalAction = buildAction();
  var action = _ApiAction2.default.create(originalAction);
  expect(originalAction).not.toBe(action);
});

test('converts the provided URL to lower case', function () {
  var action = _ApiAction2.default.create(buildAction({ url: '/some/Path' }));
  expect(action.url).toBe('/some/path');
});

test('converts the provided method to upper case', function () {
  var action = _ApiAction2.default.create(buildAction({ method: 'get' }));
  expect(action.method).toBe('GET');
});

test('allows to access all the properties of the original action', function () {
  var callAction = _ApiAction2.default.create(buildAction({ otherProp: 1 }));
  expect(callAction.otherProp).toBe(1);
});

test('throws an error if a _FAILURE action does not have an error property', function () {
  expect(function () {
    return _ApiAction2.default.create(buildAction({ error: undefined }));
  }).toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ error: null }));
  }).toThrowError();
  expect(function () {
    return _ApiAction2.default.create(buildAction({ error: '' }));
  }).not.toThrowError();
});

test('converts action.error into an instance of Error if it\'s not already the case', function () {
  expect(_ApiAction2.default.create(buildAction({ error: '' })).error).toBeInstanceOf(Error);
});

test('logs the error of a failure action', function () {
  _log2.default.error = jest.fn();
  var error = new Error('an error');
  _ApiAction2.default.create(buildAction({ error: error }));
  expect(_log2.default.error.mock.calls).toEqual([[error]]);
});

describe('#isApiAction()', function () {
  test('returns true an action was created with ApiAction.create()', function () {
    var originalAction = buildAction({ type: 'CALL_REQUEST' });
    var callAction = _ApiAction2.default.create(originalAction);
    expect(_ApiAction2.default.isApiAction(callAction)).toBe(true);
    expect(_ApiAction2.default.isApiAction(originalAction)).toBe(false);
  });
});

describe('#isStarted()', function () {
  test('returns true if action.type ends with _REQUEST', function () {
    var callAction = _ApiAction2.default.create(buildAction({ type: 'CALL_REQUEST' }));
    expect(_ApiAction2.default.isStarted(callAction)).toBe(true);
    expect(_ApiAction2.default.isSuccess(callAction)).toBe(false);
    expect(_ApiAction2.default.isFailure(callAction)).toBe(false);
  });
});

describe('#isSuccess()', function () {
  test('returns true if action.type ends with _SUCCESS', function () {
    var callAction = _ApiAction2.default.create(buildAction({ type: 'CALL_SUCCESS' }));
    expect(_ApiAction2.default.isStarted(callAction)).toBe(false);
    expect(_ApiAction2.default.isSuccess(callAction)).toBe(true);
    expect(_ApiAction2.default.isFailure(callAction)).toBe(false);
  });
});

describe('#isFailure()', function () {
  test('returns true if action.type ends with _FAILURE', function () {
    var callAction = _ApiAction2.default.create(buildAction());
    expect(_ApiAction2.default.isStarted(callAction)).toBe(false);
    expect(_ApiAction2.default.isSuccess(callAction)).toBe(false);
    expect(_ApiAction2.default.isFailure(callAction)).toBe(true);
  });
});
//# sourceMappingURL=ApiAction.spec.js.map
