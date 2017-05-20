'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _StudentPicture = require('./../../StudentPicture');

var _StudentPicture2 = _interopRequireDefault(_StudentPicture);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('StudentCard.Profile', function () {
  it('renders a StudentPicture with the given attributes', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { avatarUrl: 'url', gender: 1 }));
    (0, _chai.expect)(wrapper).to.contain(_react2.default.createElement(_StudentPicture2.default, { src: 'url', gender: 1,
      className: _style2.default.StudentCard_profile_image }));
  });
  it('renders a bigger StudentPicture with the withBiggerAvatar prop', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { withBiggerAvatar: true, avatarUrl: 'url', gender: 1 }));
    (0, _chai.expect)(wrapper).to.contain(_react2.default.createElement(_StudentPicture2.default, { src: 'url', gender: 1,
      className: (0, _classnames2.default)(_style2.default.StudentCard_profile_image, _style2.default.__bigger) }));
  });
  it('renders profile info with the given name', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'John', surname: 'Doe', localName: '\u738B\u5446\u5446' }));
    (0, _chai.expect)(wrapper.find('.' + _style2.default.StudentCard_profile_name)).to.have.text('John Doe');
  });
  it('renders profile info with the given surname', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'John', surname: 'Doe', localName: '\u738B\u5446\u5446' }));
    (0, _chai.expect)(wrapper.find('.' + _style2.default.StudentCard_profile_localName)).to.have.text('王呆呆');
  });
});
//# sourceMappingURL=spec.js.map
