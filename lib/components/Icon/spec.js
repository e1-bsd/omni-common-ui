'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Icon />', function () {
  it('renders the content of the SVG file into the DOM', function () {
    var iconId = 'magnifying-glass';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: iconId }));
    (0, _chai.expect)(wrapper).to.contain(_icons2.default.get(iconId));
  });

  it('allows passing className down to the inline SVG component', function () {
    var iconId = 'magnifying-glass';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: iconId, className: 'custom-class' }));
    (0, _chai.expect)(wrapper).to.have.descendants('.custom-class');
  });

  it('allows setting an onClick event', function () {
    var onClick = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: 'burger', onClick: onClick }));
    wrapper.simulate('click');
    (0, _chai.expect)(onClick.called).to.be.true;
  });

  it('allows setting a title attribute to the icon', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { id: 'burger', title: 'Some title' }));
    (0, _chai.expect)(wrapper.find('[title="Some title"]')).to.have.length(1);
  });
});
//# sourceMappingURL=spec.js.map
