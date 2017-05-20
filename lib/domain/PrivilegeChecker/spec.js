'use strict';

var _chai = require('chai');

var _Config2 = require('./../Config');

var _Config3 = _interopRequireDefault(_Config2);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-webpack-loader-syntax, global-require
var requireChecker = function requireChecker(Config) {
  return require('inject?domain/Config!./')({
    'domain/Config': _Config3.default.merge(Config)
  }).default;
};

describe('PrivilegeChecker', function () {
  var PrivilegeChecker = void 0;
  var state = void 0;

  beforeEach(function () {
    state = new _immutable.Map({ privileges: { items: new _immutable.List(['pr1', 'pr2', 'PREFIX_pr3']) } });
    PrivilegeChecker = requireChecker({ featureLogin: true });
  });

  it('returns false if the privilege is not a string', function () {
    (0, _chai.expect)(PrivilegeChecker.hasPrivilege(state, 1)).to.be.false;
  });

  it('throws if something else rather than a Map is provided as a state', function () {
    (0, _chai.expect)(function () {
      return PrivilegeChecker.hasPrivilege({}, '');
    }).to.throw;
  });

  it('returns false if the state is malformed', function () {
    (0, _chai.expect)(PrivilegeChecker.hasPrivilege((0, _immutable.Map)(), 'pr1')).to.be.false;
    (0, _chai.expect)(PrivilegeChecker.hasPrivilege((0, _immutable.Map)({ privileges: null }), 'pr1')).to.be.false;
    (0, _chai.expect)(PrivilegeChecker.hasPrivilege((0, _immutable.Map)({ privileges: (0, _immutable.Map)() }), 'pr1')).to.be.false;
  });

  it('returns true if the privilege is found in the privilege list', function () {
    (0, _chai.expect)(PrivilegeChecker.hasPrivilege(state, 'pr1')).to.be.true;
  });

  it('returns true even if the privilege is provided with a different case', function () {
    (0, _chai.expect)(PrivilegeChecker.hasPrivilege(state, 'PR1')).to.be.true;
  });

  it('returns true if there is a privilege in the list that ends with the provided string', function () {
    (0, _chai.expect)(PrivilegeChecker.hasPrivilege(state, 'pr3')).to.be.true;
  });

  context('when featureLogin is not true', function () {
    beforeEach(function () {
      PrivilegeChecker = requireChecker({ featureLogin: false });
    });

    it('returns true', function () {
      (0, _chai.expect)(PrivilegeChecker.hasPrivilege()).to.be.true;
    });
  });
});
//# sourceMappingURL=spec.js.map
