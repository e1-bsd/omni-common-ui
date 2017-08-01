'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Key = _2.default.Key,
    State = _2.default.State;


var state = void 0;

beforeEach(function () {
  state = (0, _immutable.Map)();
});

test('does not modify the state if the action is not an Action', function () {
  expect((0, _.reducer)(state, {})).toBe(state);
});

test('removes an entry when API_CALL_CLEAN action is received', function () {
  state = state.set('key', 'value');
  expect((0, _.reducer)(state, _2.default.clean('key')).get('key')).toBeUndefined();
});

test('sets the proper map item to loading when received a _REQUEST action', function () {
  var action = _2.default.createAction({
    type: 'FETCH_REQUEST',
    url: 'url',
    method: 'GET'
  });

  var key = Key.create(action);
  var value = (0, _.reducer)(state, action).get(key);
  expect(State.isValue(value)).toBe(true);
  expect(State.isLoading(value)).toBe(true);
  expect(State.hasSucceeded(value)).toBe(false);
  expect(State.hasFailed(value)).toBe(false);
  expect(value.error).toBe(undefined);
  expect(value.id).toBe(key);
});

test('sets the proper map item to success when received a _SUCCESS action', function () {
  var action = _2.default.createAction({
    type: 'FETCH_SUCCESS',
    url: 'url',
    method: 'GET'
  });

  var key = Key.create(action);
  var value = (0, _.reducer)(state, action).get(key);
  expect(State.isValue(value)).toBe(true);
  expect(State.isLoading(value)).toBe(false);
  expect(State.hasSucceeded(value)).toBe(true);
  expect(State.hasFailed(value)).toBe(false);
  expect(value.error).toBe(undefined);
  expect(value.id).toBe(key);
});

test('sets the proper map item to error when received a _FAILURE action', function () {
  var action = _2.default.createAction({
    type: 'FETCH_FAILURE',
    error: new Error(),
    url: 'url',
    method: 'GET'
  });

  var key = Key.create(action);
  var value = (0, _.reducer)(state, action).get(key);
  expect(State.isValue(value)).toBe(true);
  expect(State.isLoading(value)).toBe(false);
  expect(State.hasSucceeded(value)).toBe(false);
  expect(State.hasFailed(value)).toBe(true);
  expect(value.error).toBe(action.error);
  expect(value.id).toBe(key);
});
//# sourceMappingURL=reducer.spec.js.map
