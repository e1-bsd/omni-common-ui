'use strict';

var _immutable = require('immutable');

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = void 0;

beforeEach(function () {
  state = new _immutable.Map({ privileges: { items: new _immutable.List(['pr1', 'pr2', 'PREFIX_pr3']) } });
  _Config2.default.merge({ featureLogin: true });
});

test('returns false if the privilege is not a string', function () {
  expect(_2.default.hasPrivilege(state, 1)).toBe(false);
});

test('throws if something else rather than a Map is provided as a state', function () {
  expect(function () {
    return _2.default.hasPrivilege({}, 'pr1');
  }).toThrow();
});

test('returns false if the state is malformed', function () {
  expect(_2.default.hasPrivilege((0, _immutable.Map)(), 'pr1')).toBe(false);
  expect(_2.default.hasPrivilege((0, _immutable.Map)({ privileges: null }), 'pr1')).toBe(false);
  expect(_2.default.hasPrivilege((0, _immutable.Map)({ privileges: (0, _immutable.Map)() }), 'pr1')).toBe(false);
});

test('returns true if the privilege is found in the privilege list', function () {
  expect(_2.default.hasPrivilege(state, 'pr1')).toBe(true);
});

test('returns true even if the privilege is provided with a different case', function () {
  expect(_2.default.hasPrivilege(state, 'PR1')).toBe(true);
});

test('returns true if there is a privilege in the list that ends with the provided string', function () {
  expect(_2.default.hasPrivilege(state, 'pr3')).toBe(true);
});

describe('when featureLogin is not true', function () {
  beforeEach(function () {
    _Config2.default.merge({ featureLogin: false });
  });

  test('returns true', function () {
    expect(_2.default.hasPrivilege()).toBe(true);
  });
});
//# sourceMappingURL=spec.js.map
