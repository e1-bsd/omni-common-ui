'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Grid', function () {
  var options = void 0;
  var grid = void 0;

  beforeEach(function () {
    grid = {
      'col-xs-12': 'col-xs-12',
      'col-sm-6': 'col-sm-6',
      'col-md-4': 'col-md-4',
      'col-lg-3': 'col-lg-3'
    };

    options = { context: { grid: grid } };
  });

  describe('Item', function () {
    it('renders its children', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _2.default,
        null,
        _react2.default.createElement('div', { id: 'innerContent' })
      ), options);
      (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).to.be.true;
    });

    it('uses col-xs-12 if no configuration is provided', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null), options);
      (0, _chai.expect)(wrapper.hasClass(grid['col-xs-12'])).to.be.true;
    });

    it('uses col-xs-12 if no xs configuration is provided', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { md: 2 }), options);
      (0, _chai.expect)(wrapper.hasClass(grid['col-xs-12'])).to.be.true;
    });

    it('applies the classes according to the properties it is passed', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { xs: 12, sm: 6, md: 4, lg: 3 }), options);
      (0, _chai.expect)(wrapper.hasClass(grid['col-xs-12'])).to.be.true;
      (0, _chai.expect)(wrapper.hasClass(grid['col-sm-6'])).to.be.true;
      (0, _chai.expect)(wrapper.hasClass(grid['col-md-4'])).to.be.true;
      (0, _chai.expect)(wrapper.hasClass(grid['col-lg-3'])).to.be.true;
    });
  });
});
//# sourceMappingURL=spec.js.map
