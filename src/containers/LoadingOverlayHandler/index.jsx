import React, { Component } from 'react';
import classnames from 'classnames';
import is from 'is_js';

import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';

const HTTP_METHOD_TRIGGERS = 'GET';
const REQUEST_DURATION_THRESHOLD_MS = 100;

class LoadingOverlayHandler extends Component {
  constructor() {
    super();
    this.state = { isThrobberShown: false };
  }

  componentWillReceiveProps(nextProps) {
    const { isApiCallsLoadingBeyondThreshold, isAnyApiCallLoading } = nextProps;
    if (isApiCallsLoadingBeyondThreshold) {
      this.setState({ isThrobberShown: true });
    } else if (isAnyApiCallLoading) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const { loadingApiCalls } = this.props;
        if (! getIsApiCallsLoadingBeyondThreshold(loadingApiCalls)) return;
        this.setState({ isThrobberShown: true });
      }, REQUEST_DURATION_THRESHOLD_MS);
    } else if (! isAnyApiCallLoading) {
      clearTimeout(this.timer);
      this.setState({ isThrobberShown: false });
    }
  }

  render() {
    const { children } = this.props;
    const classes = {
      pace: true,
      'pace-inactive': ! this.state.isThrobberShown,
    };
    return <div>
      <div className={classnames(classes)}>
        <div className="pace-activity" />
      </div>
      {children}
    </div>;
  }
}

LoadingOverlayHandler.propTypes = {
  loadingApiCalls: React.PropTypes.shape({
    filter: React.PropTypes.func,
  }),
  isAnyApiCallLoading: React.PropTypes.bool.isRequired,
  isApiCallsLoadingBeyondThreshold: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired,
};

function mapStateToProps(state) {
  const loadingApiCalls = getLoadingApiCalls(state);
  const isApiCallsLoadingBeyondThreshold =
      Boolean(loadingApiCalls && getIsApiCallsLoadingBeyondThreshold(loadingApiCalls));
  return {
    loadingApiCalls,
    isAnyApiCallLoading: !! loadingApiCalls,
    isApiCallsLoadingBeyondThreshold,
  };
}

function getLoadingApiCalls(state) {
  const loadingApiCalls = state.get('apiCalls')
    .filter((call, key) => key.startsWith(HTTP_METHOD_TRIGGERS))
    .filter((call) => ApiCall.State.isLoading(call));
  if (is.object(loadingApiCalls) && loadingApiCalls.size) {
    return loadingApiCalls;
  }
  return null;
}

function getIsApiCallsLoadingBeyondThreshold(apiCalls) {
  if (! apiCalls) return false;
  return !! apiCalls.filter((call) =>
      new Date().getTime() - call.timestamp.getTime() >= REQUEST_DURATION_THRESHOLD_MS)
    .find(() => true);
}

export default connect(mapStateToProps)(LoadingOverlayHandler);
