'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _userManager = require('./userManager');

var _userManager2 = _interopRequireDefault(_userManager);

var _Config2 = require('./../../domain/Config');

var _Config3 = _interopRequireDefault(_Config2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<SingleSignOnHandler />', function () {
  var SingleSignOnHandler = void 0;
  var props = void 0;
  var signinRedirect = void 0;

  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  var requireComponent = function requireComponent(Config) {
    return require('inject-loader?domain/Config&./userManager!./SingleSignOnHandler')({
      'domain/Config': _Config3.default.merge(Config),
      './userManager': _userManager2.default
    }).SingleSignOnHandler;
  };

  var mountComponent = function mountComponent() {
    return (0, _enzyme.mount)(_react2.default.createElement(
      SingleSignOnHandler,
      props,
      _react2.default.createElement('div', { id: 'inner' })
    ));
  };

  beforeEach(function () {
    signinRedirect = _sinon2.default.stub(_userManager2.default, 'signinRedirectWithValidation');
    signinRedirect.returns();
    SingleSignOnHandler = requireComponent({ featureLogin: false });
    props = {
      fetchPrivilegesIfNeeded: _sinon2.default.spy(),
      user: {
        expired: false,
        profile: {
          sub: '123'
        }
      }
    };
  });

  afterEach(function () {
    signinRedirect.restore();
  });

  context('when featureLogin is false', function () {
    it('does not call userManager.signinRedirect() even if the user is not valid', function () {
      props.user = null;
      mountComponent();
      (0, _chai.expect)(signinRedirect.called).to.be.false;
    });

    it('does not call userManager.signinRedirect() even if the user is expired', function () {
      props.user.expired = true;
      mountComponent();
      (0, _chai.expect)(signinRedirect.called).to.be.false;
    });

    it('does not call fetchPrivilegesIfNeeded even if the user is fine', function () {
      mountComponent();
      (0, _chai.expect)(props.fetchPrivilegesIfNeeded.called).to.be.false;
    });

    it('renders its children if the user is fine', function () {
      var wrapper = mountComponent();
      (0, _chai.expect)(wrapper).to.have.descendants('#inner');
    });

    it('renders its children even if the user is not valid', function () {
      props.user = null;
      var wrapper = mountComponent();
      (0, _chai.expect)(wrapper).to.have.descendants('#inner');
    });
  });

  context('when featureLogin is true', function () {
    beforeEach(function () {
      SingleSignOnHandler = requireComponent({ featureLogin: true });
    });

    it('calls userManager.signinRedirect() if the user is not valid', function () {
      props.user = null;
      mountComponent();
      (0, _chai.expect)(signinRedirect.called).to.be.true;
    });

    it('calls userManager.signinRedirect() if the user is expired', function () {
      props.user.expired = true;
      mountComponent();
      (0, _chai.expect)(signinRedirect.called).to.be.true;
    });

    it('calls fetchPrivilegesIfNeeded if the user is fine', function () {
      mountComponent();
      (0, _chai.expect)(props.fetchPrivilegesIfNeeded.called).to.be.true;
    });

    it('renders its children if the user is fine', function () {
      var wrapper = mountComponent();
      (0, _chai.expect)(wrapper).to.have.descendants('#inner');
    });

    it('does not render its children if the user is not valid', function () {
      props.user = null;
      var wrapper = mountComponent();
      (0, _chai.expect)(wrapper).to.not.have.descendants('#inner');
    });
  });
});
//# sourceMappingURL=SingleSignOnHandler.spec.js.map
