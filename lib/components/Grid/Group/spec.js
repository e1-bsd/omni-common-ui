'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _Item = require('../Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Grid', function () {
  var options = void 0;

  beforeEach(function () {
    options = { context: { grid: {} } };
  });

  describe('Group', function () {
    describe('when it has one child', function () {
      var wrapper = void 0;

      beforeEach(function () {
        wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
          _2.default,
          null,
          _react2.default.createElement('div', { id: 'child' })
        ), options);
      });

      it('renders it', function () {
        (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'child' }))).to.be.true;
      });

      it('wraps it with Item if it is not an Item', function () {
        (0, _chai.expect)(wrapper.find(_Item2.default)).to.have.length(1);
      });

      it('wraps it only if it is not an Item', function () {
        (0, _enzyme.shallow)(_react2.default.createElement(
          _2.default,
          null,
          _react2.default.createElement(
            _Item2.default,
            null,
            _react2.default.createElement('div', { id: 'child' })
          )
        ), options);
        (0, _chai.expect)(wrapper.find(_Item2.default)).to.have.length(1);
      });

      it('does not crash if no children are provided', function () {
        (0, _chai.expect)(function () {
          return (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null), options);
        }).to.not.throw();
      });

      it('does not crash if an invalid child is provided', function () {
        (0, _chai.expect)(function () {
          return (0, _enzyme.shallow)(_react2.default.createElement(
            _2.default,
            null,
            _react2.default.createElement('div', null),
            null
          ), options);
        }).to.not.throw();
      });
    });

    describe('when it has several children', function () {
      var wrapper = void 0;

      beforeEach(function () {
        wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
          _2.default,
          null,
          _react2.default.createElement('div', { id: 'child1' }),
          _react2.default.createElement('div', { id: 'child2' })
        ), options);
      });

      it('renders them', function () {
        (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'child1' }))).to.be.true;
        (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'child2' }))).to.be.true;
      });

      it('wraps them with Item if they are not an Item', function () {
        (0, _chai.expect)(wrapper.find(_Item2.default)).to.have.length(2);
      });

      it('wraps only children that are not an Item', function () {
        (0, _enzyme.shallow)(_react2.default.createElement(
          _2.default,
          null,
          _react2.default.createElement('div', { id: 'child1' }),
          _react2.default.createElement(
            _Item2.default,
            null,
            _react2.default.createElement('div', { id: 'child2' })
          )
        ), options);
        (0, _chai.expect)(wrapper.find(_Item2.default)).to.have.length(2);
      });
    });
  });
});
//# sourceMappingURL=spec.js.map
