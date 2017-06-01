'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form', function () {
  describe('TextInput', function () {
    it('works along with Formsy', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _2.default,
        null,
        _react2.default.createElement(_2.default.TextInput, { name: 'email',
          label: 'Email',
          validations: 'isEmail',
          validationError: 'This is not a valid email',
          value: '123' })
      ));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.__error)).to.have.length(1);
    });
  });
});
//# sourceMappingURL=spec.js.map
