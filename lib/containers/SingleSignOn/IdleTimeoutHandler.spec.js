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

describe('<IdleTimeoutHandler />', function () {
  var IdleTimeoutHandler = void 0;
  var signoutRedirect = void 0;

  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  var requireComponent = function requireComponent(Config) {
    return require('inject-loader?domain/Config&./userManager!./IdleTimeoutHandler')({
      'domain/Config': _Config3.default.merge(Config),
      './userManager': _userManager2.default
    }).default;
  };

  var mountComponent = function mountComponent() {
    return (0, _enzyme.mount)(_react2.default.createElement(
      IdleTimeoutHandler,
      null,
      _react2.default.createElement('div', { id: 'inner' })
    ));
  };

  beforeEach(function () {
    signoutRedirect = _sinon2.default.stub(_userManager2.default, 'signoutRedirect');
    signoutRedirect.returns();
    IdleTimeoutHandler = requireComponent({ autoSignOutTimeout: false });
  });

  afterEach(function () {
    signoutRedirect.restore();
  });

  context('when autoSignOutTimeout is false', function () {
    it('does not call userManager.signoutRedirect()', function test(done) {
      this.timeout(5000);
      mountComponent();
      setTimeout(function () {
        (0, _chai.expect)(signoutRedirect.called).to.be.false;
        done();
      }, 2000);
    });

    it('renders its children', function () {
      var wrapper = mountComponent();
      (0, _chai.expect)(wrapper).to.have.descendants('#inner');
    });
  });

  context('when autoSignOutTimeout is a number', function () {
    beforeEach(function () {
      IdleTimeoutHandler = requireComponent({ autoSignOutTimeout: 2 });
    });

    it('calls userManager.signoutRedirect() after the seconds set in autoSignOutTimeout', function test(done) {
      this.timeout(5000);
      mountComponent();
      setTimeout(function () {
        (0, _chai.expect)(signoutRedirect.called).to.be.true;
        done();
      }, 2000);
    });

    it('does not call userManager.signoutRedirect() after the seconds set in autoSignOutTimeout ' + 'if there are some user interactions happening', function test(done) {
      this.timeout(5000);
      mountComponent();
      setTimeout(function () {
        return window.document.dispatchEvent(new Event('click'));
      }, 1000);
      setTimeout(function () {
        (0, _chai.expect)(signoutRedirect.called).to.be.false;
        done();
      }, 2000);
    });

    it('renders its children', function () {
      var wrapper = mountComponent();
      (0, _chai.expect)(wrapper).to.have.descendants('#inner');
    });
  });
});
//# sourceMappingURL=IdleTimeoutHandler.spec.js.map
