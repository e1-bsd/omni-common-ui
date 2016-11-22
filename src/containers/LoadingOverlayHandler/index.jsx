/* global Pace: true */

import React from 'react';
import log from 'loglevel';
import is from 'is_js';

import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';

const LoadingOverlayHandler = ({ isAnyApiCallLoading, children }) => {
  const { Pace } = window;
  if (isAnyApiCallLoading) {
    log.debug('Loading throbber restarted unless running.');
    Pace && (Pace.running || Pace.restart());
  }
  return children;
};

LoadingOverlayHandler.propTypes = {
  children: React.PropTypes.node,
  isAnyApiCallLoading: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return { isAnyApiCallLoading: getIsAnyApiCallLoading(state) };
}

function getIsAnyApiCallLoading(state) {
  const loadingApi = state.get('apiCalls')
    .filter((call, key) => key.startsWith('GET'))
    .find((call) => ApiCall.State.isLoading(call));
  if (is.object(loadingApi)) {
    return true;
  }
  return false;
}

export default connect(mapStateToProps)(LoadingOverlayHandler);