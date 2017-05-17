import { expect } from 'chai';
import log from './';

describe('log', () => {
  it('is a class', () => {
    expect(log.prototype).to.exist;
  });

  testMethod('error');
  testMethod('info');
  testMethod('log');
  testMethod('warn');
  testMethod('debug');

  it('does not crash if there is no "console"', () => {
    const originalConsole = window.console;
    delete window.console;

    expect(() => log.debug('some text')).to.not.throw();

    window.console = originalConsole;
  });

  function testMethod(method) {
    it(`has a "${method}" method`, () => {
      expect(log[method]).to.be.a('function');
    });
  }
});
