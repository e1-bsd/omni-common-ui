'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _reactRedux = require('react-redux');

var _createBuildRoute = require('./../createBuildRoute');

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('react-redux', function () {
  return { connect: jest.fn() };
});
jest.mock('../createBuildRoute', function () {
  return { createBuildRoute: function createBuildRoute() {
      return 'buildRouteMock';
    } };
});
jest.mock('redux', function () {
  return { bindActionCreators: function bindActionCreators(arg) {
      return arg;
    } };
});
jest.mock('react-router-redux', function () {
  return { routerActions: { push: jest.fn(), replace: jest.fn() } };
});

beforeEach(function () {
  jest.resetAllMocks();
});

test('calls Redux\'s connect() function', function () {
  (0, _2.default)();
  expect(_reactRedux.connect).toHaveBeenCalled();
});

test('passes buildRoute and any other stuff to Redux\'s connect() in mapStateToProps', function () {
  (0, _2.default)(function () {
    return { someProp: 'someValue' };
  });
  var mapStateToProps = _reactRedux.connect.mock.calls[0][0];
  expect(mapStateToProps().buildRoute).toBe((0, _createBuildRoute.createBuildRoute)());
  expect(mapStateToProps().someProp).toBe('someValue');
});

test('ignores mapStateToProps if it is not a function ', function () {
  (0, _2.default)('bad mapStateToProps');
  var mapStateToProps = _reactRedux.connect.mock.calls[0][0];
  expect(mapStateToProps()).toEqual({ buildRoute: (0, _createBuildRoute.createBuildRoute)() });
});

test('passes bound router actions and any other stuff to Redux\'s connect() in mapDispatchToProps', function () {
  var boundActions = (0, _redux.bindActionCreators)(_reactRouterRedux.routerActions);
  (0, _2.default)(null, function () {
    return { someProp: 'someValue' };
  });
  var mapDispatchToProps = _reactRedux.connect.mock.calls[0][1];
  expect(mapDispatchToProps()).toMatchObject(boundActions);
  expect(mapDispatchToProps().someProp).toBe('someValue');
});

test('ignores mapDispatchToProps if it is not a function ', function () {
  var boundActions = (0, _redux.bindActionCreators)(_reactRouterRedux.routerActions);
  (0, _2.default)(null, 'bad mapStateToProps');
  var mapDispatchToProps = _reactRedux.connect.mock.calls[0][1];
  expect(mapDispatchToProps()).toEqual(boundActions);
});

test('passes mergeProps directly', function () {
  var mergeProps = function mergeProps() {};
  (0, _2.default)(null, null, mergeProps);
  expect(_reactRedux.connect.mock.calls[0][2]).toBe(mergeProps);
});

test('passes options directly', function () {
  var options = {};
  (0, _2.default)(null, null, null, options);
  expect(_reactRedux.connect.mock.calls[0][3]).toBe(options);
});
//# sourceMappingURL=spec.js.map
