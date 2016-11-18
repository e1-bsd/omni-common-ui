import { expect } from 'chai';
import ApiState from './ApiState';

describe('ApiCall', () => {
  describe('ApiState', () => {
    describe('#createSucceeded()', () => {
      it('creates a succeeded API call state object', () => {
        const apiState = ApiState.createSucceeded();
        expect(ApiState.isValue(apiState)).to.equal(true, 'is a ApiState');
        expect(apiState.status).to.equal('succeeded');
      });
    });

    describe('#createLoading()', () => {
      it('creates a loading API call state object', () => {
        const apiState = ApiState.createLoading();
        expect(ApiState.isValue(apiState)).to.equal(true, 'is a ApiState');
        expect(apiState.status).to.equal('loading');
      });
    });

    describe('#createFailed()', () => {
      it('creates a failed API call state object', () => {
        const apiState = ApiState.createFailed();
        expect(ApiState.isValue(apiState)).to.equal(true, 'is a ApiState');
        expect(apiState.status).to.equal('failed');
      });

      it('saves the error received as parameter', () => {
        const error = 'some error';
        const apiState = ApiState.createFailed(error);
        expect(ApiState.isValue(apiState)).to.equal(true, 'is a ApiState');
        expect(apiState.status).to.equal('failed');
        expect(apiState.error).to.equal(error);
      });
    });

    describe('#isValue()', () => {
      it('returns true if passed an object created with the creators of Value', () => {
        expect(ApiState.isValue(ApiState.createLoading())).to.equal(true, 'loading');
        expect(ApiState.isValue(ApiState.createSucceeded())).to.equal(true, 'succeeded');
        expect(ApiState.isValue(ApiState.createFailed())).to.equal(true, 'failed');
      });

      it('returns false if passed an object not created with the creators of Value', () => {
        expect(ApiState.isValue({ status: 'loading' })).to.equal(false, 'loading');
        expect(ApiState.isValue({ status: 'succeeded' })).to.equal(false, 'succeeded');
        expect(ApiState.isValue({ status: 'failed' })).to.equal(false, 'failed');
        expect(ApiState.isValue({})).to.equal(false, 'empty object');
        expect(ApiState.isValue()).to.equal(false, 'nothing');
        expect(ApiState.isValue('')).to.equal(false, 'string');
      });
    });

    describe('#isLoading()', () => {
      it('returns true if passed a Value#createLoading() object', () => {
        expect(ApiState.isLoading(ApiState.createLoading())).to.be.true;
      });

      it('returns false if passed any object not created with Value#createLoading()', () => {
        expect(ApiState.isLoading(ApiState.createSucceeded())).to.equal(false, 'succeeded');
        expect(ApiState.isLoading(ApiState.createFailed())).to.equal(false, 'failed');
      });
    });

    describe('#hasSucceeded()', () => {
      it('returns true if passed a Value#createSucceeded() object', () => {
        expect(ApiState.hasSucceeded(ApiState.createSucceeded())).to.be.true;
      });

      it('returns false if passed any object not created with Value#createSucceeded()', () => {
        expect(ApiState.hasSucceeded(ApiState.createLoading())).to.equal(false, 'loading');
        expect(ApiState.hasSucceeded(ApiState.createFailed())).to.equal(false, 'failed');
      });
    });

    describe('#hasFailed()', () => {
      it('returns true if passed a Value#createFailed() object', () => {
        expect(ApiState.hasFailed(ApiState.createFailed())).to.be.true;
      });

      it('returns false if passed any object not created with Value#createFailed()', () => {
        expect(ApiState.hasFailed(ApiState.createLoading())).to.equal(false, 'loading');
        expect(ApiState.hasFailed(ApiState.createSucceeded())).to.equal(false, 'succeeded');
      });
    });

    describe('#shouldPerform()', () => {
      it('returns true if passed anything that is not an ApiState', () => {
        expect(ApiState.shouldPerform()).to.equal(true, 'undefined');
        expect(ApiState.shouldPerform(null)).to.equal(true, 'null');
        expect(ApiState.shouldPerform('')).to.equal(true, 'string');
        expect(ApiState.shouldPerform({})).to.equal(true, 'object');
      });

      it('returns true if passed an ApiState ' +
          'that is not loading, has not succeeded and has not failed', () => {
        expect(ApiState.shouldPerform(ApiState.createLoading().clear())).to.be.true;
      });

      it('returns false if passed an ApiState that is loading', () => {
        expect(ApiState.shouldPerform(ApiState.createLoading())).to.be.false;
      });

      it('returns false if passed an ApiState that has succeeded', () => {
        expect(ApiState.shouldPerform(ApiState.createSucceeded())).to.be.false;
      });

      it('returns false if passed an ApiState that has failed', () => {
        expect(ApiState.shouldPerform(ApiState.createFailed('error'))).to.be.false;
      });
    });
  });
});
