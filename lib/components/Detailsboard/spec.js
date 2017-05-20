'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DetailBoard', function () {
  it('renders itself with title and value', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { title: 'test', value: 'test' }));
    (0, _chai.expect)(wrapper).to.have.className(_style2.default.Detailsboard_board);
  });
});
//# sourceMappingURL=spec.js.map
