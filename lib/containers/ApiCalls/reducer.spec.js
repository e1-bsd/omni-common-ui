'use strict';

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Key = _2.default.Key,
    State = _2.default.State;


describe('ApiCalls', function () {
  describe('reducer', function () {
    var state = void 0;

    beforeEach(function () {
      state = (0, _immutable.Map)();
    });

    it('does not modify the state if the action is not an Action', function () {
      (0, _chai.expect)((0, _.reducer)(state, {})).to.equal(state);
    });

    it('removes an entry when API_CALL_CLEAN action is received', function () {
      state = state.set('key', 'value');
      (0, _chai.expect)((0, _.reducer)(state, _2.default.clean('key')).get('key')).to.be.undefined;
    });

    it('sets the proper map item to loading when received a _REQUEST action', function () {
      var action = _2.default.createAction({
        type: 'FETCH_REQUEST',
        url: 'url',
        method: 'GET'
      });

      var key = Key.create(action);
      var value = (0, _.reducer)(state, action).get(key);
      (0, _chai.expect)(State.isValue(value)).to.equal(true, 'type check');
      (0, _chai.expect)(State.isLoading(value)).to.equal(true, 'is loading');
      (0, _chai.expect)(State.hasSucceeded(value)).to.equal(false, 'has succeeded');
      (0, _chai.expect)(State.hasFailed(value)).to.equal(false, 'has failed');
      (0, _chai.expect)(value.error).to.equal(undefined, 'error is undefined');
      (0, _chai.expect)(value.id).to.equal(key, 'state.id = key');
    });

    it('sets the proper map item to success when received a _SUCCESS action', function () {
      var action = _2.default.createAction({
        type: 'FETCH_SUCCESS',
        url: 'url',
        method: 'GET'
      });

      var key = Key.create(action);
      var value = (0, _.reducer)(state, action).get(key);
      (0, _chai.expect)(State.isValue(value)).to.equal(true, 'type check');
      (0, _chai.expect)(State.isLoading(value)).to.equal(false, 'is loading');
      (0, _chai.expect)(State.hasSucceeded(value)).to.equal(true, 'has succeeded');
      (0, _chai.expect)(State.hasFailed(value)).to.equal(false, 'has failed');
      (0, _chai.expect)(value.error).to.equal(undefined, 'error is undefined');
      (0, _chai.expect)(value.id).to.equal(key, 'state.id = key');
    });

    it('sets the proper map item to error when received a _FAILURE action', function () {
      var action = _2.default.createAction({
        type: 'FETCH_FAILURE',
        error: new Error(),
        url: 'url',
        method: 'GET'
      });

      var key = Key.create(action);
      var value = (0, _.reducer)(state, action).get(key);
      (0, _chai.expect)(State.isValue(value)).to.equal(true, 'type check');
      (0, _chai.expect)(State.isLoading(value)).to.equal(false, 'is loading');
      (0, _chai.expect)(State.hasSucceeded(value)).to.equal(false, 'has succeeded');
      (0, _chai.expect)(State.hasFailed(value)).to.equal(true, 'has failed');
      (0, _chai.expect)(value.error).to.equal(action.error, 'error is the error');
      (0, _chai.expect)(value.id).to.equal(key, 'state.id = key');
    });
  });
});
//# sourceMappingURL=reducer.spec.js.map
