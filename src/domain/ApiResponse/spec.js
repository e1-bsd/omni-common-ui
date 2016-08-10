import { ApiResponse } from './';
import { expect } from 'chai';

describe('ApiResponse', () => {
  describe('#fetchWasCalled()', () => {
    it('returns false for a default ApiResponse', () => {
      expect(new ApiResponse().fetchWasCalled()).to.be.false;
    });

    it('returns true for an ApiResponse with loading=true', () => {
      expect(new ApiResponse({ loading: true }).fetchWasCalled()).to.be.true;
    });

    it('returns true for an ApiResponse with a data property different from undefined', () => {
      expect(new ApiResponse({ data: null }).fetchWasCalled()).to.be.true;
    });

    it('returns true for an ApiResponse with a error being an instance of Error', () => {
      expect(new ApiResponse({ error: new Error() }).fetchWasCalled()).to.be.true;
    });
  });

  describe('#shouldFetch()', () => {
    it('returns true for a default ApiResponse', () => {
      expect(new ApiResponse().shouldFetch()).to.be.true;
    });

    it('returns false for an ApiResponse with loading=true', () => {
      expect(new ApiResponse({ loading: true }).shouldFetch()).to.be.false;
    });

    it('returns false for an ApiResponse with a data property different from undefined', () => {
      expect(new ApiResponse({ data: null }).shouldFetch()).to.be.false;
    });

    it('returns false for an ApiResponse with a error being an instance of Error', () => {
      expect(new ApiResponse({ error: new Error() }).shouldFetch()).to.be.false;
    });
  });

  describe('#isLoading()', () => {
    it('returns false if the ApiResponse\'s loading property is not true', () => {
      expect(new ApiResponse({ loading: 20 }).isLoading()).to.be.false;
    });

    it('returns true if the ApiResponse\'s loading=true', () => {
      expect(new ApiResponse({ loading: true }).isLoading()).to.be.true;
    });
  });

  describe('#hasFailed()', () => {
    it('returns false if the ApiResponse\'s error property is not an Error', () => {
      expect(new ApiResponse({ error: 20 }).hasFailed()).to.be.false;
    });

    it('returns true if the ApiResponse\'s error=true', () => {
      expect(new ApiResponse({ error: new Error() }).hasFailed()).to.be.true;
    });
  });

  describe('#hasSucceeded()', () => {
    it('returns true if the ApiResponse\'s data property is not undefined', () => {
      expect(new ApiResponse({ data: null }).hasSucceeded()).to.be.true;
    });
  });
});
