'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _immutable = require('immutable');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _AlertDialog = require('./../../components/AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _Config2 = require('./../../domain/Config');

var _Config3 = _interopRequireDefault(_Config2);

var _Api = require('./../../domain/Api');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorPage = function ErrorPage() {
  return null;
};
// eslint-disable-next-line import/no-webpack-loader-syntax, global-require
var requireComponent = function requireComponent(Config) {
  return require('inject?components/ErrorPage&domain/Config!./')({
    'components/ErrorPage': ErrorPage,
    'domain/Config': _Config3.default.merge(Config)
  });
};

var getComponent = function getComponent(Config) {
  return requireComponent(Config).ErrorPageHandler;
};
var getMapStateToProps = function getMapStateToProps(Config) {
  return requireComponent(Config).mapStateToProps;
};

describe('<ErrorPageHandler />', function () {
  describe('component', function () {
    var props = void 0;
    var ErrorPageHandler = void 0;

    var buildProps = function buildProps() {
      var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var error = new _Api.ApiError(response);
      if (_is_js2.default.not.undefined(response.response)) {
        error.response = response.response;
      }

      var erroredApi = _ApiCalls2.default.State.createFailed('id1', error);
      return {
        erroredApis: new _immutable.List([erroredApi, _ApiCalls2.default.State.createFailed('id2', new Error())]),
        erroredApi: erroredApi,
        clean: _sinon2.default.spy(),
        location: {
          pathname: '/x/y'
        }
      };
    };

    beforeEach(function () {
      props = buildProps();
      ErrorPageHandler = getComponent();
    });

    it('renders its children if no failed ApiCall.State is received as erroredApi', function () {
      props.erroredApis = new _immutable.List();
      props.erroredApi = undefined;
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        ErrorPageHandler,
        props,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      (0, _chai.expect)(wrapper).to.have.descendants('#inner');
    });

    it('renders the error page if a failed ApiCall.State is received as erroredApi and has no response', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
        ErrorPageHandler,
        props,
        _react2.default.createElement('div', { id: 'inner' })
      ));
      (0, _chai.expect)(wrapper).to.have.descendants(ErrorPage);
      (0, _chai.expect)(wrapper).to.not.have.descendants('#inner');
    });

    context('when location.pathname changes, API errors are auto-cleaned', function () {
      it('does not call clean() on mount', function () {
        (0, _enzyme.mount)(_react2.default.createElement(ErrorPageHandler, props));
        (0, _chai.expect)(props.clean.called).to.be.false;
      });

      it('does not call clean() if location.pathname is the same', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(ErrorPageHandler, props));
        wrapper.setProps({ location: { pathname: '/x/y' } });
        (0, _chai.expect)(props.clean.called).to.be.false;
      });

      it('calls clean() on location.pathname change', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(ErrorPageHandler, props));
        wrapper.setProps({ location: { pathname: '/x' } }); // user clicked a nav crumb, for instance
        (0, _chai.expect)(props.clean.args).to.eql([['id1'], ['id2']]);
      });
    });

    context('when errorHandlerRendersPopUps config option is true', function () {
      beforeEach(function () {
        ErrorPageHandler = getComponent((0, _immutable.Map)({ errorHandlerRendersPopUps: true }));
      });

      it('renders the error page if a failed ApiCall.State is received as erroredApi and its code is 500', function () {
        props = buildProps({ status: 500 });
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          ErrorPageHandler,
          props,
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.have.descendants(ErrorPage);
        (0, _chai.expect)(wrapper).to.not.have.descendants('#inner');
      });

      it('renders the error dialog if a failed ApiCall.State is received as erroredApi ' + 'and its code is not 500 and there is an object in the response property', function () {
        props = buildProps({ status: 400, response: {} });
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          ErrorPageHandler,
          props,
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.have.descendants(_AlertDialog2.default);
        (0, _chai.expect)(wrapper).to.have.descendants('#inner');
      });

      it('does not the error dialog if a failed ApiCall.State is received as erroredApi ' + 'and its code is not 500 but there is not an object in the response property', function () {
        props = buildProps({ status: 400, response: 'Some string' });
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          ErrorPageHandler,
          props,
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.have.descendants(ErrorPage);
        (0, _chai.expect)(wrapper).to.not.have.descendants('#inner');
      });
    });

    context('when errorHandlerRendersPopUps config option is not true', function () {
      beforeEach(function () {
        ErrorPageHandler = getComponent((0, _immutable.Map)({ errorHandlerRendersPopUps: false }));
      });

      it('renders the error page if a failed ApiCall.State is received as erroredApi and its code is 500', function () {
        props = buildProps({ status: 500 });
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          ErrorPageHandler,
          props,
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.have.descendants(ErrorPage);
        (0, _chai.expect)(wrapper).to.not.have.descendants('#inner');
      });

      it('renders the error page if a failed ApiCall.State is received as erroredApi and its code is not 500', function () {
        props = buildProps({ status: 400 });
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
          ErrorPageHandler,
          props,
          _react2.default.createElement('div', { id: 'inner' })
        ));
        (0, _chai.expect)(wrapper).to.have.descendants(ErrorPage);
        (0, _chai.expect)(wrapper).to.not.have.descendants('#inner');
      });
    });
  });

  describe('mapStateToProps', function () {
    var state = void 0;
    var ownProps = void 0;
    var mapStateToProps = void 0;

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
      mapStateToProps = getMapStateToProps();
      ownProps = {
        routes: [{}, { errorPage: {} }, { errorPage: {} }]
      };
    });

    it('returns erroredApis as empty List if no API has failed', function () {
      var _mapStateToProps = mapStateToProps(state, ownProps),
          erroredApis = _mapStateToProps.erroredApis;

      (0, _chai.expect)(_immutable.List.isList(erroredApis)).to.equal(true, 'is a List');
      (0, _chai.expect)(erroredApis.isEmpty()).to.equal(true, 'is empty');
    });

    it('returns config as undefined if no route has an errorPage property', function () {
      ownProps.routes = [{}, {}, {}];
      (0, _chai.expect)(mapStateToProps(state, ownProps).config).to.be.undefined;
    });

    it('returns errorPage in the last route with an errorPage property as config', function () {
      (0, _chai.expect)(mapStateToProps(state, ownProps).config).to.equal(ownProps.routes[2].errorPage);
    });

    it('returns erroredApis with failing a list of ApiCall.State ' + 'if they exist in the state', function () {
      var failedCall1 = _ApiCalls2.default.State.createFailed('GET /my/path', new Error());
      var failedCall2 = _ApiCalls2.default.State.createFailed('GET /my/path/2', new Error());
      state = buildState({
        'GET /my/path': failedCall1,
        'GET /my/path/2': failedCall2
      });
      (0, _chai.expect)(mapStateToProps(state, ownProps).erroredApis.get(0)).to.equal(failedCall1);
      (0, _chai.expect)(mapStateToProps(state, ownProps).erroredApis.get(1)).to.equal(failedCall2);
    });

    it('ignores errores APIs if disableDefault=true for them', function () {
      var failedCall1 = _ApiCalls2.default.State.createFailed('GET /my/path', new Error());
      var failedCall2 = _ApiCalls2.default.State.createFailed('GET /my/path/2', new Error(), { disableDefault: true });
      state = buildState({
        'GET /my/path': failedCall1,
        'GET /my/path/2': failedCall2
      });

      var _mapStateToProps2 = mapStateToProps(state, ownProps),
          erroredApis = _mapStateToProps2.erroredApis;

      (0, _chai.expect)(erroredApis.size).to.equal(1);
      (0, _chai.expect)(erroredApis.get(0)).to.equal(failedCall1);
    });
  });
});
//# sourceMappingURL=spec.js.map
