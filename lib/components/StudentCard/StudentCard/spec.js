'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _style3 = require('../Profile/style.postcss');

var _style4 = _interopRequireDefault(_style3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _StudentCard = require('./..');

var _StudentCard2 = _interopRequireDefault(_StudentCard);

var _Card = require('./../../Card');

var _Card2 = _interopRequireDefault(_Card);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders its children', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _StudentCard2.default,
    null,
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).toBe(true);
});

test('renders a Card descendent', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_StudentCard2.default, null));
  expect(wrapper.find(_Card2.default)).toHaveLength(1);
});

test('adds the borderless prop to Card when borderless prop is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_StudentCard2.default, { borderless: true }));
  expect(wrapper.find(_Card2.default).prop('borderless')).toBe(true);
});

test('sets the given status accent color class when provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_StudentCard2.default, { statusAccentColor: 'grey' }));
  expect(wrapper.find('div').prop('className')).toBe((0, _classnames2.default)(_style2.default.StudentCard, _style2.default.__grey));
});

test('renders a StudentCard.Profile when provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _StudentCard2.default,
    null,
    _react2.default.createElement(_StudentCard2.default.Profile, null)
  ));
  expect(wrapper.contains(_react2.default.createElement(_StudentCard2.default.Profile, null))).toBe(true);
});

test('renders a StudentCard.Content when provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _StudentCard2.default,
    null,
    _react2.default.createElement(_StudentCard2.default.Content, null)
  ));
  expect(wrapper.contains(_react2.default.createElement(_StudentCard2.default.Content, null))).toBe(true);
});

test('renders a StudentCard.Profile without separator class by default', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _StudentCard2.default,
    null,
    _react2.default.createElement(_StudentCard2.default.Profile, null)
  ));
  expect(wrapper.find(_Card2.default.Content).children().hasClass(_style4.default.__separated)).toBe(false);
});

test('renders a StudentCard.Profile with separator class (withSeparatorLine provided)', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _StudentCard2.default,
    { withSeparatorLine: true },
    _react2.default.createElement(_StudentCard2.default.Profile, null)
  ));
  expect(wrapper.find(_Card2.default.Content).children().hasClass(_style4.default.__separated)).toBe(true);
});
//# sourceMappingURL=spec.js.map
