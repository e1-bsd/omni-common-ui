'use strict';

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('is a function', function () {
  expect(_is_js2.default.function(_.createNotificationsMiddleware)).toBe(true);
});

test('returns a function', function () {
  var config = {
    strategy: 'timer',
    dispatch: {
      requestActionType: 'w',
      successActionType: 'x',
      failureActionType: 'y',
      apiUrl: 'z'
    }
  };
  expect(_is_js2.default.function((0, _.createNotificationsMiddleware)(config))).toBe(true);
});

test('throws an error when given strategy does not exist', function () {
  expect(function () {
    var config = {
      strategy: '_non_existent_',
      dispatch: {
        requestActionType: 'w',
        successActionType: 'x',
        failureActionType: 'y',
        apiUrl: 'z'
      }
    };
    (0, _.createNotificationsMiddleware)(config);
  }).toThrow();
});
//# sourceMappingURL=spec.js.map
