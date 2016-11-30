import styles from './style.postcss';

import React from 'react';
import ErrorPage from 'components/ErrorPage';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import is from 'is_js';
import { List } from 'immutable';

export const ErrorPageHandler = (props) => {
  const { children, config, erroredApi, clean } = props;
  if (! ApiCall.State.isValue(erroredApi)) {
    return children;
  }

  return <div className={styles.ErrorPageHandler}>
    <ErrorPage erroredApi={erroredApi}
        config={config}
        afterButtonClicked={() => clean(erroredApi.id)}
        {...props} />
  </div>;
};

ErrorPageHandler.propTypes = {
  children: React.PropTypes.node,
  replace: React.PropTypes.func.isRequired,
  clean: React.PropTypes.func.isRequired,
  erroredApi: React.PropTypes.shape({
    error: React.PropTypes.instanceOf(Error).isRequired,
  }),
  config: React.PropTypes.shape({
    message: React.PropTypes.func,
    buttonText: React.PropTypes.func,
    buttonLink: React.PropTypes.func,
  }),
};

export function mapStateToProps(state, { routes }) {
  return { erroredApi: getApiError(state), config: getConfig(routes) };
}

function mapDispatchToProps(dispatch) {
  return { clean: (key) => dispatch(ApiCall.clean(key)) };
}

function getApiError(state) {
  const erroredApi = state.get('apiCalls').find((call) => ApiCall.State.hasFailed(call));
  if (is.object(erroredApi) && (erroredApi.error instanceof Error)) {
    return erroredApi;
  }

  return undefined;
}

function getConfig(routes) {
  const routeWithConfig = new List(routes).findLast((route) => is.object(route.errorPage));
  if (is.undefined(routeWithConfig)) {
    return undefined;
  }

  return routeWithConfig.errorPage;
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageHandler);
