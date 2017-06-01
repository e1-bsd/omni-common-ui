import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { replace } from 'react-router-redux';
import log from 'domain/log';
import PropTypes from 'prop-types';

const SingleSignOnCallback = (props) => {
  log.debug('SingleSignOnCallback - called!');
  return <CallbackComponent successCallback={successCallback} errorCallback={errorCallback} />;

  function successCallback() {
    log.debug('SingleSignOnCallback - lastUrlPath', sessionStorage.lastUrlPath);
    redirect();
  }

  function errorCallback(error) {
    log.error('SingleSignOnCallback - errorCallback', error);
    redirect();
  }

  function redirect() {
    props.dispatch(replace(sessionStorage.lastUrlPath || ''));
  }
};

SingleSignOnCallback.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(pure(SingleSignOnCallback));
