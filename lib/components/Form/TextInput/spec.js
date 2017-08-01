'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('works along with Formsy', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(_2.default.TextInput, { name: 'email',
      label: 'Email',
      validations: 'isEmail',
      validationError: 'This is not a valid email',
      value: '123' })
  ));
  expect(wrapper.find('.' + _style2.default.__error).length).toBeGreaterThanOrEqual(1);
});
//# sourceMappingURL=spec.js.map
