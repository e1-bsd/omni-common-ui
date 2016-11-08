import { expect } from 'chai';
import { Type } from './type';

describe('Button', () => {
  describe('Type', () => {
    it('has default', () => {
      expect(Type.default).to.exist;
    });

    it('has primary', () => {
      expect(Type.primary).to.exist;
    });

    it('has defaultInverse', () => {
      expect(Type.defaultInverse).to.exist;
    });

    it('has primaryInverse', () => {
      expect(Type.primaryInverse).to.exist;
    });
  });
});
