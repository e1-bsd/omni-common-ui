'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = void 0;
var grid = void 0;

beforeEach(function () {
  grid = {
    'col-xs-12': 'col-xs-12',
    'col-sm-6': 'col-sm-6',
    'col-md-4': 'col-md-4',
    'col-lg-3': 'col-lg-3'
  };

  options = { context: { grid: grid } };
});

test('renders its children', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement('div', { id: 'innerContent' })
  ), options);
  expect(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).toBe(true);
});

test('uses col-xs-12 if no configuration is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null), options);
  expect(wrapper.hasClass(grid['col-xs-12'])).toBe(true);
});

test('uses col-xs-12 if no xs configuration is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { md: 2 }), options);
  expect(wrapper.hasClass(grid['col-xs-12'])).toBe(true);
});

test('applies the classes according to the properties it is passed', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { xs: 12, sm: 6, md: 4, lg: 3 }), options);
  expect(wrapper.hasClass(grid['col-xs-12'])).toBe(true);
  expect(wrapper.hasClass(grid['col-sm-6'])).toBe(true);
  expect(wrapper.hasClass(grid['col-md-4'])).toBe(true);
  expect(wrapper.hasClass(grid['col-lg-3'])).toBe(true);
});
//# sourceMappingURL=spec.js.map
