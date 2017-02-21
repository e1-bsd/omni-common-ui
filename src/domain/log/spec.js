import Sinon from 'sinon';
import { expect } from 'chai';

describe('log', () => {
  /* eslint-disable no-console */
  let Raven;

  // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
  const getLog = () => require('inject?raven-js!./')({
    'raven-js': Raven,
  }).default;

  beforeEach(() => {
    Raven = {
      captureBreadcrumb: Sinon.spy(),
      captureException: Sinon.spy(),
      captureMessage: Sinon.spy(),
    };
    Sinon.spy(console, 'debug');
    Sinon.spy(console, 'error');
    Sinon.spy(console, 'info');
    Sinon.spy(console, 'log');
    Sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.debug.restore();
    console.error.restore();
    console.info.restore();
    console.log.restore();
    console.warn.restore();
  });

  testDefault('debug', 'info');
  testDefault('info', 'info');
  testDefault('log', 'info');
  testDefault('warn', 'warn');

  describe('#error()', () => {
    it('calls console.error', () => {
      getLog().error('hey');
      expect(console.error.args).to.eql([['hey']]);
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

  function testDefault(functionName, level) {
    describe(`#${functionName}()`, () => {
      it(`calls console.${functionName} and Raven.captureBreadcrumb with level ${level}`, () => {
        getLog()[functionName]('hey');
        expect(console[functionName].args).to.eql([['hey']]);
        expect(Raven.captureBreadcrumb.args).to.eql([[{ message: 'hey', level }]]);
      });
    });
  }
  /* eslint-enable no-console */
});
