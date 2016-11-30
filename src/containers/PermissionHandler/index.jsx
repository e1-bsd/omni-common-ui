import React from 'react';
import connect from 'domain/connect';
import is from 'is_js';

export const PermissionHandler = (props) => {
  const { permissionChecks, children } = props;
  if (is.undefined(permissionChecks)) {
    return children;
  }

  const forbiddenRoute = permissionChecks.find(({ canAccess }) => ! canAccess(props));
  if (is.undefined(forbiddenRoute)) {
    return children;
  }

  return <div>UNAUTHORISED!</div>;
};

PermissionHandler.propTypes = {
  permissionChecks: React.PropTypes.arrayOf(React.PropTypes.shape({
    canAccess: React.PropTypes.func.isRequired,
  })),
  children: React.PropTypes.node,
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

  return { permissionChecks };
}

export default connect(mapStateToProps)(PermissionHandler);
