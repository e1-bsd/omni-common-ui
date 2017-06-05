import { Type } from './type';

describe('Button', () => {
  describe('Type', () => {
    it('has default', () => {
      expect(Type.default).toBeDefined();
    });

    it('has primary', () => {
      expect(Type.primary).toBeDefined();
    });

    it('has defaultInverse', () => {
      expect(Type.defaultInverse).toBeDefined();
    });

    it('has primaryInverse', () => {
      expect(Type.primaryInverse).toBeDefined();
    });
  });
});
