import { ApiResponse } from './';

describe('ApiResponse', () => {
  describe('#fetchWasCalled()', () => {
    it('returns false for a default ApiResponse', () => {
      expect(new ApiResponse().fetchWasCalled()).toBe(false);
    });

    it('returns true for an ApiResponse with loading=true', () => {
      expect(new ApiResponse({ loading: true }).fetchWasCalled()).toBe(true);
    });

    it('returns true for an ApiResponse with a data property different from undefined', () => {
      expect(new ApiResponse({ data: null }).fetchWasCalled()).toBe(true);
    });

    it('returns true for an ApiResponse with a error being an instance of Error', () => {
      expect(new ApiResponse({ error: new Error() }).fetchWasCalled()).toBe(true);
    });
  });

  describe('#shouldFetch()', () => {
    it('returns true for a default ApiResponse', () => {
      expect(new ApiResponse().shouldFetch()).toBe(true);
    });

    it('returns false for an ApiResponse with loading=true', () => {
      expect(new ApiResponse({ loading: true }).shouldFetch()).toBe(false);
    });

    it('returns false for an ApiResponse with a data property different from undefined', () => {
      expect(new ApiResponse({ data: null }).shouldFetch()).toBe(false);
    });

    it('returns false for an ApiResponse with a error being an instance of Error', () => {
      expect(new ApiResponse({ error: new Error() }).shouldFetch()).toBe(false);
    });
  });

  describe('#isLoading()', () => {
    it('returns false if the ApiResponse\'s loading property is not true', () => {
      expect(new ApiResponse({ loading: 20 }).isLoading()).toBe(false);
    });

    it('returns true if the ApiResponse\'s loading=true', () => {
      expect(new ApiResponse({ loading: true }).isLoading()).toBe(true);
    });
  });

  describe('#hasFailed()', () => {
    it('returns false if the ApiResponse\'s error property is not an Error', () => {
      expect(new ApiResponse({ error: 20 }).hasFailed()).toBe(false);
    });

    it('returns true if the ApiResponse\'s error=true', () => {
      expect(new ApiResponse({ error: new Error() }).hasFailed()).toBe(true);
    });
  });

  describe('#hasSucceeded()', () => {
    it('returns true if the ApiResponse\'s data property is not undefined', () => {
      expect(new ApiResponse({ data: null }).hasSucceeded()).toBe(true);
    });
  });
});
