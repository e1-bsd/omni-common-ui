'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _reactRouter = require('react-router');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Breadcrumbs />', function () {
  describe('check basic render functionality', function () {
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

    it('links has been rendered properly', function () {
      (0, _chai.expect)(wrapper.find('.' + _style2.default.Breadcrumbs_crumb)).to.have.length(2);
    });

    it('back button has been rendered properly', function () {
      (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.Breadcrumbs_crumb_back);
    });

    it('only render the first item as a link', function () {
      (0, _chai.expect)(wrapper.find('.' + _style2.default.Breadcrumbs_crumb).last().find('span')).to.have.text('mark attendance');
      (0, _chai.expect)(wrapper.find('.' + _style2.default.Breadcrumbs_crumb).first().contains(_react2.default.createElement(_reactRouter.Link, null)));
    });
  });
});
//# sourceMappingURL=spec.js.map
