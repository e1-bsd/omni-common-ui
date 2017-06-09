'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('component', function () {
  describe('when featureLogin is not true', function () {
    beforeEach(function () {
      _Config2.default.merge({ featureLogin: false });
    });

    test('renders its children', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _.PermissionHandler,
        null,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.find('#inner')).toHaveLength(1);
    });
  });

  describe('when featureLogin is true', function () {
    beforeEach(function () {
      _Config2.default.merge({ featureLogin: true });
    });

    test('does nothing if no route is provided', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _.PermissionHandler,
        { havePrivilegesLoaded: function havePrivilegesLoaded() {
            return true;
          } },
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.contains(_react2.default.createElement('div', { id: 'inner' }))).toBe(true);
    });

    test('renders nothing if privileges have not been loaded', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _.PermissionHandler,
        { havePrivilegesLoaded: function havePrivilegesLoaded() {
            return false;
          } },
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.html()).toBe(null);
    });

    test('throws if permissionChecks.canAccess is not a function', function () {
      expect(function () {
        return (0, _enzyme.shallow)(_react2.default.createElement(_.PermissionHandler, { permissionChecks: [{}],
          havePrivilegesLoaded: function havePrivilegesLoaded() {
            return true;
          } }));
      }).toThrowError();
    });

    test('calls permissionChecks.canAccess passing all props if it is a function', function () {
      var canAccess = jest.fn();
      var props = { permissionChecks: [{ canAccess: canAccess }], havePrivilegesLoaded: function havePrivilegesLoaded() {
          return true;
        } };
      (0, _enzyme.shallow)(_react2.default.createElement(_.PermissionHandler, props));
      expect(canAccess).toHaveBeenCalledWith(props);
    });

    test('calls canAccess() for all routes until one returns false', function () {
      var props = {
        permissionChecks: [{ canAccess: jest.fn().mockReturnValue(true) }, { canAccess: jest.fn().mockReturnValue(false) }, { canAccess: jest.fn().mockReturnValue(false) }],
        havePrivilegesLoaded: function havePrivilegesLoaded() {
          return true;
        }
      };
      (0, _enzyme.shallow)(_react2.default.createElement(_.PermissionHandler, props));
      expect(props.permissionChecks[0].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[1].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[2].canAccess).not.toHaveBeenCalled();
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
    var result = (0, _.mapStateToProps)(null, { routes: routes });
    expect(result.permissionChecks).toEqual([permissionChecks1, permissionChecks2]);
  });

  test('returns permissionChecks as an array with one route ' + 'if there is only one that has a canAccess()', function () {
    var permissionChecks1 = { canAccess: function canAccess() {} };
    var routes = [{}, permissionChecks1, {}];
    var result = (0, _.mapStateToProps)(null, { routes: routes });
    expect(result.permissionChecks).toEqual([permissionChecks1]);
  });

  test('returns permissionChecks as an empty array if no route has canAccess()', function () {
    expect((0, _.mapStateToProps)(null, { routes: [{}, {}, {}] }).permissionChecks).toEqual([]);
  });
});
//# sourceMappingURL=spec.js.map
