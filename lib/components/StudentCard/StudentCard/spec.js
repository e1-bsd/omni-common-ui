'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _style3 = require('../Profile/style.postcss');

var _style4 = _interopRequireDefault(_style3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _StudentCard = require('./..');

var _StudentCard2 = _interopRequireDefault(_StudentCard);

var _Card = require('./../../Card');

var _Card2 = _interopRequireDefault(_Card);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('StudentCard', function () {
  it('renders its children', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _StudentCard2.default,
      null,
      _react2.default.createElement('div', { id: 'innerContent' })
    ));
    (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).to.be.true;
  });

  it('renders a Card descendent', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_StudentCard2.default, null));
    (0, _chai.expect)(wrapper).to.have.descendants(_Card2.default);
  });

  it('adds the borderless prop to Card when borderless prop is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_StudentCard2.default, { borderless: true }));
    (0, _chai.expect)(wrapper.find(_Card2.default).prop('borderless')).to.be.true;
  });

  it('sets the given status accent color class when provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_StudentCard2.default, { statusAccentColor: 'grey' }));
    (0, _chai.expect)(wrapper.find('div')).to.have.prop('className', (0, _classnames2.default)(_style2.default.StudentCard, _style2.default.__grey));
  });

  it('renders a StudentCard.Profile when provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _StudentCard2.default,
      null,
      _react2.default.createElement(_StudentCard2.default.Profile, null)
    ));
    (0, _chai.expect)(wrapper).to.contain(_react2.default.createElement(_StudentCard2.default.Profile, null));
  });

  it('renders a StudentCard.Content when provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _StudentCard2.default,
      null,
      _react2.default.createElement(_StudentCard2.default.Content, null)
    ));
    (0, _chai.expect)(wrapper).to.contain(_react2.default.createElement(_StudentCard2.default.Content, null));
  });

  it('renders a StudentCard.Profile without separator class by default', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _StudentCard2.default,
      null,
      _react2.default.createElement(_StudentCard2.default.Profile, null)
    ));
    (0, _chai.expect)(wrapper.find(_Card2.default.Content).children()).to.not.have.className(_style4.default.__separated);
  });

  it('renders a StudentCard.Profile with separator class (withSeparatorLine provided)', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _StudentCard2.default,
      { withSeparatorLine: true },
      _react2.default.createElement(_StudentCard2.default.Profile, null)
    ));
    (0, _chai.expect)(wrapper.find(_Card2.default.Content).children()).to.have.className(_style4.default.__separated);
  });
});
//# sourceMappingURL=spec.js.map
