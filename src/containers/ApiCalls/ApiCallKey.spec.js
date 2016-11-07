import { expect } from 'chai';
import ApiCallKey from './ApiCallKey';

describe('ApiCallKey', () => {
  describe('#create()', () => {
    it('accepts an object { type, id } as an argument', () => {
      const key = ApiCallKey.create({ type: 'type', id: 'id' });
      expect(key.id).to.equal('id');
      expect(key.type).to.equal('type');
    });

    it('accepts an object two arguments (type, id)', () => {
      const key = ApiCallKey.create('type', 'id');
      expect(key.id).to.equal('id');
      expect(key.type).to.equal('type');
    });
  });
});
