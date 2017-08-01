'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders its children', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _.Content,
    null,
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).toBe(true);
});

test('sets the bottomless padding style when the property is supplied', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Content, { withoutBottomPadding: true }));
  expect(wrapper.hasClass(_style2.default.__bottomless)).toBe(true);
});

test('does not set the bottomless padding style when the property is omitted', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Content, null));
  expect(wrapper.hasClass(_style2.default.__bottomless)).toBe(false);
});
//# sourceMappingURL=spec.js.map
