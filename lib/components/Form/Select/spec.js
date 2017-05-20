'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form', function () {
  describe('Select', function () {
    var options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two', clearableValue: false }];

    it('works along with Formsy', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _2.default,
        null,
        _react2.default.createElement(_2.default.Select, { name: 'required',
          label: 'required',
          value: '',
          options: options,
          required: true })
      ));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.__required)).to.have.length(1);
    });

    context('label prop existence', function () {
      it('has a Field when there is a label prop present', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          _2.default,
          null,
          _react2.default.createElement(_2.default.Select, { name: 'labelled',
            label: 'labelled',
            value: '',
            options: options })
        ));
        (0, _chai.expect)(wrapper).to.have.descendants(_Field2.default);
      });

      it('does not have a Field when there is no label prop present', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          _2.default,
          null,
          _react2.default.createElement(_2.default.Select, { name: 'labelless',
            value: '',
            options: options })
        ));
        (0, _chai.expect)(wrapper).to.not.have.descendants(_Field2.default);
      });
    });
  });
});
//# sourceMappingURL=spec.js.map
