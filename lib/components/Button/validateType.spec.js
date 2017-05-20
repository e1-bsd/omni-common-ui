'use strict';

var _chai = require('chai');

var _type = require('./type');

describe('Button', function () {
  describe('validateType', function () {
    it('accepts default', function () {
      (0, _chai.expect)((0, _type.validateType)(_type.Type.default)).to.be.true;
    });

    it('accepts primary', function () {
      (0, _chai.expect)((0, _type.validateType)(_type.Type.primary)).to.be.true;
    });

    it('accepts defaultInverse', function () {
      (0, _chai.expect)((0, _type.validateType)(_type.Type.defaultInverse)).to.be.true;
    });

    it('accepts primaryInverse', function () {
      (0, _chai.expect)((0, _type.validateType)(_type.Type.primaryInverse)).to.be.true;
    });

    it('throws error if invalid type is passed', function () {
      (0, _chai.expect)(function () {
        return (0, _type.validateType)('faketype');
      }).to.throw();
    });
  });
});
//# sourceMappingURL=validateType.spec.js.map
