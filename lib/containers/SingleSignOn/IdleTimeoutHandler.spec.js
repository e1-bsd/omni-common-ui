'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _userManager = require('./userManager');

var _userManager2 = _interopRequireDefault(_userManager);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _IdleTimeoutHandler = require('./IdleTimeoutHandler');

var _IdleTimeoutHandler2 = _interopRequireDefault(_IdleTimeoutHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./userManager');

var mountComponent = function mountComponent() {
  return (0, _enzyme.mount)(_react2.default.createElement(
    _IdleTimeoutHandler2.default,
    null,
    _react2.default.createElement('div', { id: 'inner' })
  ));
};

beforeEach(function () {
  jest.resetAllMocks();
  jest.useFakeTimers();
});

afterEach(function () {
  jest.clearAllTimers();
});

describe('when autoSignOutTimeout is false', function () {
  beforeEach(function () {
    _Config2.default.merge({ autoSignOutTimeout: false });
  });

  test('does not call userManager.forceSignoutRedirect()', function () {
    mountComponent();
    jest.runAllTimers();
    expect(_userManager2.default.forceSignoutRedirect).not.toHaveBeenCalled();
  });

  test('renders its children', function () {
    var wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});

describe('when autoSignOutTimeout is a number', function () {
  var autoSignOutTimeout = 1;
  beforeEach(function () {
    _Config2.default.merge({ autoSignOutTimeout: autoSignOutTimeout });
  });

  test('calls userManager.forceSignoutRedirect() after the seconds set in autoSignOutTimeout', function () {
    mountComponent();
    jest.runAllTimers();
    expect(_userManager2.default.forceSignoutRedirect).toHaveBeenCalled();
  });

  test('does not call userManager.forceSignoutRedirect() after the seconds set in autoSignOutTimeout ' + 'if there are some user interactions happening', function () {
    var halfTimeoutTime = autoSignOutTimeout * 1000 / 2;
    mountComponent();
    jest.runTimersToTime(halfTimeoutTime);
    window.document.dispatchEvent(new Event('click'));
    jest.runTimersToTime(halfTimeoutTime);
    expect(_userManager2.default.forceSignoutRedirect).not.toHaveBeenCalled();
  });

  test('renders its children', function () {
    var wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});
//# sourceMappingURL=IdleTimeoutHandler.spec.js.map
