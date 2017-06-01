'use strict';

var _ = require('./');

var _chai = require('chai');

describe('ApiResponse', function () {
  describe('#fetchWasCalled()', function () {
    it('returns false for a default ApiResponse', function () {
      (0, _chai.expect)(new _.ApiResponse().fetchWasCalled()).to.be.false;
    });

    it('returns true for an ApiResponse with loading=true', function () {
      (0, _chai.expect)(new _.ApiResponse({ loading: true }).fetchWasCalled()).to.be.true;
    });

    it('returns true for an ApiResponse with a data property different from undefined', function () {
      (0, _chai.expect)(new _.ApiResponse({ data: null }).fetchWasCalled()).to.be.true;
    });

    it('returns true for an ApiResponse with a error being an instance of Error', function () {
      (0, _chai.expect)(new _.ApiResponse({ error: new Error() }).fetchWasCalled()).to.be.true;
    });
  });

  describe('#shouldFetch()', function () {
    it('returns true for a default ApiResponse', function () {
      (0, _chai.expect)(new _.ApiResponse().shouldFetch()).to.be.true;
    });

    it('returns false for an ApiResponse with loading=true', function () {
      (0, _chai.expect)(new _.ApiResponse({ loading: true }).shouldFetch()).to.be.false;
    });

    it('returns false for an ApiResponse with a data property different from undefined', function () {
      (0, _chai.expect)(new _.ApiResponse({ data: null }).shouldFetch()).to.be.false;
    });

    it('returns false for an ApiResponse with a error being an instance of Error', function () {
      (0, _chai.expect)(new _.ApiResponse({ error: new Error() }).shouldFetch()).to.be.false;
    });
  });

  describe('#isLoading()', function () {
    it('returns false if the ApiResponse\'s loading property is not true', function () {
      (0, _chai.expect)(new _.ApiResponse({ loading: 20 }).isLoading()).to.be.false;
    });

    it('returns true if the ApiResponse\'s loading=true', function () {
      (0, _chai.expect)(new _.ApiResponse({ loading: true }).isLoading()).to.be.true;
    });
  });

  describe('#hasFailed()', function () {
    it('returns false if the ApiResponse\'s error property is not an Error', function () {
      (0, _chai.expect)(new _.ApiResponse({ error: 20 }).hasFailed()).to.be.false;
    });

    it('returns true if the ApiResponse\'s error=true', function () {
      (0, _chai.expect)(new _.ApiResponse({ error: new Error() }).hasFailed()).to.be.true;
    });
  });

  describe('#hasSucceeded()', function () {
    it('returns true if the ApiResponse\'s data property is not undefined', function () {
      (0, _chai.expect)(new _.ApiResponse({ data: null }).hasSucceeded()).to.be.true;
    });
  });
});
//# sourceMappingURL=spec.js.map
