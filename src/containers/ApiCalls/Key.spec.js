import { expect } from 'chai';
import ApiCall from './';

const { Key } = ApiCall;

describe('ApiCall', () => {
  describe('Key', () => {
    describe('#create()', () => {
      it('accepts an object { type, id } as an argument', () => {
        const key = Key.create({ type: 'type', id: 'id' });
        expect(key.id).to.equal('id');
        expect(key.type).to.equal('type');
      });

      it('accepts an object two arguments (type, id)', () => {
        const key = Key.create('type', 'id');
        expect(key.id).to.equal('id');
        expect(key.type).to.equal('type');
      });
    });
  });
});
