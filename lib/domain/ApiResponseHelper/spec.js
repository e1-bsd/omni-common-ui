'use strict';

var _ApiResponse = require('./../ApiResponse');

var _ = require('./');

var _chai = require('chai');

describe('ApiResponseHelper', function () {
  describe('#fetchWasCalled()', function () {
    it('returns false for any value that is not an object', function () {
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(undefined)).to.equal(false, 'undefined');
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(null)).to.equal(false, 'null');
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(1)).to.equal(false, 'number');
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled('test')).to.equal(false, 'string');
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(function () {})).to.equal(false, 'function');
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled([])).to.equal(false, 'array');
    });

    it('returns false for any object that is not an ApiResponse', function () {
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled({})).to.equal(false, 'empty object');
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled({ a: 'a' })).to.equal(false, 'other objects');
    });

    it('returns false for an object similar to ApiResponse', function () {
      var result = _.ApiResponseHelper.fetchWasCalled({ data: null, error: null, loading: null });
      (0, _chai.expect)(result).to.be.false;
    });

    it('returns false for a default ApiResponse', function () {
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse())).to.be.false;
    });

    it('returns true for an ApiResponse with loading=true', function () {
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse({ loading: true }))).to.be.true;
    });

    it('returns true for an ApiResponse with a data property different from undefined', function () {
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse({ data: null }))).to.be.true;
    });

    it('returns true for an ApiResponse with a error being an instance of Error', function () {
      (0, _chai.expect)(_.ApiResponseHelper.fetchWasCalled(new _ApiResponse.ApiResponse({ error: new Error() }))).to.be.true;
    });
  });

  describe('#shouldFetch()', function () {
    it('returns true for any value that is not an object', function () {
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(undefined)).to.equal(true, 'undefined');
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(null)).to.equal(true, 'null');
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(1)).to.equal(true, 'number');
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch('test')).to.equal(true, 'string');
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(function () {})).to.equal(true, 'function');
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch([])).to.equal(true, 'array');
    });

    it('returns true for any object that is not an ApiResponse', function () {
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch({})).to.equal(true, 'empty object');
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch({ a: 'a' })).to.equal(true, 'other objects');
    });

    it('returns true for an object similar to ApiResponse', function () {
      var result = _.ApiResponseHelper.shouldFetch({ data: null, error: null, loading: null });
      (0, _chai.expect)(result).to.be.true;
    });

    it('returns true for a default ApiResponse', function () {
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse())).to.be.true;
    });

    it('returns false for an ApiResponse with loading=true', function () {
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse({ loading: true }))).to.be.false;
    });

    it('returns false for an ApiResponse with a data property different from undefined', function () {
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse({ data: null }))).to.be.false;
    });

    it('returns false for an ApiResponse with a error being an instance of Error', function () {
      (0, _chai.expect)(_.ApiResponseHelper.shouldFetch(new _ApiResponse.ApiResponse({ error: new Error() }))).to.be.false;
    });
  });

  describe('#isLoading()', function () {
    it('returns false if apiResponse is not an ApiResponse', function () {
      (0, _chai.expect)(_.ApiResponseHelper.isLoading(undefined)).to.equal(false, 'undefined');
      (0, _chai.expect)(_.ApiResponseHelper.isLoading({ loading: true })).to.equal(false, 'object');
    });

    it('returns false if the ApiResponse\'s loading property is not true', function () {
      (0, _chai.expect)(_.ApiResponseHelper.isLoading(new _ApiResponse.ApiResponse({ loading: 20 }))).to.be.false;
    });

    it('returns true if the ApiResponse\'s loading=true', function () {
      (0, _chai.expect)(_.ApiResponseHelper.isLoading(new _ApiResponse.ApiResponse({ loading: true }))).to.be.true;
    });
  });

  describe('#hasFailed()', function () {
    it('returns false if apiResponse is not an ApiResponse', function () {
      (0, _chai.expect)(_.ApiResponseHelper.hasFailed(undefined)).to.equal(false, 'undefined');
      (0, _chai.expect)(_.ApiResponseHelper.hasFailed({ loading: true })).to.equal(false, 'object');
    });

    it('returns false if the ApiResponse\'s error property is not an Error', function () {
      (0, _chai.expect)(_.ApiResponseHelper.hasFailed(new _ApiResponse.ApiResponse({ error: 20 }))).to.be.false;
    });

    it('returns true if the ApiResponse\'s error=true', function () {
      (0, _chai.expect)(_.ApiResponseHelper.hasFailed(new _ApiResponse.ApiResponse({ error: new Error() }))).to.be.true;
    });
  });

  describe('#hasSucceeded()', function () {
    it('returns false if apiResponse is not an ApiResponse', function () {
      (0, _chai.expect)(_.ApiResponseHelper.hasSucceeded(undefined)).to.equal(false, 'undefined');
      (0, _chai.expect)(_.ApiResponseHelper.hasSucceeded({ loading: true })).to.equal(false, 'object');
    });

    it('returns true if the ApiResponse\'s data property is not undefined', function () {
      (0, _chai.expect)(_.ApiResponseHelper.hasSucceeded(new _ApiResponse.ApiResponse({ data: null }))).to.be.true;
    });
  });

  describe('#create', function () {
    it('returns the same ApiResponse if one is received', function () {
      var mock = new _ApiResponse.ApiResponse();
      (0, _chai.expect)(_.ApiResponseHelper.create(mock)).to.equal(mock);
    });

    it('returns an errored ApiResponse if passed an instance of Error', function () {
      var error = new Error();
      (0, _chai.expect)(_.ApiResponseHelper.create(error).error).to.equal(error);
    });

    it('returns an ApiResponse if passed undefined', function () {
      (0, _chai.expect)(_.ApiResponseHelper.create()).to.be.an.instanceof(_ApiResponse.ApiResponse);
    });

    it('returns a succeeded ApiResponse if any other value', function () {
      (0, _chai.expect)(_.ApiResponseHelper.create(null).data).to.be.null;
    });

    context('when received an object with just one key', function () {
      context('when the key is loading', function () {
        it('returns an ApiResponse with the value of loading', function () {
          (0, _chai.expect)(_.ApiResponseHelper.create({ loading: true }).loading).to.be.true;
          (0, _chai.expect)(_.ApiResponseHelper.create({ loading: false }).loading).to.be.false;
        });

        it('keeps as false any value other than true', function () {
          (0, _chai.expect)(_.ApiResponseHelper.create({ loading: 'hi!' }).loading).to.be.false;
        });

        it('returns a default ApiResponse if loading set to undefined', function () {
          var result = _.ApiResponseHelper.create({ loading: undefined });
          (0, _chai.expect)(result.loading).to.be.false;
          (0, _chai.expect)(result.error).to.be.undefined;
          (0, _chai.expect)(result.data).to.be.undefined;
        });
      });

      context('when the key is error', function () {
        it('returns an errored ApiResponse with the passed error' + ' if it is an instance of Error', function () {
          var error = new Error();
          (0, _chai.expect)(_.ApiResponseHelper.create({ error: error }).error).to.equal(error);
        });

        it('wraps the error in an Error instance if it is not already', function () {
          var _ApiResponseHelper$cr = _.ApiResponseHelper.create({ error: 'hi!' }),
              error = _ApiResponseHelper$cr.error;

          (0, _chai.expect)(error).to.be.an.instanceof(Error);
          (0, _chai.expect)(error.message).to.equal('hi!');
        });

        it('returns a default ApiResponse if error set to undefined', function () {
          var result = _.ApiResponseHelper.create({ error: undefined });
          (0, _chai.expect)(result.loading).to.be.false;
          (0, _chai.expect)(result.error).to.be.undefined;
          (0, _chai.expect)(result.data).to.be.undefined;
        });
      });

      context('when the key is data', function () {
        it('returns an ApiResponse with the provided data', function () {
          (0, _chai.expect)(_.ApiResponseHelper.create({ data: 'hi!' }).data).to.equal('hi!');
        });

        it('returns a default ApiResponse if data set to undefined', function () {
          var result = _.ApiResponseHelper.create({ data: undefined });
          (0, _chai.expect)(result.loading).to.be.false;
          (0, _chai.expect)(result.error).to.be.undefined;
          (0, _chai.expect)(result.data).to.be.undefined;
        });
      });

      context('when the key is any other', function () {
        it('returns an ApiResponse with the provided object', function () {
          var object = { someKey: 'hi!' };
          (0, _chai.expect)(_.ApiResponseHelper.create(object).data).to.equal(object);
        });
      });
    });
  });

  describe('#responsify', function () {
    it('is the same as #create()', function () {
      (0, _chai.expect)(_.ApiResponseHelper.responsify).to.equal(_.ApiResponseHelper.create);
    });
  });
});
//# sourceMappingURL=spec.js.map
