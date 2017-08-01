'use strict';

var _ApiKey = require('./ApiKey');

var _ApiKey2 = _interopRequireDefault(_ApiKey);

var _ApiAction = require('./ApiAction');

var _ApiAction2 = _interopRequireDefault(_ApiAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#create()', function () {
  test('accepts an ApiAction as an argument', function () {
    var apiAction = _ApiAction2.default.create({ type: 'CALL_REQUEST', method: 'get', url: '/path' });
    var key = _ApiKey2.default.create(apiAction);
    expect(key).toBe('GET /path');
  });

  test('throws if not passed an ApiAction or an object', function () {
    expect(function () {
      return _ApiKey2.default.create('');
    }).toThrowError();
  });

  describe('when passed a normal object', function () {
    test('throws if the object does not contain a method property of type string', function () {
      expect(function () {
        return _ApiKey2.default.create({ method: 1, url: '' });
      }).toThrowError();
    });

    test('throws if the object does not contain a url property of type string', function () {
      expect(function () {
        return _ApiKey2.default.create({ method: 'get', url: {} });
      }).toThrowError();
    });

    test('accepts an object with two arguments (method, url) as an argument', function () {
      var key = _ApiKey2.default.create({ method: 'GET', url: '/path' });
      expect(key).toBe('GET /path');
    });

    test('converts the method to upper case', function () {
      var key = _ApiKey2.default.create({ method: 'get', url: '/path' });
      expect(key).toBe('GET /path');
    });

    test('converts the path to lower case', function () {
      var key = _ApiKey2.default.create({ method: 'GET', url: '/Path' });
      expect(key).toBe('GET /path');
    });
  });
});
//# sourceMappingURL=ApiKey.spec.js.map
