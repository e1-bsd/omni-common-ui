'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _immutable = require('immutable');

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseProps = void 0;

var getComponent = function getComponent() {
  var kids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _enzyme.shallow)(_react2.default.createElement(
    _.AuthorizationHandler,
    _extends({}, baseProps, extraProps),
    kids
  ));
};

var state = new _immutable.Map({
  singleSignOn: new _immutable.Map({
    user: new _immutable.Map()
  })
});

beforeEach(function () {
  baseProps = {
    fetchPrivilegesIfNeeded: jest.fn(),
    user: new _immutable.Map({
      expired: false,
      profile: {
        sub: '123'
      }
    })
  };
});

describe('component', function () {
  describe('when featureLogin is not true', function () {
    beforeEach(function () {
      _Config2.default.merge({ featureLogin: false });
    });

    test('renders its children', function () {
      var wrapper = getComponent(_react2.default.createElement('div', { id: 'inner' }));
      expect(wrapper.find('#inner')).toHaveLength(1);
    });

    test('does not call fetchPrivilegesIfNeeded even if the user is fine', function () {
      getComponent();
      expect(baseProps.fetchPrivilegesIfNeeded).not.toHaveBeenCalled();
    });

    test('renders its children if the user is fine', function () {
      var wrapper = getComponent(_react2.default.createElement('div', { id: 'inner' }));
      expect(wrapper.find('#inner')).toHaveLength(1);
    });

    test('renders its children even if the user is not valid', function () {
      baseProps.user = null;
      var wrapper = getComponent(_react2.default.createElement('div', { id: 'inner' }));
      expect(wrapper.find('#inner')).toHaveLength(1);
    });
  });

  describe('when featureLogin is true', function () {
    beforeEach(function () {
      _Config2.default.merge({ featureLogin: true });
    });

    test('does nothing if no route is provided', function () {
      var wrapper = getComponent(_react2.default.createElement('div', { id: 'inner' }), { havePrivilegesLoaded: function havePrivilegesLoaded() {
          return true;
        } });
      expect(wrapper.contains(_react2.default.createElement('div', { id: 'inner' }))).toBe(true);
    });

    test('renders a loading spinner if privileges have not been loaded', function () {
      var wrapper = getComponent(_react2.default.createElement('div', { id: 'inner' }), { havePrivilegesLoaded: function havePrivilegesLoaded() {
          return false;
        } });
      expect(wrapper.contains(_react2.default.createElement(
        'div',
        { className: 'pace' },
        _react2.default.createElement('div', { className: 'pace-activity' })
      ))).toBe(true);
    });

    test('throws if permissionChecks.canAccess is not a function', function () {
      expect(function () {
        return getComponent(null, { havePrivilegesLoaded: function havePrivilegesLoaded() {
            return true;
          }, permissionChecks: [{}] });
      }).toThrowError();
    });

    test('calls permissionChecks.canAccess passing all props if it is a function', function () {
      var canAccess = jest.fn();
      var props = { permissionChecks: [{ canAccess: canAccess }], havePrivilegesLoaded: function havePrivilegesLoaded() {
          return true;
        } };
      getComponent(null, props);
      expect(canAccess).toHaveBeenCalledWith(Object.assign({ children: null }, baseProps, props));
    });

    test('calls canAccess() for all routes until one returns false', function () {
      var props = {
        permissionChecks: [{ canAccess: jest.fn().mockReturnValue(true) }, { canAccess: jest.fn().mockReturnValue(false) }, { canAccess: jest.fn().mockReturnValue(false) }],
        havePrivilegesLoaded: function havePrivilegesLoaded() {
          return true;
        }
      };
      getComponent(null, props);
      expect(props.permissionChecks[0].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[1].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[2].canAccess).not.toHaveBeenCalled();
    });

    test('calls fetchPrivilegesIfNeeded if the user is fine but permissions have not loaded', function () {
      baseProps.havePrivilegesLoaded = function () {
        return false;
      };
      getComponent();
      expect(baseProps.fetchPrivilegesIfNeeded).toHaveBeenCalled();
    });

    test('renders its children if the user is fine and permissions have loaded', function () {
      baseProps.havePrivilegesLoaded = function () {
        return true;
      };
      var wrapper = getComponent(_react2.default.createElement('div', { id: 'inner' }));
      expect(wrapper.find('#inner')).toHaveLength(1);
    });
  });
});

describe('mapStateToProps()', function () {
  beforeEach(function () {
    _Config2.default.merge({ featureLogin: true });
  });

  test('returns permissionChecks as an array with all routes that have a canAccess()', function () {
    var permissionChecks1 = { canAccess: function canAccess() {} };
    var permissionChecks2 = { canAccess: function canAccess() {} };
    var routes = [{}, permissionChecks1, {}, permissionChecks2];
    var result = (0, _.mapStateToProps)(state, { routes: routes });
    expect(result.permissionChecks).toEqual([permissionChecks1, permissionChecks2]);
  });

  test('returns permissionChecks as an array with one route ' + 'if there is only one that has a canAccess()', function () {
    var permissionChecks1 = { canAccess: function canAccess() {} };
    var routes = [{}, permissionChecks1, {}];
    var result = (0, _.mapStateToProps)(state, { routes: routes });
    expect(result.permissionChecks).toEqual([permissionChecks1]);
  });

  test('returns permissionChecks as an empty array if no route has canAccess()', function () {
    expect((0, _.mapStateToProps)(state, { routes: [{}, {}, {}] }).permissionChecks).toEqual([]);
  });
});
//# sourceMappingURL=spec.js.map
