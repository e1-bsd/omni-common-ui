import ApiKey from './ApiKey';
import ApiAction from './ApiAction';

describe('ApiCall', () => {
  describe('ApiKey', () => {
    describe('#create()', () => {
      test('accepts an ApiAction as an argument', () => {
        const apiAction = ApiAction.create({ type: 'CALL_REQUEST', method: 'get', url: '/path' });
        const key = ApiKey.create(apiAction);
        expect(key).toBe('GET /path');
      });

      test('throws if not passed an ApiAction or an object', () => {
        expect(() => ApiKey.create('')).toThrowError();
      });

      describe('when passed a normal object', () => {
        test('throws if the object does not contain a method property of type string', () => {
          expect(() => ApiKey.create({ method: 1, url: '' })).toThrowError();
        });

        test('throws if the object does not contain a url property of type string', () => {
          expect(() => ApiKey.create({ method: 'get', url: {} })).toThrowError();
        });

        test('accepts an object with two arguments (method, url) as an argument', () => {
          const key = ApiKey.create({ method: 'GET', url: '/path' });
          expect(key).toBe('GET /path');
        });

        test('converts the method to upper case', () => {
          const key = ApiKey.create({ method: 'get', url: '/path' });
          expect(key).toBe('GET /path');
        });

        test('converts the path to lower case', () => {
          const key = ApiKey.create({ method: 'GET', url: '/Path' });
          expect(key).toBe('GET /path');
        });
      });
    });
  });
});
