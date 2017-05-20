'use strict';

var _chai = require('chai');

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

describe('Form', function () {
  it('can be used directly as Form component', function () {
    (0, _chai.expect)(_Form2.default).to.equal(_2.default);
  });

  it('has a TextInput property', function () {
    (0, _chai.expect)(_TextInput2.default).to.equal(_2.default.TextInput);
  });

  it('has a Select property', function () {
    (0, _chai.expect)(_Select2.default).to.equal(_2.default.Select);
  });

  it('does not expose Field component', function () {
    (0, _chai.expect)(_Field2.default).to.not.equal(_2.default.Field);
  });
});
//# sourceMappingURL=spec.js.map
