'use strict';

var _chai = require('chai');

var _type = require('./type');

describe('Button', function () {
  describe('Type', function () {
    it('has default', function () {
      (0, _chai.expect)(_type.Type.default).to.exist;
    });

    it('has primary', function () {
      (0, _chai.expect)(_type.Type.primary).to.exist;
    });

    it('has defaultInverse', function () {
      (0, _chai.expect)(_type.Type.defaultInverse).to.exist;
    });

    it('has primaryInverse', function () {
      (0, _chai.expect)(_type.Type.primaryInverse).to.exist;
    });
  });
});
//# sourceMappingURL=type.spec.js.map
