'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('moment-timezone', function () {
  return 'something here';
});

test('just returns moment-timezone', function () {
  expect(_2.default).toBe('something here');
});
//# sourceMappingURL=spec.js.map
