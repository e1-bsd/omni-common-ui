'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _createBuildRoute = require('./../createBuildRoute');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connect(mapStateToProps, mapDispatchToProps, mergeProps, options) {
  return (0, _reactRedux.connect)(wrapMapStateToProps, wrapMapDispatchToProps, mergeProps, options);

  function wrapMapStateToProps(state, ownProps) {
    var buildRoute = (0, _createBuildRoute.createBuildRoute)(ownProps);
    var stateToProps = _is_js2.default.function(mapStateToProps) ? mapStateToProps(state, ownProps) : undefined;
    return Object.assign({ buildRoute: buildRoute }, stateToProps);
  }

  function wrapMapDispatchToProps(dispatch, ownProps) {
    var dispatchToProps = _is_js2.default.function(mapDispatchToProps) ? mapDispatchToProps(dispatch, ownProps) : undefined;
    return Object.assign({}, (0, _redux.bindActionCreators)(_reactRouterRedux.routerActions, dispatch), dispatchToProps);
  }
}

exports.default = connect;
//# sourceMappingURL=index.js.map
