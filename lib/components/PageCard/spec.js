'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PageCard', function () {
  it('renders its children', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement('div', { id: 'innerContent' })
    ));
    (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).to.be.true;
  });
  it('allows to add custom classes', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'aClass' }));
    (0, _chai.expect)(wrapper).to.have.descendants('.aClass');
  });
});
//# sourceMappingURL=spec.js.map
