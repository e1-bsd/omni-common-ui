import { expect } from 'chai';
import { Type } from './';

describe('Button', () => {
  describe('Type', () => {
    it('has default', () => {
      expect(Type.default).to.exist;
    });

    it('has primary', () => {
      expect(Type.primary).to.exist;
    });

    it('has primaryInverse', () => {
      expect(Type.primaryInverse).to.exist;
    });
  });
});
