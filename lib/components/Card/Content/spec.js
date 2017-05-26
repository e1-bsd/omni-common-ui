'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Card.Content', function () {
  it('renders its children', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _.Content,
      null,
      _react2.default.createElement('div', { id: 'innerContent' })
    ));
    (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).to.be.true;
  });
  it('sets the bottomless padding style when the property is supplied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Content, { withoutBottomPadding: true }));
    (0, _chai.expect)(wrapper).to.have.className(_style2.default.__bottomless);
  });
  it('does not set the bottomless padding style when the property is omitted', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Content, null));
    (0, _chai.expect)(wrapper).to.not.have.className(_style2.default.__bottomless);
  });
});
//# sourceMappingURL=spec.js.map
