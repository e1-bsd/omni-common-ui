'use strict';

var _chai = require('chai');

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

var _ApiKey2 = require('./ApiKey');

var _ApiKey3 = _interopRequireDefault(_ApiKey2);

var _ApiAction2 = require('./ApiAction');

var _ApiAction3 = _interopRequireDefault(_ApiAction2);

var _ApiState2 = require('./ApiState');

var _ApiState3 = _interopRequireDefault(_ApiState2);

var _immutable = require('immutable');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('ApiCall', function () {
  it('exposes API_CALL_CLEAN action type', function () {
    (0, _chai.expect)(_ApiCall2.default.API_CALL_CLEAN).to.equal('API_CALL_CLEAN');
  });

  it('exposes ApiKey as Key', function () {
    (0, _chai.expect)(_ApiCall2.default.Key).to.equal(_ApiKey3.default);
  });

  it('exposes ApiAction as Action', function () {
    (0, _chai.expect)(_ApiCall2.default.Action).to.equal(_ApiAction3.default);
  });

  it('exposes ApiState as State', function () {
    (0, _chai.expect)(_ApiCall2.default.State).to.equal(_ApiState3.default);
  });

  it('does not allow to reassign its inner classes', function () {
    (0, _chai.expect)(function () {
      _ApiCall2.default.State = {};
    }).to.throw();
    (0, _chai.expect)(function () {
      _ApiCall2.default.Action = {};
    }).to.throw();
    (0, _chai.expect)(function () {
      _ApiCall2.default.Key = {};
    }).to.throw();
  });

  describe('#find()', function () {
    var _ref;

    var call1 = _ApiCall2.default.State.createLoading();
    var call2 = _ApiCall2.default.State.createSucceeded();
    var call3 = _ApiCall2.default.State.createFailed();
    var state = new _immutable.Map({
      apiCalls: new _immutable.Map((_ref = {}, _defineProperty(_ref, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' }), call1), _defineProperty(_ref, _ApiCall2.default.Key.create({ method: 'POST', url: '/path/1' }), call2), _defineProperty(_ref, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/2' }), call3), _ref))
    });

    it('returns the state for the API call with the provided key', function () {
      var key = _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' });
      (0, _chai.expect)(_ApiCall2.default.find(state, key)).to.equal(call1);
    });

    it('builds the key by itself if provided an object', function () {
      (0, _chai.expect)(_ApiCall2.default.find(state, { method: 'POST', url: '/path/1' })).to.equal(call2);
    });
  });

  describe('#shouldPerform()', function () {
    var _ref2;

    var call1 = _ApiCall2.default.State.createLoading();
    var call2 = _ApiCall2.default.State.createSucceeded();
    var call3 = _ApiCall2.default.State.createFailed();
    var state = new _immutable.Map({
      apiCalls: new _immutable.Map((_ref2 = {}, _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' }), call1), _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'POST', url: '/path/1' }), call2), _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/2' }), call3), _defineProperty(_ref2, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/3' }), undefined), _ref2))
    });

    it('returns whether an API call should be performed or not', function () {
      (0, _chai.expect)(_ApiCall2.default.shouldPerform(state, 'GET /path/1')).to.equal(false, 'loading');
      (0, _chai.expect)(_ApiCall2.default.shouldPerform(state, 'POST /path/1')).to.equal(false, 'succeeded');
      (0, _chai.expect)(_ApiCall2.default.shouldPerform(state, 'GET /path/2')).to.equal(false, 'failed');
      (0, _chai.expect)(_ApiCall2.default.shouldPerform(state, 'GET /path/3')).to.equal(true, 'should fetch');
      (0, _chai.expect)(_ApiCall2.default.shouldPerform(state, 'GET /new/path')).to.equal(true, 'should fetch new');
    });

    it('builds the key by itself if provided an object', function () {
      (0, _chai.expect)(_ApiCall2.default.shouldPerform(state, { method: 'POST', url: '/path/1' })).to.be.false;
    });
  });

  describe('#createAction()', function () {
    var originalCreate = _ApiCall2.default.Action.create;

    afterEach(function () {
      _ApiCall2.default.Action.create = originalCreate;
    });

    it('calls ApiCall.Action.create()', function () {
      _ApiCall2.default.Action.create = _sinon2.default.spy();
      var originalAction = { type: 'CALL_REQUEST', url: '/path', method: 'GET' };
      _ApiCall2.default.createAction(originalAction);
      (0, _chai.expect)(_ApiCall2.default.Action.create.args[0]).to.eql([originalAction]);
    });
  });

  describe('#clean()', function () {
    it('returns an action of API_CALL_CLEAN type with the passed key', function () {
      var action = _ApiCall2.default.clean('key');
      (0, _chai.expect)(action.type).to.equal(_ApiCall2.default.API_CALL_CLEAN);
      (0, _chai.expect)(action.key).to.equal('key');
    });
  });

  describe('#getErrors()', function () {
    var _ref3;

    var state = new _immutable.Map({
      apiCalls: new _immutable.Map((_ref3 = {}, _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/1' }), _ApiCall2.default.State.createLoading()), _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'POST', url: '/path/1' }), _ApiCall2.default.State.createFailed()), _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/2' }), _ApiCall2.default.State.createFailed()), _defineProperty(_ref3, _ApiCall2.default.Key.create({ method: 'GET', url: '/path/3' }), _ApiCall2.default.State.createSucceeded()), _ref3))
    });

    it('returns all errored API calls', function () {
      var errors = _ApiCall2.default.getErrors(state);
      (0, _chai.expect)(errors.size).to.equal(2);
    });
  });
});
//# sourceMappingURL=ApiCall.spec.js.map
