'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _Config2 = require('./../../domain/Config');

var _Config3 = _interopRequireDefault(_Config2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<PermissionHandler />', function () {
  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  var doRequire = function doRequire(Config) {
    return require('inject-loader?domain/Config!./')({
      'domain/Config': _Config3.default.merge(Config)
    });
  };

  describe('component', function () {
    var PermissionHandler = void 0;

    context('when featureLogin is not true', function () {
      before(function () {
        PermissionHandler = doRequire({ featureLogin: false }).PermissionHandler;
      });

      it('renders its children', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
          PermissionHandler,
          null,
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.have.descendants('#inner');
      });
    });

    context('when featureLogin is true', function () {
      before(function () {
        PermissionHandler = doRequire({ featureLogin: true }).PermissionHandler;
      });

      it('does nothing if no route is provided', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
          PermissionHandler,
          { havePrivilegesLoaded: function havePrivilegesLoaded() {
              return true;
            } },
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.contain(_react2.default.createElement('div', { id: 'inner' }));
      });

      it('renders nothing if privileges have not been loaded', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
          PermissionHandler,
          { havePrivilegesLoaded: function havePrivilegesLoaded() {
              return false;
            } },
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.be.empty;
      });

      it('throws if permissionChecks.canAccess is not a function', function () {
        (0, _chai.expect)(function () {
          return (0, _enzyme.shallow)(_react2.default.createElement(PermissionHandler, { permissionChecks: [{}],
            havePrivilegesLoaded: function havePrivilegesLoaded() {
              return true;
            } }));
        }).to.throw();
      });

      it('calls permissionChecks.canAccess passing all props if it is a function', function () {
        var canAccess = _sinon2.default.spy();
        var props = { permissionChecks: [{ canAccess: canAccess }], havePrivilegesLoaded: function havePrivilegesLoaded() {
            return true;
          } };
        (0, _enzyme.shallow)(_react2.default.createElement(PermissionHandler, props));
        (0, _chai.expect)(canAccess.called).to.be.true;
        (0, _chai.expect)(canAccess.args[0]).to.eql([props]);
      });

      it('calls canAccess() for all routes until one returns false', function () {
        var props = {
          permissionChecks: [{ canAccess: _sinon2.default.stub().returns(true) }, { canAccess: _sinon2.default.stub().returns(false) }, { canAccess: _sinon2.default.stub().returns(false) }],
          havePrivilegesLoaded: function havePrivilegesLoaded() {
            return true;
          }
        };
        (0, _enzyme.shallow)(_react2.default.createElement(PermissionHandler, props));
        (0, _chai.expect)(props.permissionChecks[0].canAccess.called).to.equal(true, 'first');
        (0, _chai.expect)(props.permissionChecks[1].canAccess.called).to.equal(true, 'second');
        (0, _chai.expect)(props.permissionChecks[2].canAccess.called).to.equal(false, 'third');
      });
    });
  });

  describe('mapStateToProps()', function () {
    var mapStateToProps = void 0;

    before(function () {
      mapStateToProps = doRequire({ featureLogin: true }).mapStateToProps;
    });

    it('returns permissionChecks as an array with all routes that have a canAccess()', function () {
      var permissionChecks1 = { canAccess: function canAccess() {} };
      var permissionChecks2 = { canAccess: function canAccess() {} };
      var routes = [{}, permissionChecks1, {}, permissionChecks2];
      var result = mapStateToProps(null, { routes: routes });
      (0, _chai.expect)(result.permissionChecks).to.eql([permissionChecks1, permissionChecks2]);
    });

    it('returns permissionChecks as an array with one route ' + 'if there is only one that has a canAccess()', function () {
      var permissionChecks1 = { canAccess: function canAccess() {} };
      var routes = [{}, permissionChecks1, {}];
      var result = mapStateToProps(null, { routes: routes });
      (0, _chai.expect)(result.permissionChecks).to.eql([permissionChecks1]);
    });

    it('throws if permissionChecks has a canAccess property that is not a function', function () {
      var permissionChecks = { canAccess: '' };
      var routes = [{}, permissionChecks, {}];
      (0, _chai.expect)(function () {
        return mapStateToProps(null, { routes: routes });
      }).to.throw();
    });

    it('returns permissionChecks as an empty array if no route has canAccess()', function () {
      (0, _chai.expect)(mapStateToProps(null, { routes: [{}, {}, {}] }).permissionChecks).to.eql([]);
    });
  });
});
//# sourceMappingURL=spec.js.map
