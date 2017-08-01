'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _immutable = require('immutable');

var _AlertDialog = require('./../../components/AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Api = require('./../../domain/Api');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _ErrorPage = require('./../../components/ErrorPage');

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../components/ErrorPage', function () {
  return function () {
    return null;
  };
});
jest.mock('oidc-client');

describe('component', function () {
  var props = void 0;

  var buildProps = function buildProps() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var error = new _Api.ApiError(response);
    if (_is_js2.default.not.undefined(error)) {
      error.response = response.response;
    }

    var erroredApi = _ApiCalls2.default.State.createFailed('id1', error);
    return {
      erroredApis: new _immutable.List([erroredApi, _ApiCalls2.default.State.createFailed('id2', new Error())]),
      erroredApi: erroredApi,
      clean: jest.fn(),
      location: {
        pathname: '/x/y'
      }
    };
  };

  beforeEach(function () {
    props = buildProps();
  });

  test('renders its children if no failed ApiCall.State is received as erroredApi', function () {
    props.erroredApis = new _immutable.List();
    props.erroredApi = undefined;
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _.ErrorPageHandler,
      props,
      _react2.default.createElement('div', { id: 'inner' })
    ));
    expect(wrapper.find('#inner')).toHaveLength(1);
  });

  test('renders the error page if a failed ApiCall.State is received as erroredApi and has no response', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _.ErrorPageHandler,
      props,
      _react2.default.createElement('div', { id: 'inner' })
    ));
    expect(wrapper.find(_ErrorPage2.default)).toHaveLength(1);
    expect(wrapper.find('#inner')).toHaveLength(0);
  });

  describe('when location.pathname changes, API errors are auto-cleaned', function () {
    test('does not call clean() on mount', function () {
      (0, _enzyme.mount)(_react2.default.createElement(_.ErrorPageHandler, props));
      expect(props.clean).not.toHaveBeenCalled();
    });

    test('does not call clean() if location.pathname is the same', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.ErrorPageHandler, props));
      wrapper.setProps({ location: { pathname: '/x/y' } });
      expect(props.clean).not.toHaveBeenCalled();
    });

    test('calls clean() on location.pathname change', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.ErrorPageHandler, props));
      wrapper.setProps({ location: { pathname: '/x' } }); // user clicked a nav crumb, for instance
      expect(props.clean.mock.calls).toEqual([['id1'], ['id2']]);
    });
  });

  describe('when errorHandlerRendersPopUps config option is true', function () {
    beforeEach(function () {
      _Config2.default.merge({ errorHandlerRendersPopUps: true });
    });

    test('renders the error page if a failed ApiCall.State is received as erroredApi and its code is 500', function () {
      props = buildProps({ status: 500 });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _.ErrorPageHandler,
        props,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.find(_ErrorPage2.default)).toHaveLength(1);
      expect(wrapper.find('#inner')).toHaveLength(0);
    });

    test('renders the error dialog if a failed ApiCall.State is received as erroredApi ' + 'and its code is not 500 and there is an object in the response property', function () {
      props = buildProps({ status: 400, response: {} });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _.ErrorPageHandler,
        props,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.find(_AlertDialog2.default)).toHaveLength(1);
      expect(wrapper.find('#inner')).toHaveLength(1);
    });

    test('does not the error dialog if a failed ApiCall.State is received as erroredApi ' + 'and its code is not 500 but there is not an object in the response property', function () {
      props = buildProps({ status: 400, response: 'Some string' });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _.ErrorPageHandler,
        props,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.find(_ErrorPage2.default)).toHaveLength(1);
      expect(wrapper.find('#inner')).toHaveLength(0);
    });
  });

  describe('when errorHandlerRendersPopUps config option is not true', function () {
    beforeEach(function () {
      _Config2.default.merge({ errorHandlerRendersPopUps: true });
    });

    test('renders the error page if a failed ApiCall.State is received as erroredApi and its code is 500', function () {
      props = buildProps({ status: 500 });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _.ErrorPageHandler,
        props,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.find(_ErrorPage2.default)).toHaveLength(1);
      expect(wrapper.find('#inner')).toHaveLength(0);
    });

    test('renders the error page if a failed ApiCall.State is received as erroredApi and its code is not 500', function () {
      props = buildProps({ status: 400 });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        _.ErrorPageHandler,
        props,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      expect(wrapper.find(_ErrorPage2.default)).toHaveLength(1);
      expect(wrapper.find('#inner')).toHaveLength(0);
    });
  });
});

describe('mapStateToProps', function () {
  var state = void 0;
  var ownProps = void 0;

  var buildState = function buildState() {
    var apiCalls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new _immutable.Map({
      apiCalls: new _immutable.Map({
        'GET /some/path': _ApiCalls2.default.State.createLoading()
      }).merge(apiCalls)
    });
  };

  beforeEach(function () {
    state = buildState();
    ownProps = {
      routes: [{}, { errorPage: {} }, { errorPage: {} }]
    };
  });

  test('returns erroredApis as empty List if no API has failed', function () {
    var _mapStateToProps = (0, _.mapStateToProps)(state, ownProps),
        erroredApis = _mapStateToProps.erroredApis;

    expect(_immutable.List.isList(erroredApis)).toBe(true);
    expect(erroredApis.isEmpty()).toBe(true);
  });

  test('returns config as undefined if no route has an errorPage property', function () {
    ownProps.routes = [{}, {}, {}];
    expect((0, _.mapStateToProps)(state, ownProps).config).toBeUndefined();
  });

  test('returns errorPage in the last route with an errorPage property as config', function () {
    expect((0, _.mapStateToProps)(state, ownProps).config).toBe(ownProps.routes[2].errorPage);
  });

  test('returns erroredApis with failing a list of ApiCall.State ' + 'if they exist in the state', function () {
    var failedCall1 = _ApiCalls2.default.State.createFailed('GET /my/path', new Error());
    var failedCall2 = _ApiCalls2.default.State.createFailed('GET /my/path/2', new Error());
    state = buildState({
      'GET /my/path': failedCall1,
      'GET /my/path/2': failedCall2
    });
    expect((0, _.mapStateToProps)(state, ownProps).erroredApis.get(0)).toBe(failedCall1);
    expect((0, _.mapStateToProps)(state, ownProps).erroredApis.get(1)).toBe(failedCall2);
  });

  test('ignores errores APIs if disableDefault=true for them', function () {
    var failedCall1 = _ApiCalls2.default.State.createFailed('GET /my/path', new Error());
    var failedCall2 = _ApiCalls2.default.State.createFailed('GET /my/path/2', new Error(), { disableDefault: true });
    state = buildState({
      'GET /my/path': failedCall1,
      'GET /my/path/2': failedCall2
    });

    var _mapStateToProps2 = (0, _.mapStateToProps)(state, ownProps),
        erroredApis = _mapStateToProps2.erroredApis;

    expect(erroredApis.size).toBe(1);
    expect(erroredApis.get(0)).toBe(failedCall1);
  });
});
//# sourceMappingURL=spec.js.map
