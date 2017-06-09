'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _generateUserInitialsAvatarSvg = require('./generateUserInitialsAvatarSvg');

var _generateUserInitialsAvatarSvg2 = _interopRequireDefault(_generateUserInitialsAvatarSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bloggsInitialsAvatarUri = (0, _generateUserInitialsAvatarSvg2.default)('Joe', 'Bloggs');
var unknownInitialsAvatarUri = (0, _generateUserInitialsAvatarSvg2.default)('?', '?');
var redInitialsAvatarUri = (0, _generateUserInitialsAvatarSvg2.default)('Kelly', '?', '#D8213A', 'white');

var props = void 0;

beforeEach(function () {
  props = {
    src: 'fake-src',
    default: 'fake-default',
    defaultMale: 'fake-default-male',
    defaultFemale: 'fake-default-female'
  };
});

test('allows to add custom classes', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'aClass' }));
  expect(wrapper.find('.aClass')).toHaveLength(1);
});

test('shows provided src', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { src: 'fake-src' }));
  expect(wrapper.prop('style').backgroundImage).toBe('url("fake-src")');
});

test('assigns two background images, in case the src is broken', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, props));
  expect(wrapper.prop('style').backgroundImage).toBe('url("fake-src"), url("fake-default")');
});

describe('when src is not provided', function () {
  beforeEach(function () {
    props.src = undefined;
  });

  test('shows the default image for males', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, { gender: 'male' })));
    expect(wrapper.prop('style').backgroundImage).toBe('url("fake-default-male")');
  });

  test('shows the default image for females', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, { gender: 'female' })));
    expect(wrapper.prop('style').backgroundImage).toBe('url("fake-default-female")');
  });

  test('shows the default image if no gender is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, props));
    expect(wrapper.prop('style').backgroundImage).toBe('url("fake-default")');
  });

  describe('shows an SVG-based avatar containing the users initials (when enabled via prop)', function () {
    test('happy path', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
        userFirstName: 'Joe',
        userLastName: 'Bloggs',
        displayUserInitialsAsDefaultAvatar: true })));
      expect(wrapper.prop('style').backgroundImage).toBe('url("' + bloggsInitialsAvatarUri + '")');
    });

    test('happy path - colour spec correctness check', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
        userFirstName: 'Kelly',
        displayUserInitialsAsDefaultAvatar: true })));
      expect(wrapper.prop('style').backgroundImage).toBe('url("' + redInitialsAvatarUri + '")');
    });

    test('containing "??" when user name is blank', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
        userFirstName: '',
        userLastName: '',
        displayUserInitialsAsDefaultAvatar: true })));
      expect(wrapper.prop('style').backgroundImage).toBe('url("' + unknownInitialsAvatarUri + '")');
    });

    test('containing "??" when user name is absent', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
        displayUserInitialsAsDefaultAvatar: true })));
      expect(wrapper.prop('style').backgroundImage).toBe('url("' + unknownInitialsAvatarUri + '")');
    });

    test('containing "??" when user name is a non-string value', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
        userFirstName: null,
        userLastName: 0,
        displayUserInitialsAsDefaultAvatar: true })));
      expect(wrapper.prop('style').backgroundImage).toBe('url("' + unknownInitialsAvatarUri + '")');
    });
  });
});
//# sourceMappingURL=spec.js.map
