import Sinon from 'sinon';
import { expect } from 'chai';

describe('log', () => {
  let Raven;
  let sprintf;
  let buildLogToRaven;

  // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
  const getBuildLogToRaven = () => require('inject-loader?raven-js&sprintf-js!./buildLogToRaven')({
    'raven-js': Raven,
    'sprintf-js': { sprintf },
  }).default;

  beforeEach(() => {
    Raven = {
      captureBreadcrumb: Sinon.spy(),
      captureException: Sinon.spy(),
      captureMessage: Sinon.spy(),
    };
    sprintf = Sinon.spy();
    buildLogToRaven = getBuildLogToRaven();
  });

  describe('#buildLogToRaven()()', () => {
    let log;

    context('when level is "error"', () => {
      beforeEach(() => {
        log = buildLogToRaven('error');
      });

      context('when not passed an error', () => {
        it('calls Raven.captureMessage()', () => {
          log();
          expect(Raven.captureMessage.called).to.be.true;
        });

        it('sets level as "error"', () => {
          log();
          expect(Raven.captureMessage.args[0][1]).to.eql({ level: 'error' });
        });
      });

      context('when passed an error', () => {
        let error;

        beforeEach(() => {
          error = new Error();
          log(error);
        });

        it('calls Raven.captureException()', () => {
          expect(Raven.captureException.called).to.be.true;
        });

        it('sets level as "error"', () => {
          expect(Raven.captureException.args[0][1]).to.eql({ level: 'error' });
        });

        it('ignores all arguments except the first one', () => {
          expect(Raven.captureException.args[0]).to.eql([error, { level: 'error' }]);
        });
      });
    });

    context('when level is "warn"', () => {
      beforeEach(() => {
        log = buildLogToRaven('warn');
      });

      it('calls Raven.captureBreadcrumb()', () => {
        log();
        expect(Raven.captureBreadcrumb.called).to.be.true;
      });

      it('sets level as "warn"', () => {
        log();
        expect(Raven.captureBreadcrumb.args[0][0]).to.eql({ message: '', level: 'warn' });
      });

      context('when not using C-style format strings', () => {
        it('does not call sprintf', () => {
          log('some normal string');
          expect(sprintf.called).to.be.false;
        });

        it('concatenates all provided parameters', () => {
          log('1', 2, '3');
          expect(Raven.captureBreadcrumb.args[0][0].message).to.equal('1 2 3');
        });

        it('uses the whole stack of Errors', () => {
          const error = new Error();
          log('1', error, '3');
          expect(Raven.captureBreadcrumb.args[0][0].message).to.equal(`1 ${error.stack} 3`);
        });
      });

      context('when using C-style format strings', () => {
        it('calls sprintf', () => {
          log('some formatted %s string');
          expect(sprintf.called).to.be.true;
        });

        it('uses the whole stack of Errors', () => {
          const error = new Error();
          log('1 %s 3', error);
          expect(sprintf.args[0]).to.eql(['1 %s 3', error.stack]);
        });
      });
    });

    context('when level is not "error" or "warn"', () => {
      beforeEach(() => {
        log = buildLogToRaven('whatever');
      });

      it('calls Raven.captureBreadcrumb()', () => {
        log();
        expect(Raven.captureBreadcrumb.called).to.be.true;
      });

      it('sets level as "info"', () => {
        log();
        expect(Raven.captureBreadcrumb.args[0][0]).to.eql({ message: '', level: 'info' });
      });
    });
  });
});
