import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';
import log from 'loglevel';

const SingleSignOnCallback = (props) => {
  return <CallbackComponent successCallback={successCallback} />;

  function successCallback() {
    log.debug('SingleSignOnCallback - lastUrlPath', localStorage.lastUrlPath);
    props.dispatch(push(localStorage.lastUrlPath || ''));
  }
};

SingleSignOnCallback.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(SingleSignOnCallback);
