import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import is from 'is_js';

import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import Config from 'domain/Config';
import testClass from 'domain/testClass';
import PaceSpinner from 'components/PaceSpinner';

const HTTP_METHOD_TRIGGERS = 'GET';
const REQUEST_DURATION_THRESHOLD_MS = 100;

// config feature flag
const IS_ACTIVE = !! Config.get('showLoadingOverlayForApiGets');

class LoadingOverlayHandler extends PureComponent {
  constructor() {
    super();
    this.state = { isThrobberVisible: false };
  }

  componentDidMount() {
    this._updateState();
  }

  componentWillReceiveProps(nextProps) {
    this._updateState(nextProps);
  }

  _updateState(props = this.props) {
    const { isAnyApiCallLoadingBeyondThreshold, isAnyApiCallLoading } = props;
    if (! IS_ACTIVE) return; // CONFIG flag check
    if (isAnyApiCallLoadingBeyondThreshold) {
      this.setState({ isThrobberVisible: true });
    } else if (isAnyApiCallLoading) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const { loadingApiCalls } = this.props;
        if (! getIsAnyApiCallLoadingBeyondThreshold(loadingApiCalls)) return;
        this.setState({ isThrobberVisible: true });
      }, REQUEST_DURATION_THRESHOLD_MS);
    } else if (! isAnyApiCallLoading) {
      clearTimeout(this.timer);
      this.setState({ isThrobberVisible: false });
    }
  }

  render() {
    const { children } = this.props;
    const classes = classnames({
      [testClass('is-any-api-call-loading')]: this.props.isAnyApiCallLoading,
    });
    return <div className={styles.LoadingOverlayHandler}>
      <PaceSpinner className={classes}
          isShown={this.state.isThrobberVisible} />
      {children}
    </div>;
  }
}

LoadingOverlayHandler.propTypes = {
  loadingApiCalls: PropTypes.shape({
    filter: PropTypes.func,
  }),
  isAnyApiCallLoading: PropTypes.bool.isRequired,
  isAnyApiCallLoadingBeyondThreshold: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

function mapStateToProps(state) {
  const loadingApiCalls = getLoadingApiCalls(state);
  const isAnyApiCallLoadingBeyondThreshold =
      Boolean(loadingApiCalls && getIsAnyApiCallLoadingBeyondThreshold(loadingApiCalls));
  return {
    loadingApiCalls,
    isAnyApiCallLoading: !! loadingApiCalls,
    isAnyApiCallLoadingBeyondThreshold,
  };
}

function getLoadingApiCalls(state) {
  const loadingApiCalls = state.get('apiCalls')
    .filter((call, key) => key.startsWith(HTTP_METHOD_TRIGGERS))
    .filter((call) => ApiCall.State.isLoading(call))
    .filter((call) => ! call.disableDefault);
  if (is.object(loadingApiCalls) && loadingApiCalls.size) {
    return loadingApiCalls;
  }
  return null;
}

function getIsAnyApiCallLoadingBeyondThreshold(apiCalls) {
  if (! apiCalls) return false;
  return !! apiCalls.filter((call) =>
      new Date().getTime() - call.timestamp.getTime() >= REQUEST_DURATION_THRESHOLD_MS)
    .find(() => true);
}

export default connect(mapStateToProps)(LoadingOverlayHandler);
