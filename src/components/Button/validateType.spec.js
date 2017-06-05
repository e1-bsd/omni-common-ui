import { Type, validateType } from './type';

describe('Button', () => {
  describe('validateType', () => {
    it('accepts default', () => {
      expect(validateType(Type.default)).toBe(true);
    });

    it('accepts primary', () => {
      expect(validateType(Type.primary)).toBe(true);
    });

    it('accepts defaultInverse', () => {
      expect(validateType(Type.defaultInverse)).toBe(true);
    });

    it('accepts primaryInverse', () => {
      expect(validateType(Type.primaryInverse)).toBe(true);
    });

    it('throws error if invalid type is passed', () => {
      expect(() => validateType('faketype')).toThrowError();
    });
  });
});
