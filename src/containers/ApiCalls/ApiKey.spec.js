import { expect } from 'chai';
import ApiKey from './ApiKey';
import ApiAction from './ApiAction';

describe('ApiCall', () => {
  describe('ApiKey', () => {
    describe('#create()', () => {
      it('accepts an ApiAction as an argument', () => {
        const apiAction = ApiAction.create({ type: 'CALL_REQUEST', method: 'get', url: '/path' });
        const key = ApiKey.create(apiAction);
        expect(key).to.equal('GET /path');
      });

      it('throws if not passed an ApiAction or an object', () => {
        expect(() => ApiKey.create('')).to.throw();
      });

      context('when passed a normal object', () => {
        it('throws if the object does not contain a method property of type string', () => {
          expect(() => ApiKey.create({ method: 1, url: '' })).to.throw();
        });

        it('throws if the object does not contain a url property of type string', () => {
          expect(() => ApiKey.create({ method: 'get', url: {} })).to.throw();
        });

        it('accepts an object with two arguments (method, url) as an argument', () => {
          const key = ApiKey.create({ method: 'GET', url: '/path' });
          expect(key).to.equal('GET /path');
        });

        it('converts the method to upper case', () => {
          const key = ApiKey.create({ method: 'get', url: '/path' });
          expect(key).to.equal('GET /path');
        });

        it('converts the path to lower case', () => {
          const key = ApiKey.create({ method: 'GET', url: '/Path' });
          expect(key).to.equal('GET /path');
        });
      });
    });
  });
});
