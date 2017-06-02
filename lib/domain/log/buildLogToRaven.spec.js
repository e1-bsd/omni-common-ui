'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('log', function () {
  var Raven = void 0;
  var sprintf = void 0;
  var buildLogToRaven = void 0;

  // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
  var getBuildLogToRaven = function getBuildLogToRaven() {
    return require('inject-loader?raven-js&sprintf-js!./buildLogToRaven')({
      'raven-js': Raven,
      'sprintf-js': { sprintf: sprintf }
    }).default;
  };

  beforeEach(function () {
    Raven = {
      captureBreadcrumb: _sinon2.default.spy(),
      captureException: _sinon2.default.spy(),
      captureMessage: _sinon2.default.spy()
    };
    sprintf = _sinon2.default.spy();
    buildLogToRaven = getBuildLogToRaven();
  });

  describe('#buildLogToRaven()()', function () {
    var log = void 0;

    context('when level is "error"', function () {
      beforeEach(function () {
        log = buildLogToRaven('error');
      });

      context('when not passed an error', function () {
        it('calls Raven.captureMessage()', function () {
          log();
          (0, _chai.expect)(Raven.captureMessage.called).to.be.true;
        });

        it('sets level as "error"', function () {
          log();
          (0, _chai.expect)(Raven.captureMessage.args[0][1]).to.eql({ level: 'error' });
        });
      });

      context('when passed an error', function () {
        var error = void 0;

        beforeEach(function () {
          error = new Error();
          log(error);
        });

        it('calls Raven.captureException()', function () {
          (0, _chai.expect)(Raven.captureException.called).to.be.true;
        });

        it('sets level as "error"', function () {
          (0, _chai.expect)(Raven.captureException.args[0][1]).to.eql({ level: 'error' });
        });

        it('ignores all arguments except the first one', function () {
          (0, _chai.expect)(Raven.captureException.args[0]).to.eql([error, { level: 'error' }]);
        });
      });
    });

    context('when level is "warn"', function () {
      beforeEach(function () {
        log = buildLogToRaven('warn');
      });

      it('calls Raven.captureBreadcrumb()', function () {
        log();
        (0, _chai.expect)(Raven.captureBreadcrumb.called).to.be.true;
      });

      it('sets level as "warn"', function () {
        log();
        (0, _chai.expect)(Raven.captureBreadcrumb.args[0][0]).to.eql({ message: '', level: 'warn' });
      });

      context('when not using C-style format strings', function () {
        it('does not call sprintf', function () {
          log('some normal string');
          (0, _chai.expect)(sprintf.called).to.be.false;
        });

        it('concatenates all provided parameters', function () {
          log('1', 2, '3');
          (0, _chai.expect)(Raven.captureBreadcrumb.args[0][0].message).to.equal('1 2 3');
        });

        it('uses the whole stack of Errors', function () {
          var error = new Error();
          log('1', error, '3');
          (0, _chai.expect)(Raven.captureBreadcrumb.args[0][0].message).to.equal('1 ' + error.stack + ' 3');
        });
      });

      context('when using C-style format strings', function () {
        it('calls sprintf', function () {
          log('some formatted %s string');
          (0, _chai.expect)(sprintf.called).to.be.true;
        });

        it('uses the whole stack of Errors', function () {
          var error = new Error();
          log('1 %s 3', error);
          (0, _chai.expect)(sprintf.args[0]).to.eql(['1 %s 3', error.stack]);
        });
      });
    });

    context('when level is not "error" or "warn"', function () {
      beforeEach(function () {
        log = buildLogToRaven('whatever');
      });

      it('calls Raven.captureBreadcrumb()', function () {
        log();
        (0, _chai.expect)(Raven.captureBreadcrumb.called).to.be.true;
      });

      it('sets level as "info"', function () {
        log();
        (0, _chai.expect)(Raven.captureBreadcrumb.args[0][0]).to.eql({ message: '', level: 'info' });
      });
    });
  });
});
//# sourceMappingURL=buildLogToRaven.spec.js.map
