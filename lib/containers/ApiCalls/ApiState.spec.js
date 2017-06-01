'use strict';

var _chai = require('chai');

var _ApiState = require('./ApiState');

var _ApiState2 = _interopRequireDefault(_ApiState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ApiCall', function () {
  describe('ApiState', function () {
    describe('#createSucceeded()', function () {
      it('creates a succeeded API call state object', function () {
        var apiState = _ApiState2.default.createSucceeded();
        (0, _chai.expect)(_ApiState2.default.isValue(apiState)).to.equal(true, 'is a ApiState');
        (0, _chai.expect)(apiState.status).to.equal('succeeded');
      });
    });

    describe('#createLoading()', function () {
      it('creates a loading API call state object', function () {
        var apiState = _ApiState2.default.createLoading();
        (0, _chai.expect)(_ApiState2.default.isValue(apiState)).to.equal(true, 'is a ApiState');
        (0, _chai.expect)(apiState.status).to.equal('loading');
      });

      it('creates a loading API call state object ' + 'with disableDefault=true if truthy value passed', function () {
        var apiState = _ApiState2.default.createLoading('id', { disableDefault: true });
        (0, _chai.expect)(apiState.disableDefault).to.be.true;
      });

      it('creates a loading API call state object ' + 'with disableDefault=false if falsy value passed', function () {
        var apiState = _ApiState2.default.createLoading('id');
        (0, _chai.expect)(apiState.disableDefault).to.be.false;
      });
    });

    describe('#createFailed()', function () {
      it('creates a failed API call state object', function () {
        var apiState = _ApiState2.default.createFailed();
        (0, _chai.expect)(_ApiState2.default.isValue(apiState)).to.equal(true, 'is a ApiState');
        (0, _chai.expect)(apiState.status).to.equal('failed');
      });

      it('saves the error received as parameter', function () {
        var error = 'some error';
        var apiState = _ApiState2.default.createFailed('key', error);
        (0, _chai.expect)(_ApiState2.default.isValue(apiState)).to.equal(true, 'is a ApiState');
        (0, _chai.expect)(apiState.status).to.equal('failed');
        (0, _chai.expect)(apiState.error).to.equal(error);
      });

      it('creates a failed API call state object ' + 'with disableDefault=true if truthy value passed', function () {
        var apiState = _ApiState2.default.createFailed('key', 'some error', { disableDefault: true });
        (0, _chai.expect)(apiState.disableDefault).to.be.true;
      });

      it('creates a failed API call state object ' + 'with disableDefault=false if falsy value passed', function () {
        var apiState = _ApiState2.default.createFailed('key', 'some error');
        (0, _chai.expect)(apiState.disableDefault).to.be.false;
      });
    });

    describe('#isValue()', function () {
      it('returns true if passed an object created with the creators of Value', function () {
        (0, _chai.expect)(_ApiState2.default.isValue(_ApiState2.default.createLoading())).to.equal(true, 'loading');
        (0, _chai.expect)(_ApiState2.default.isValue(_ApiState2.default.createSucceeded())).to.equal(true, 'succeeded');
        (0, _chai.expect)(_ApiState2.default.isValue(_ApiState2.default.createFailed())).to.equal(true, 'failed');
      });

      it('returns false if passed an object not created with the creators of Value', function () {
        (0, _chai.expect)(_ApiState2.default.isValue({ status: 'loading' })).to.equal(false, 'loading');
        (0, _chai.expect)(_ApiState2.default.isValue({ status: 'succeeded' })).to.equal(false, 'succeeded');
        (0, _chai.expect)(_ApiState2.default.isValue({ status: 'failed' })).to.equal(false, 'failed');
        (0, _chai.expect)(_ApiState2.default.isValue({})).to.equal(false, 'empty object');
        (0, _chai.expect)(_ApiState2.default.isValue()).to.equal(false, 'nothing');
        (0, _chai.expect)(_ApiState2.default.isValue('')).to.equal(false, 'string');
      });
    });

    describe('#isLoading()', function () {
      it('returns true if passed a Value#createLoading() object', function () {
        (0, _chai.expect)(_ApiState2.default.isLoading(_ApiState2.default.createLoading())).to.be.true;
      });

      it('returns false if passed any object not created with Value#createLoading()', function () {
        (0, _chai.expect)(_ApiState2.default.isLoading(_ApiState2.default.createSucceeded())).to.equal(false, 'succeeded');
        (0, _chai.expect)(_ApiState2.default.isLoading(_ApiState2.default.createFailed())).to.equal(false, 'failed');
      });
    });

    describe('#hasSucceeded()', function () {
      it('returns true if passed a Value#createSucceeded() object', function () {
        (0, _chai.expect)(_ApiState2.default.hasSucceeded(_ApiState2.default.createSucceeded())).to.be.true;
      });

      it('returns false if passed any object not created with Value#createSucceeded()', function () {
        (0, _chai.expect)(_ApiState2.default.hasSucceeded(_ApiState2.default.createLoading())).to.equal(false, 'loading');
        (0, _chai.expect)(_ApiState2.default.hasSucceeded(_ApiState2.default.createFailed())).to.equal(false, 'failed');
      });
    });

    describe('#hasFailed()', function () {
      it('returns true if passed a Value#createFailed() object', function () {
        (0, _chai.expect)(_ApiState2.default.hasFailed(_ApiState2.default.createFailed())).to.be.true;
      });

      it('returns false if passed any object not created with Value#createFailed()', function () {
        (0, _chai.expect)(_ApiState2.default.hasFailed(_ApiState2.default.createLoading())).to.equal(false, 'loading');
        (0, _chai.expect)(_ApiState2.default.hasFailed(_ApiState2.default.createSucceeded())).to.equal(false, 'succeeded');
      });
    });

    describe('#shouldPerform()', function () {
      it('returns true if passed anything that is not an ApiState', function () {
        (0, _chai.expect)(_ApiState2.default.shouldPerform()).to.equal(true, 'undefined');
        (0, _chai.expect)(_ApiState2.default.shouldPerform(null)).to.equal(true, 'null');
        (0, _chai.expect)(_ApiState2.default.shouldPerform('')).to.equal(true, 'string');
        (0, _chai.expect)(_ApiState2.default.shouldPerform({})).to.equal(true, 'object');
      });

      it('returns true if passed an ApiState ' + 'that is not loading, has not succeeded and has not failed', function () {
        (0, _chai.expect)(_ApiState2.default.shouldPerform(_ApiState2.default.createLoading().clear())).to.be.true;
      });

      it('returns false if passed an ApiState that is loading', function () {
        (0, _chai.expect)(_ApiState2.default.shouldPerform(_ApiState2.default.createLoading())).to.be.false;
      });

      it('returns false if passed an ApiState that has succeeded', function () {
        (0, _chai.expect)(_ApiState2.default.shouldPerform(_ApiState2.default.createSucceeded())).to.be.false;
      });

      it('returns false if passed an ApiState that has failed', function () {
        (0, _chai.expect)(_ApiState2.default.shouldPerform(_ApiState2.default.createFailed('error'))).to.be.false;
      });
    });
  });
});
//# sourceMappingURL=ApiState.spec.js.map
