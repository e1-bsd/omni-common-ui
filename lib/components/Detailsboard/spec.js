'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders itself with title and value', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.DetailsBoard, { title: 'test', value: 'test' }));
  expect(wrapper.hasClass(_style2.default.Detailsboard_board)).toBe(true);
});
//# sourceMappingURL=spec.js.map
