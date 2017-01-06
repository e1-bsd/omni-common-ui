import Sinon from 'sinon';
import { expect } from 'chai';

describe('log', () => {
  let Raven;
  let loglevel;

  // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
  const getLog = () => require('inject?raven-js&loglevel!./')({
    'raven-js': Raven,
    loglevel,
  }).default;

  beforeEach(() => {
    Raven = {
      captureBreadcrumb: Sinon.spy(),
      captureException: Sinon.spy(),
      captureMessage: Sinon.spy(),
    };
    loglevel = {
      trace: Sinon.spy(),
      debug: Sinon.spy(),
      info: Sinon.spy(),
      warn: Sinon.spy(),
      error: Sinon.spy(),
    };
  });

  describe('#trace()', () => {
    it('just calls loglevel.trace', () => {
      Raven = undefined;
      expect(() => getLog().trace('hey')).to.not.throw();
      expect(loglevel.trace.args).to.eql([['hey']]);
    });
  });

  testDefault('debug');
  testDefault('info');
  testDefault('warn');

  describe('#error()', () => {
    it('calls loglevel.error', () => {
      getLog().error('hey');
      expect(loglevel.error.args).to.eql([['hey']]);
    });

    it('calls Raven.captureException if the parameter is an Error', () => {
      const error = new Error();
      getLog().error(error);
      expect(Raven.captureException.args).to.eql([[error, { level: 'error' }]]);
    });

    it('calls Raven.captureMessage if the parameter is not an Error', () => {
      const error = 'some error';
      getLog().error(error);
      expect(Raven.captureMessage.args).to.eql([[error, { level: 'error' }]]);
    });
  });

  function testDefault(functionName) {
    describe(`#${functionName}()`, () => {
      it(`calls loglevel.${functionName} and Raven.captureBreadcrumb`, () => {
        getLog()[functionName]('hey');
        expect(loglevel[functionName].args).to.eql([['hey']]);
        expect(Raven.captureBreadcrumb.args).to.eql([[{ message: 'hey', level: functionName }]]);
      });
    });
  }
});
