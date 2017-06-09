import { Type } from './type';

test('has default', () => {
  expect(Type.default).toBeDefined();
});

test('has primary', () => {
  expect(Type.primary).toBeDefined();
});

test('has defaultInverse', () => {
  expect(Type.defaultInverse).toBeDefined();
});

test('has primaryInverse', () => {
  expect(Type.primaryInverse).toBeDefined();
});
