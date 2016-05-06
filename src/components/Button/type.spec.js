import { expect } from 'chai';
import { Type } from './';

describe('Button', () => {
  describe('Type', () => {
    it('has default', () => {
      expect(Type.default).to.exist;
    });

    it('has danger', () => {
      expect(Type.danger).to.exist;
    });
  });
});
