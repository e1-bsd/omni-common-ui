'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = void 0;

beforeEach(function () {
  props = {
    erroredApi: {
      error: new Error('an error')
    }
  };
});

test('uses the default behaviour if no config is passed', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
  expect(wrapper.find('.' + _style2.default.ErrorPage_text).contains('Omni could not load this page.')).toBe(true);
  expect(wrapper.find('.' + _style2.default.ErrorPage_image).prop('id')).toBe('warning');
});

test('allows to customise the icon if config.icon is provided', function () {
  props.config = { icon: function icon() {
      return 'custom-id';
    } };
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
  expect(wrapper.find('.' + _style2.default.ErrorPage_image).prop('id')).toBe('custom-id');
});

test('allows to customise the error message if config.message is provided', function () {
  props.config = { message: function message() {
      return 'my custom error';
    } };
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
  expect(wrapper.find('.' + _style2.default.ErrorPage_text).contains('my custom error')).toBe(true);
});
//# sourceMappingURL=spec.js.map
