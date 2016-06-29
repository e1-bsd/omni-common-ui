import { connect as originalConnect } from 'react-redux';
import { createBuildRoute } from 'domain/createBuildRoute';
import is from 'is_js';

export function connect(mapStateToProps, mapDispatchToProps, mergeProps, options) {
  return originalConnect(wrapMapStateToProps, mapDispatchToProps, mergeProps, options);

  function wrapMapStateToProps(state, ownProps) {
    const buildRoute = createBuildRoute(ownProps);
    const stateToProps = is.function(mapStateToProps) ?
        mapStateToProps(state, ownProps) :
        undefined;
    return Object.assign({ buildRoute }, stateToProps);
  }
}

export default connect;
