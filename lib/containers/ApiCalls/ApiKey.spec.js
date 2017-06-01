'use strict';

var _chai = require('chai');

var _ApiKey = require('./ApiKey');

var _ApiKey2 = _interopRequireDefault(_ApiKey);

var _ApiAction = require('./ApiAction');

var _ApiAction2 = _interopRequireDefault(_ApiAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ApiCall', function () {
  describe('ApiKey', function () {
    describe('#create()', function () {
      it('accepts an ApiAction as an argument', function () {
        var apiAction = _ApiAction2.default.create({ type: 'CALL_REQUEST', method: 'get', url: '/path' });
        var key = _ApiKey2.default.create(apiAction);
        (0, _chai.expect)(key).to.equal('GET /path');
      });

      it('throws if not passed an ApiAction or an object', function () {
        (0, _chai.expect)(function () {
          return _ApiKey2.default.create('');
        }).to.throw();
      });

      context('when passed a normal object', function () {
        it('throws if the object does not contain a method property of type string', function () {
          (0, _chai.expect)(function () {
            return _ApiKey2.default.create({ method: 1, url: '' });
          }).to.throw();
        });

        it('throws if the object does not contain a url property of type string', function () {
          (0, _chai.expect)(function () {
            return _ApiKey2.default.create({ method: 'get', url: {} });
          }).to.throw();
        });

        it('accepts an object with two arguments (method, url) as an argument', function () {
          var key = _ApiKey2.default.create({ method: 'GET', url: '/path' });
          (0, _chai.expect)(key).to.equal('GET /path');
        });

        it('converts the method to upper case', function () {
          var key = _ApiKey2.default.create({ method: 'get', url: '/path' });
          (0, _chai.expect)(key).to.equal('GET /path');
        });

        it('converts the path to lower case', function () {
          var key = _ApiKey2.default.create({ method: 'GET', url: '/Path' });
          (0, _chai.expect)(key).to.equal('GET /path');
        });
      });
    });
  });
});
//# sourceMappingURL=ApiKey.spec.js.map
