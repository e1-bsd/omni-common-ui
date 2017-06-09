'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./userManager');

global.sessionStorage = {};

var props = void 0;
var userManager = void 0;
var SingleSignOnHandler = void 0;

var mountComponent = function mountComponent() {
  return (0, _enzyme.mount)(_react2.default.createElement(
    SingleSignOnHandler,
    props,
    _react2.default.createElement('div', { id: 'inner' })
  ));
};

beforeEach(function () {
  props = {
    fetchPrivilegesIfNeeded: jest.fn(),
    user: {
      expired: false,
      profile: {
        sub: '123'
      }
    }
  };
});

describe('when featureLogin is false', function () {
  beforeEach(function () {
    jest.resetModules();
    var Config = require('../../domain/Config');
    userManager = require('./userManager');

    Config.merge({ featureLogin: false });
    SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;
  });

  test('does not call userManager.signinRedirect() even if the user is not valid', function () {
    props.user = null;
    mountComponent();
    expect(userManager.signinRedirect).not.toHaveBeenCalled();
  });

  test('does not call userManager.signinRedirect() even if the user is expired', function () {
    props.user.expired = true;
    mountComponent();
    expect(userManager.signinRedirect).not.toHaveBeenCalled();
  });

  test('does not call fetchPrivilegesIfNeeded even if the user is fine', function () {
    mountComponent();
    expect(props.fetchPrivilegesIfNeeded).not.toHaveBeenCalled();
  });

  test('renders its children if the user is fine', function () {
    var wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });

  test('renders its children even if the user is not valid', function () {
    props.user = null;
    var wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});

describe('when featureLogin is true', function () {
  beforeEach(function () {
    jest.resetModules();
    var Config = require('../../domain/Config');
    userManager = require('./userManager');

    Config.merge({ featureLogin: true });
    SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;
  });

  test('calls userManager.signinRedirectWithValidation() if the user is not valid', function () {
    props.user = null;
    mountComponent();
    expect(userManager.signinRedirectWithValidation).toHaveBeenCalled();
  });

  test('calls userManager.signinRedirectWithValidation() if the user is expired', function () {
    props.user.expired = true;
    mountComponent();
    expect(userManager.signinRedirectWithValidation).toHaveBeenCalled();
  });

  test('calls fetchPrivilegesIfNeeded if the user is fine', function () {
    mountComponent();
    expect(props.fetchPrivilegesIfNeeded).toHaveBeenCalled();
  });

  test('renders its children if the user is fine', function () {
    var wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });

  test('does not render its children if the user is not valid', function () {
    props.user = null;
    var wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(0);
  });
});
//# sourceMappingURL=SingleSignOnHandler.spec.js.map
