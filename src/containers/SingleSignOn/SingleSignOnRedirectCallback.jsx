import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import userManager from './userManager';
import log from 'domain/log';

class SingleSignOnRedirectCallback extends Component {
  componentDidMount() {
    log.debug('SingleSignOnRedirectCallback - componentDidMount()');
    userManager.signinRedirectCallback()
        .then(() => {
          log.debug('SingleSignOnRedirectCallback - Success');
          this.props.dispatch(replace(sessionStorage.lastUrlPath || ''));
        })
        .catch((error) => {
          log.error('SingleSignOnRedirectCallback - Could not sign in', error);
          return userManager.signoutRedirect();
        });
  }

  render() {
    return null;
  }
}

SingleSignOnRedirectCallback.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(SingleSignOnRedirectCallback);
