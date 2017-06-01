'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _Tooltip = require('./../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ColourLabel />', function () {
  context('when neither initial nor text is provided', function () {
    it('renders nothing', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
      (0, _chai.expect)(wrapper).to.be.blank();
    });
  });

  context('when initial is not provided', function () {
    it('renders a big label with the text', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { text: 'hey' }));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.ColourLabel_inner)).to.have.text('hey');
    });
  });

  context('when initial is provided', function () {
    context('when text is not provided', function () {
      it('renders a small label with the initial without any tooltip', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { initial: 'h' }));
        (0, _chai.expect)(wrapper.find('.' + _style2.default.ColourLabel_inner)).to.have.text('h');
        (0, _chai.expect)(wrapper.find(_Tooltip2.default)).to.have.length(0);
      });
    });

    context('when text is provided', function () {
      it('renders a small label with the initial and a tooltip with the text', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { initial: 'h', text: 'on hold' }));
        var tooltip = wrapper.find(_Tooltip2.default);
        (0, _chai.expect)(wrapper.find('.' + _style2.default.ColourLabel_inner)).to.have.text('h');
        (0, _chai.expect)(tooltip).to.have.length(1);
        (0, _chai.expect)(tooltip.prop('text')).to.equal('on hold');
      });
    });
  });
});
//# sourceMappingURL=spec.js.map
