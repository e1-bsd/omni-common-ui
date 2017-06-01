'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _PageCard = require('./../PageCard');

var _PageCard2 = _interopRequireDefault(_PageCard);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<SelectionTable />', function () {
  it('renders the root Level and title', function () {
    var selectionTableTitle = 'Classroom';
    var selectionTable = _react2.default.createElement(
      _2.default,
      { title: selectionTableTitle },
      _react2.default.createElement(_2.default.Level, { label: 'CN' }),
      _react2.default.createElement(_2.default.Level, { label: 'RU' })
    );
    var wrapper = (0, _enzyme.mount)(selectionTable);
    (0, _chai.expect)(wrapper.find(_2.default.Level)).to.have.length(2);
    (0, _chai.expect)(wrapper.find(_PageCard2.default.Heading)).to.have.prop('text', selectionTableTitle);
  });

  it('render sub-Level once a level is clicked', function () {
    var selectionTable = _react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(
        _2.default.Level,
        { label: 'CN' },
        _react2.default.createElement(_2.default.Level, { label: 'CN-1' }),
        _react2.default.createElement(_2.default.Level, { label: 'CN-2' }),
        _react2.default.createElement(_2.default.Level, { label: 'CN-3' })
      ),
      _react2.default.createElement(
        _2.default.Level,
        { label: 'RU' },
        _react2.default.createElement(_2.default.Level, { label: 'CN-1' })
      )
    );

    var wrapper = (0, _enzyme.mount)(selectionTable);
    (0, _chai.expect)(wrapper.find(_2.default.Level)).to.have.length(2);
    wrapper.find(_2.default.Level).first().simulate('click');
    (0, _chai.expect)(wrapper.find(_2.default.Level)).to.have.length(3);
    (0, _chai.expect)(wrapper.find(_2.default.Level).first()).to.have.prop('label', 'CN-1');
  });
});
//# sourceMappingURL=spec.js.map
