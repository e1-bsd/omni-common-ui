'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _StudentPicture = require('./../StudentPicture');

var _StudentPicture2 = _interopRequireDefault(_StudentPicture);

var _AdultPicture = require('./../AdultPicture');

var _AdultPicture2 = _interopRequireDefault(_AdultPicture);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders StudentPicture if provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(_StudentPicture2.default, null)
  ));
  expect(wrapper.find(_StudentPicture2.default)).toHaveLength(1);
});

test('renders AdultPicture if provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(_AdultPicture2.default, null)
  ));
  expect(wrapper.find(_AdultPicture2.default)).toHaveLength(1);
});

test('renders only the first picture provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(_AdultPicture2.default, null),
    _react2.default.createElement(_AdultPicture2.default, null),
    _react2.default.createElement(_StudentPicture2.default, null)
  ));
  expect(wrapper.find(_AdultPicture2.default)).toHaveLength(1);
  expect(wrapper.find(_StudentPicture2.default)).toHaveLength(0);
});

test('renders all the other children as "lines"', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(_AdultPicture2.default, null),
    _react2.default.createElement('div', { id: 'line-1' }),
    _react2.default.createElement(
      'h1',
      { id: 'line-2' },
      'Line 2'
    ),
    _react2.default.createElement('div', { id: 'line-3' })
  ));
  var lines = wrapper.find('.' + _style2.default.Person_lines);
  expect(lines.find('#line-1')).toHaveLength(1);
  expect(lines.find('#line-2')).toHaveLength(1);
  expect(lines.find('#line-3')).toHaveLength(1);
});
//# sourceMappingURL=spec.js.map