'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _StudentCard = require('./..');

var _StudentCard2 = _interopRequireDefault(_StudentCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders its children', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).toBe(true);
});

test('renders a StudentCard.Content with separator class (withSeparatorLine provided)', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _StudentCard2.default,
    { withSeparatorLine: true },
    _react2.default.createElement(_2.default, null)
  ));
  expect(wrapper.find(_2.default).hasClass(_style2.default.__withSeparatorLine)).toBe(true);
});
//# sourceMappingURL=spec.js.map
