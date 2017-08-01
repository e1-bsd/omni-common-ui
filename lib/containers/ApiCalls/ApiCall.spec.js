'use strict';

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

var _ApiKey2 = require('./ApiKey');

var _ApiKey3 = _interopRequireDefault(_ApiKey2);

var _ApiAction2 = require('./ApiAction');

var _ApiAction3 = _interopRequireDefault(_ApiAction2);

var _ApiState2 = require('./ApiState');

var _ApiState3 = _interopRequireDefault(_ApiState2);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

test('exposes API_CALL_CLEAN action type', function () {
  expect(_ApiCall2.default.API_CALL_CLEAN).toBe('API_CALL_CLEAN');
});

test('exposes ApiKey as Key', function () {
  expect(_ApiCall2.default.Key).toBe(_ApiKey3.default);
});

test('exposes ApiAction as Action', function () {
  expect(_ApiCall2.default.Action).toBe(_ApiAction3.default);
});

test('exposes ApiState as State', function () {
  expect(_ApiCall2.default.State).toBe(_ApiState3.default);
});

test('does not allow to reassign its inner classes', function () {
  expect(function () {
    _ApiCall2.default.State = {};
  }).toThrowError();
  expect(function () {
    _ApiCall2.default.Action = {};
  }).toThrowError();
  expect(function () {
    _ApiCall2.default.Key = {};
  }).toThrowError();
});

describe('#find()', function () {
  var _ref;

  var call1 = _ApiCall2.default.State.createLoading();
  var call2 = _ApiCall2.default.State.createSucceeded();
  var call3 = _ApiCall2.default.State.createFailed();
  var state = new _immutable.Map({
    apiCalls: new _immutable.Map((_ref = {}, _defineProperty(_ref, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' }), call1), _defineProperty(_ref, _ApiCall2.default.Key.create({ method: 'POST', url: '/path/1' }), call2), _defineProperty(_ref, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/2' }), call3), _ref))
  });

  test('returns the state for the API call with the provided key', function () {
    var key = _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' });
    expect(_ApiCall2.default.find(state, key)).toBe(call1);
  });

  test('builds the key by itself if provided an object', function () {
    expect(_ApiCall2.default.find(state, { method: 'POST', url: '/path/1' })).toBe(call2);
  });
});

describe('#shouldPerform()', function () {
  var _ref2;

  var call1 = _ApiCall2.default.State.createLoading();
  var call2 = _ApiCall2.default.State.createSucceeded();
  var call3 = _ApiCall2.default.State.createFailed();
  var state = new _immutable.Map({
    apiCalls: new _immutable.Map((_ref2 = {}, _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' }), call1), _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'POST', url: '/path/1' }), call2), _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/2' }), call3), _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/3' }), undefined), _ref2))
  });

  test('returns whether an API call should be performed or not', function () {
    expect(_ApiCall2.default.shouldPerform(state, 'GET /path/1')).toBe(false);
    expect(_ApiCall2.default.shouldPerform(state, 'POST /path/1')).toBe(false);
    expect(_ApiCall2.default.shouldPerform(state, 'GET /path/2')).toBe(false);
    expect(_ApiCall2.default.shouldPerform(state, 'GET /path/3')).toBe(true);
    expect(_ApiCall2.default.shouldPerform(state, 'GET /new/path')).toBe(true);
  });

  test('builds the key by itself if provided an object', function () {
    expect(_ApiCall2.default.shouldPerform(state, { method: 'POST', url: '/path/1' })).toBe(false);
  });
});

describe('#createAction()', function () {
  var originalCreate = _ApiCall2.default.Action.create;

  afterEach(function () {
    _ApiCall2.default.Action.create = originalCreate;
  });

  test('calls ApiCall.Action.create()', function () {
    _ApiCall2.default.Action.create = jest.fn();
    var originalAction = { type: 'CALL_REQUEST', url: '/path', method: 'GET' };
    _ApiCall2.default.createAction(originalAction);
    expect(_ApiCall2.default.Action.create).toHaveBeenCalledWith(originalAction);
  });
});

describe('#clean()', function () {
  test('returns an action of API_CALL_CLEAN type with the passed key', function () {
    var action = _ApiCall2.default.clean('key');
    expect(action.type).toBe(_ApiCall2.default.API_CALL_CLEAN);
    expect(action.key).toBe('key');
  });
});

describe('#getErrors()', function () {
  var _ref3;

  var state = new _immutable.Map({
    apiCalls: new _immutable.Map((_ref3 = {}, _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' }), _ApiCall2.default.State.createLoading()), _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'POST', url: '/path/1' }), _ApiCall2.default.State.createFailed()), _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/2' }), _ApiCall2.default.State.createFailed()), _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/3' }), _ApiCall2.default.State.createSucceeded()), _ref3))
  });

  test('returns all errored API calls', function () {
    var errors = _ApiCall2.default.getErrors(state);
    expect(errors.size).toBe(2);
  });
});
//# sourceMappingURL=ApiCall.spec.js.map
