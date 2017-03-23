import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import userManager from './userManager';

class SingleSignOnRedirectCallback extends Component {
  componentDidMount() {
    userManager.signinRedirectCallback() // TODO What if it fails?
        .then(() => {
          this.props.dispatch(replace(sessionStorage.lastUrlPath || ''));
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
