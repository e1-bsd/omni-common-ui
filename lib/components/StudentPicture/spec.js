'use strict';

var _testImage = require('./test-image.png');

var _testImage2 = _interopRequireDefault(_testImage);

var _defaultAvatarMale = require('./default-avatar-male.svg');

var _defaultAvatarMale2 = _interopRequireDefault(_defaultAvatarMale);

var _defaultAvatarFemale = require('./default-avatar-female.svg');

var _defaultAvatarFemale2 = _interopRequireDefault(_defaultAvatarFemale);

var _defaultAvatar = require('./default-avatar.svg');

var _defaultAvatar2 = _interopRequireDefault(_defaultAvatar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _Avatar = require('./../Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test.only('passes properties properly to Avatar', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.StudentPicture, { src: _testImage2.default, className: 'aClass' }));
  var avatar = wrapper.find(_Avatar2.default);
  expect(avatar.prop('className')).toBe('aClass');
  expect(avatar.prop('default')).toBe(_defaultAvatar2.default);
  expect(avatar.prop('defaultMale')).toBe(_defaultAvatarMale2.default);
  expect(avatar.prop('defaultFemale')).toBe(_defaultAvatarFemale2.default);
  expect(avatar.prop('src')).toBe(_testImage2.default);
});
//# sourceMappingURL=spec.js.map
