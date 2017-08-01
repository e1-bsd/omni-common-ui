'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../domain/MediaQuery');

test('can be used directly as Grid component', function () {
  expect(_Grid2.default).toBe(_2.default);
});

test('has a Group property', function () {
  expect(_Group2.default).toBe(_2.default.Group);
});

test('has a Item property', function () {
  expect(_Item2.default).toBe(_2.default.Item);
});
//# sourceMappingURL=spec.js.map
