import styles from './style.postcss';

import React from 'react';
import ErrorPage from './ErrorPage';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import is from 'is_js';

const ErrorPageHandler = (props) => {
  if (! (props.error instanceof Error)) {
    return props.children;
  }

  return <div className={styles.ErrorPageHandler}><ErrorPage error={props.error} /></div>;
};

ErrorPageHandler.propTypes = {
  children: React.PropTypes.node,
  error: React.PropTypes.instanceOf(Error),
};

function mapStateToProps(state) {
  return { error: getApiError(state) };
}

function getApiError(state) {
  const erroredApi = state.get('apiCalls').find((call) => ApiCall.State.hasFailed(call));
  if (is.object(erroredApi) && (erroredApi.error instanceof Error)) {
    return erroredApi.error;
  }

  return undefined;
}

export default connect(mapStateToProps)(ErrorPageHandler);
