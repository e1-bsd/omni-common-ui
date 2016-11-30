import React from 'react';
import connect from 'domain/connect';
import is from 'is_js';
import { actions as privilegesActions } from 'containers/Privileges';
import { bindActionCreators } from 'redux';
import AuthorisationErrorPage from 'components/AuthorisationErrorPage';
import ErrorPageConfig from 'domain/ErrorPageConfig';

export const PermissionHandler = (props) => {
  const { permissionChecks, children, havePrivilegesLoaded } = props;
  if (! havePrivilegesLoaded()) {
    return null;
  }

  if (is.undefined(permissionChecks)) {
    return children;
  }

  const forbiddenRoute = permissionChecks.find(({ canAccess }) => ! canAccess(props));
  if (is.undefined(forbiddenRoute)) {
    return children;
  }

  return <AuthorisationErrorPage {...props} />;
};

PermissionHandler.propTypes = {
  permissionChecks: React.PropTypes.arrayOf(React.PropTypes.shape({
    canAccess: React.PropTypes.func.isRequired,
  })),
  children: React.PropTypes.node,
  havePrivilegesLoaded: React.PropTypes.func.isRequired,
};

export function mapStateToProps(state, { routes }) {
  const permissionChecks = routes.filter((route) => {
    if (is.not.existy(route.canAccess)) {
      return false;
    }

    if (! PRODUCTION) {
      if (is.not.function(route.canAccess)) {
        throw new Error('canAccess in the route configuration should be a function');
      }
    }

    return true;
  });

  return { permissionChecks, config: ErrorPageConfig.get(routes) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(privilegesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionHandler);
