import { connect as originalConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import { createBuildRoute } from 'domain/createBuildRoute';
import is from 'is_js';

export function connect(mapStateToProps, mapDispatchToProps, mergeProps, options) {
  return originalConnect(wrapMapStateToProps, wrapMapDispatchToProps, mergeProps, options);

  function wrapMapStateToProps(state, ownProps) {
    const buildRoute = createBuildRoute(ownProps);
    const stateToProps = is.function(mapStateToProps) ?
        mapStateToProps(state, ownProps) :
        undefined;
    return Object.assign({ buildRoute }, stateToProps);
  }

  function wrapMapDispatchToProps(dispatch, ownProps) {
    const dispatchToProps = is.function(mapDispatchToProps) ?
        mapDispatchToProps(dispatch, ownProps) :
        undefined;
    return Object.assign({}, bindActionCreators(routerActions, dispatch), dispatchToProps);
  }
}

export default connect;
