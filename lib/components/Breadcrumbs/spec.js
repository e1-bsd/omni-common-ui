'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reactRouter = require('react-router');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupLink = {
  label: 'group1',
  href: '/group/1',
  clickable: true
};

var markAttendanceLink = {
  label: 'mark attendance',
  clickable: false
};

var wrapper = void 0;

beforeEach(function () {
  wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { items: [groupLink, markAttendanceLink] }));
});

test('links has been rendered properly', function () {
  expect(wrapper.find('.' + _style2.default.Breadcrumbs_crumb)).toHaveLength(2);
});

test('back button has been rendered properly', function () {
  expect(wrapper.find('.' + _style2.default.Breadcrumbs_crumb_back)).toHaveLength(1);
});

test('only render the first item as a link', function () {
  expect(wrapper.find('.' + _style2.default.Breadcrumbs_crumb).last().find('span').text()).toBe('mark attendance');
  expect(wrapper.find('.' + _style2.default.Breadcrumbs_crumb).first().find(_reactRouter.Link)).toHaveLength(1);
});
//# sourceMappingURL=spec.js.map
