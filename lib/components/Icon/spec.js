'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders the content of the SVG file into the DOM', function () {
  var iconId = 'magnifying-glass';
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: iconId }));
  expect(wrapper.contains(_icons2.default.get(iconId))).toBe(true);
});

test('allows passing className down to the inline SVG component', function () {
  var iconId = 'magnifying-glass';
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: iconId, className: 'custom-class' }));
  expect(wrapper.hasClass('custom-class')).toBe(true);
});

test('allows setting an onClick event', function () {
  var onClick = jest.fn();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: 'burger', onClick: onClick }));
  wrapper.simulate('click');
  expect(onClick).toHaveBeenCalled();
});

test('allows setting a title attribute to the icon', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: 'burger', title: 'Some title' }));
  expect(wrapper.find('[title="Some title"]')).toHaveLength(1);
});
//# sourceMappingURL=spec.js.map
