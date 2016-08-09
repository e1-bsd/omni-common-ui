import { ApiResponse } from 'domain/ApiResponse';
import { ApiResponseHelper } from './';
import { expect } from 'chai';

describe('ApiResponseHelper', () => {
  describe('#fetchWasCalled()', () => {
    it('returns false for any value that is not an object', () => {
      expect(ApiResponseHelper.fetchWasCalled(undefined)).to.equal(false, 'undefined');
      expect(ApiResponseHelper.fetchWasCalled(null)).to.equal(false, 'null');
      expect(ApiResponseHelper.fetchWasCalled(1)).to.equal(false, 'number');
      expect(ApiResponseHelper.fetchWasCalled('test')).to.equal(false, 'string');
      expect(ApiResponseHelper.fetchWasCalled(() => {})).to.equal(false, 'function');
      expect(ApiResponseHelper.fetchWasCalled([])).to.equal(false, 'array');
    });

    it('returns false for any object that is not an ApiResponse', () => {
      expect(ApiResponseHelper.fetchWasCalled({})).to.equal(false, 'empty object');
      expect(ApiResponseHelper.fetchWasCalled({ a: 'a' })).to.equal(false, 'other objects');
    });

    it('returns false for an object similar to ApiResponse', () => {
      const result = ApiResponseHelper.fetchWasCalled({ data: null, error: null, loading: null });
      expect(result).to.be.false;
    });

    it('returns false for a default ApiResponse', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse())).to.be.false;
    });

    it('returns true for an ApiResponse with loading=true', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse({ loading: true }))).to.be.true;
    });

    it('returns true for an ApiResponse with a data property different from undefined', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse({ data: null }))).to.be.true;
    });

    it('returns true for an ApiResponse with a error being an instance of Error', () => {
      expect(ApiResponseHelper.fetchWasCalled(new ApiResponse({ error: new Error() }))).to.be.true;
    });
  });

  describe('#shouldFetch()', () => {
    it('returns true for any value that is not an object', () => {
      expect(ApiResponseHelper.shouldFetch(undefined)).to.equal(true, 'undefined');
      expect(ApiResponseHelper.shouldFetch(null)).to.equal(true, 'null');
      expect(ApiResponseHelper.shouldFetch(1)).to.equal(true, 'number');
      expect(ApiResponseHelper.shouldFetch('test')).to.equal(true, 'string');
      expect(ApiResponseHelper.shouldFetch(() => {})).to.equal(true, 'function');
      expect(ApiResponseHelper.shouldFetch([])).to.equal(true, 'array');
    });

    it('returns true for any object that is not an ApiResponse', () => {
      expect(ApiResponseHelper.shouldFetch({})).to.equal(true, 'empty object');
      expect(ApiResponseHelper.shouldFetch({ a: 'a' })).to.equal(true, 'other objects');
    });

    it('returns true for an object similar to ApiResponse', () => {
      const result = ApiResponseHelper.shouldFetch({ data: null, error: null, loading: null });
      expect(result).to.be.true;
    });

    it('returns true for a default ApiResponse', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse())).to.be.true;
    });

    it('returns false for an ApiResponse with loading=true', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse({ loading: true }))).to.be.false;
    });

    it('returns false for an ApiResponse with a data property different from undefined', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse({ data: null }))).to.be.false;
    });

    it('returns false for an ApiResponse with a error being an instance of Error', () => {
      expect(ApiResponseHelper.shouldFetch(new ApiResponse({ error: new Error() }))).to.be.false;
    });
  });

  describe('#isLoading()', () => {
    it('returns false if apiResponse is not an ApiResponse', () => {
      expect(ApiResponseHelper.isLoading(undefined)).to.equal(false, 'undefined');
      expect(ApiResponseHelper.isLoading({ loading: true })).to.equal(false, 'object');
    });

    it('returns false if the ApiResponse\'s loading property is not true', () => {
      expect(ApiResponseHelper.isLoading(new ApiResponse({ loading: 20 }))).to.be.false;
    });

    it('returns true if the ApiResponse\'s loading=true', () => {
      expect(ApiResponseHelper.isLoading(new ApiResponse({ loading: true }))).to.be.true;
    });
  });

  describe('#hasFailed()', () => {
    it('returns false if apiResponse is not an ApiResponse', () => {
      expect(ApiResponseHelper.hasFailed(undefined)).to.equal(false, 'undefined');
      expect(ApiResponseHelper.hasFailed({ loading: true })).to.equal(false, 'object');
    });

    it('returns false if the ApiResponse\'s error property is not an Error', () => {
      expect(ApiResponseHelper.hasFailed(new ApiResponse({ error: 20 }))).to.be.false;
    });

    it('returns true if the ApiResponse\'s error=true', () => {
      expect(ApiResponseHelper.hasFailed(new ApiResponse({ error: new Error() }))).to.be.true;
    });
  });

  describe('#hasSucceeded()', () => {
    it('returns false if apiResponse is not an ApiResponse', () => {
      expect(ApiResponseHelper.hasSucceeded(undefined)).to.equal(false, 'undefined');
      expect(ApiResponseHelper.hasSucceeded({ loading: true })).to.equal(false, 'object');
    });

    it('returns true if the ApiResponse\'s data property is not undefined', () => {
      expect(ApiResponseHelper.hasSucceeded(new ApiResponse({ data: null }))).to.be.true;
    });
  });

  describe('#create', () => {
    it('returns the same ApiResponse if one is received', () => {
      const mock = new ApiResponse();
      expect(ApiResponseHelper.create(mock)).to.equal(mock);
    });

    it('returns an errored ApiResponse if passed an instance of Error', () => {
      const error = new Error();
      expect(ApiResponseHelper.create(error).error).to.equal(error);
    });

    it('returns an ApiResponse if passed undefined', () => {
      expect(ApiResponseHelper.create()).to.be.an.instanceof(ApiResponse);
    });

    it('returns a succeeded ApiResponse if any other value', () => {
      expect(ApiResponseHelper.create(null).data).to.be.null;
    });

    context('when received an object with just one key', () => {
      context('when the key is loading', () => {
        it('returns an ApiResponse with the value of loading', () => {
          expect(ApiResponseHelper.create({ loading: true }).loading).to.be.true;
          expect(ApiResponseHelper.create({ loading: false }).loading).to.be.false;
        });

        it('keeps as false any value other than true', () => {
          expect(ApiResponseHelper.create({ loading: 'hi!' }).loading).to.be.false;
        });

        it('returns a default ApiResponse if loading set to undefined', () => {
          const result = ApiResponseHelper.create({ loading: undefined });
          expect(result.loading).to.be.false;
          expect(result.error).to.be.undefined;
          expect(result.data).to.be.undefined;
        });
      });

      context('when the key is error', () => {
        it('returns an errored ApiResponse with the passed error' +
            ' if it is an instance of Error', () => {
          const error = new Error();
          expect(ApiResponseHelper.create({ error }).error).to.equal(error);
        });

        it('wraps the error in an Error instance if it is not already', () => {
          const { error } = ApiResponseHelper.create({ error: 'hi!' });
          expect(error).to.be.an.instanceof(Error);
          expect(error.message).to.equal('hi!');
        });

        it('returns a default ApiResponse if error set to undefined', () => {
          const result = ApiResponseHelper.create({ error: undefined });
          expect(result.loading).to.be.false;
          expect(result.error).to.be.undefined;
          expect(result.data).to.be.undefined;
        });
      });

      context('when the key is data', () => {
        it('returns an ApiResponse with the provided data', () => {
          expect(ApiResponseHelper.create({ data: 'hi!' }).data).to.equal('hi!');
        });

        it('returns a default ApiResponse if data set to undefined', () => {
          const result = ApiResponseHelper.create({ data: undefined });
          expect(result.loading).to.be.false;
          expect(result.error).to.be.undefined;
          expect(result.data).to.be.undefined;
        });
      });

      context('when the key is any other', () => {
        it('returns an ApiResponse with the provided object', () => {
          const object = { someKey: 'hi!' };
          expect(ApiResponseHelper.create(object).data).to.equal(object);
        });
      });
    });
  });

  describe('#responsify', () => {
    it('is the same as #create()', () => {
      expect(ApiResponseHelper.responsify).to.equal(ApiResponseHelper.create);
    });
  });
});
