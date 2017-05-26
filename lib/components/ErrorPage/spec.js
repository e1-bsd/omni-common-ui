'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ErrorPageHandler />', function () {
  describe('<ErrorPage />', function () {
    var props = void 0;

    beforeEach(function () {
      props = {
        afterButtonClicked: _sinon2.default.spy(),
        erroredApi: {
          error: new Error('an error')
        }
      };
    });

    it('uses the default behaviour if no config is passed', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.ErrorPage_text)).to.contain('Omni could not load this page.');
      (0, _chai.expect)(wrapper.find('.' + _style2.default.ErrorPage_image)).to.have.prop('id', 'warning');
      (0, _chai.expect)(wrapper.find(_Button2.default)).to.have.prop('children', 'Back');
      (0, _chai.expect)(wrapper.find(_Button2.default)).to.have.prop('linkTo', '/');
    });

    it('calls afterButtonClicked after clicking the button even ' + 'if no config.buttonLink is provided', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      wrapper.find(_Button2.default).simulate('click');
      (0, _chai.expect)(props.afterButtonClicked.calledOnce).to.be.true;
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

    it('allows to customise the text in the button if config.buttonText is provided', function () {
      props.config = { buttonText: function buttonText() {
          return 'my custom button';
        } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      (0, _chai.expect)(wrapper.find(_Button2.default)).to.contain('my custom button');
    });

    it('allows to customise the button\'s link if config.buttonLink is provided', function () {
      props.config = { buttonLink: function buttonLink() {
          return '/custom/path';
        } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      (0, _chai.expect)(wrapper.find(_Button2.default)).to.have.prop('linkTo', '/custom/path');
    });

    it('calls all config functions with props', function () {
      props.config = { message: _sinon2.default.spy(), buttonText: _sinon2.default.spy(), buttonLink: _sinon2.default.spy() };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      wrapper.find(_Button2.default).simulate('click');
      (0, _chai.expect)(props.config.message.calledOnce).to.equal(true, 'message called once');
      (0, _chai.expect)(props.config.message.args).to.eql([[props]], 'message params');
      (0, _chai.expect)(props.config.buttonText.calledOnce).to.equal(true, 'buttonText called once');
      (0, _chai.expect)(props.config.buttonText.args).to.eql([[props]], 'buttonText params');
      (0, _chai.expect)(props.config.buttonLink.calledOnce).to.equal(true, 'buttonLink called once');
      (0, _chai.expect)(props.config.buttonLink.args).to.eql([[props]], 'buttonLink params');
    });

    it('shows the button even if its link points to the current URL', function () {
      props.config = { buttonLink: function buttonLink() {
          return 'current/Path/';
        } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.ErrorPage, props));
      (0, _chai.expect)(wrapper.find(_Button2.default)).to.have.prop('linkTo', 'current/Path/');
    });
  });
});
//# sourceMappingURL=spec.js.map
