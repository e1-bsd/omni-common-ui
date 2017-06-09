import { Type, validateType } from './type';

test('accepts default', () => {
  expect(validateType(Type.default)).toBe(true);
});

test('accepts primary', () => {
  expect(validateType(Type.primary)).toBe(true);
});

test('accepts defaultInverse', () => {
  expect(validateType(Type.defaultInverse)).toBe(true);
});

test('accepts primaryInverse', () => {
  expect(validateType(Type.primaryInverse)).toBe(true);
});

test('throws error if invalid type is passed', () => {
  expect(() => validateType('faketype')).toThrowError();
});
