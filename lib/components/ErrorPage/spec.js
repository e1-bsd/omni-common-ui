'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ErrorPageHandler />', function () {
  describe('<ErrorPage />', function () {
    var props = void 0;

    beforeEach(function () {
      props = {
        erroredApi: {
          error: new Error('an error')
        }
      };
    });

    it('uses the default behaviour if no config is passed', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.ErrorPage_text)).to.contain('Omni could not load this page.');
      (0, _chai.expect)(wrapper.find('.' + _style2.default.ErrorPage_image)).to.have.prop('id', 'warning');
    });

    it('allows to customise the icon if config.icon is provided', function () {
      props.config = { icon: function icon() {
          return 'custom-id';
        } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.ErrorPage_image)).to.have.prop('id', 'custom-id');
    });

    it('allows to customise the error message if config.message is provided', function () {
      props.config = { message: function message() {
          return 'my custom error';
        } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.ErrorPage_text)).to.contain('my custom error');
    });
  });
});
//# sourceMappingURL=spec.js.map
