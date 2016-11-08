import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { replace } from 'react-router-redux';
import log from 'loglevel';

const SingleSignOnCallback = (props) => {
  log.debug('SingleSignOnCallback - called!');
  return <CallbackComponent successCallback={successCallback} errorCallback={errorCallback} />;

  function successCallback() {
    log.debug('SingleSignOnCallback - lastUrlPath', localStorage.lastUrlPath);
    redirect();
  }

  function errorCallback(error) {
    log.error('SingleSignOnCallback - errorCallback', error);
    redirect();
  }

  function redirect() {
    props.dispatch(replace(localStorage.lastUrlPath || ''));
  }
};

SingleSignOnCallback.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(SingleSignOnCallback);
