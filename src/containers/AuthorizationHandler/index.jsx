import React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Raven from 'raven-js';
import connect from 'domain/connect';
import is from 'is_js';
import { actions as privilegesActions } from 'containers/Privileges';
import { bindActionCreators } from 'redux';
import AuthorisationErrorPage from 'components/AuthorisationErrorPage';
import ErrorPageConfig from 'domain/ErrorPageConfig';
import Config from 'domain/Config';
import log from 'domain/log';
import PageLoadingSpinner from 'components/PageLoadingSpinner';

export const AuthorizationHandler = (props) => {
  const { user, permissionChecks, children, havePrivilegesLoaded } = props;

  const spinner = <PageLoadingSpinner />;

  if (Config.get('featureLogin')) {
    if (! user) {
      return spinner;
    }
    const profile = user.get('profile');
    const userId = profile.sub;
    const email = profile.email;

    ReactGA.set({ userId });
    Raven.setUserContext({ email, id: userId });
  } else {
    return children;
  }

  if (! havePrivilegesLoaded()) {
    log.debug('PermissionHandler - Will call fetchPrivilegesIfNeeded()');
    props.fetchPrivilegesIfNeeded();
    return spinner;
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

AuthorizationHandler.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.function,
  }),
  permissionChecks: PropTypes.arrayOf(PropTypes.shape({
    canAccess: PropTypes.func.isRequired,
  })),
  children: PropTypes.node,
  havePrivilegesLoaded: PropTypes.func.isRequired,
  fetchPrivilegesIfNeeded: PropTypes.func.isRequired,
};

export function mapStateToProps(state, { routes }) {
  const user = state.get('singleSignOn').get('user');
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

  return { user, permissionChecks, config: ErrorPageConfig.get(routes) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(privilegesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(pure(AuthorizationHandler));
