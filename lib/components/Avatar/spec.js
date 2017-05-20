'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _generateUserInitialsAvatarSvg = require('./generateUserInitialsAvatarSvg');

var _generateUserInitialsAvatarSvg2 = _interopRequireDefault(_generateUserInitialsAvatarSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Avatar />', function () {
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

  it('allows to add custom classes', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: 'aClass' }));
    (0, _chai.expect)(wrapper).to.have.descendants('.aClass');
  });

  it('shows provided src', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { src: 'fake-src' }));
    (0, _chai.expect)(wrapper).to.have.style('background-image', 'url("fake-src")');
  });

  it('assigns two background images, in case the src is broken', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, props));
    (0, _chai.expect)(wrapper).to.have.style('background-image', 'url("fake-src"), url("fake-default")');
  });

  describe('when src is not provided', function () {
    beforeEach(function () {
      props.src = undefined;
    });

    it('shows the default image for males', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, { gender: 'male' })));
      (0, _chai.expect)(wrapper).to.have.style('background-image', 'url("fake-default-male")');
    });

    it('shows the default image for females', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, { gender: 'female' })));
      (0, _chai.expect)(wrapper).to.have.style('background-image', 'url("fake-default-female")');
    });

    it('shows the default image if no gender is provided', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, props));
      (0, _chai.expect)(wrapper).to.have.style('background-image', 'url("fake-default")');
    });

    context('shows an SVG-based avatar containing the users initials (when enabled via prop)', function () {
      it('happy path', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
          userFirstName: 'Joe',
          userLastName: 'Bloggs',
          displayUserInitialsAsDefaultAvatar: true })));
        (0, _chai.expect)(wrapper).to.have.attr('style', 'background-image:url("' + bloggsInitialsAvatarUri + '");');
      });

      it('happy path - colour spec correctness check', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
          userFirstName: 'Kelly',
          displayUserInitialsAsDefaultAvatar: true })));
        (0, _chai.expect)(wrapper).to.have.attr('style', 'background-image:url("' + redInitialsAvatarUri + '");');
      });

      it('containing "??" when user name is blank', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
          userFirstName: '',
          userLastName: '',
          displayUserInitialsAsDefaultAvatar: true })));
        (0, _chai.expect)(wrapper).to.have.attr('style', 'background-image:url("' + unknownInitialsAvatarUri + '");');
      });

      it('containing "??" when user name is absent', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
          displayUserInitialsAsDefaultAvatar: true })));
        (0, _chai.expect)(wrapper).to.have.attr('style', 'background-image:url("' + unknownInitialsAvatarUri + '");');
      });

      it('containing "??" when user name is a non-string value', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, _extends({}, props, {
          userFirstName: null,
          userLastName: 0,
          displayUserInitialsAsDefaultAvatar: true })));
        (0, _chai.expect)(wrapper).to.have.attr('style', 'background-image:url("' + unknownInitialsAvatarUri + '");');
      });
    });
  });
});
//# sourceMappingURL=spec.js.map
