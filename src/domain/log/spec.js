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

  function testMethod(method) {
    it(`has a "${method}" method`, () => {
      expect(log[method]).to.be.a('function');
    });
  }
});
