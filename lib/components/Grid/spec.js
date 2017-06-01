'use strict';

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Grid', function () {
  it('can be used directly as Grid component', function () {
    (0, _chai.expect)(_Grid2.default).to.equal(_2.default);
  });

  it('has a Group property', function () {
    (0, _chai.expect)(_Group2.default).to.equal(_2.default.Group);
  });

  it('has a Item property', function () {
    (0, _chai.expect)(_Item2.default).to.equal(_2.default.Item);
  });
});
//# sourceMappingURL=spec.js.map
