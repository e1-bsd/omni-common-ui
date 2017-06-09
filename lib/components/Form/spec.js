'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('can be used directly as Form component', function () {
  expect(_Form2.default).toBe(_2.default);
});

test('has a TextInput property', function () {
  expect(_TextInput2.default).toBe(_2.default.TextInput);
});

test('has a Select property', function () {
  expect(_Select2.default).toBe(_2.default.Select);
});

test('does not expose Field component', function () {
  expect(_Field2.default).not.toBe(_2.default.Field);
});
//# sourceMappingURL=spec.js.map
