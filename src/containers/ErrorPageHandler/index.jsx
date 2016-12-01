import React from 'react';
import ErrorPage from 'components/ErrorPage';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import ErrorPageConfig from 'domain/ErrorPageConfig';

export const ErrorPageHandler = (props) => {
  const { children, config, erroredApis, clean } = props;
  if (erroredApis.size <= 0) {
    return children;
  }

  return <ErrorPage erroredApi={erroredApis.get(0)}
      config={config}
      afterButtonClicked={() => erroredApis.forEach((erroredApi) => clean(erroredApi.id))}
      {...props} />;
};

ErrorPageHandler.propTypes = {
  children: React.PropTypes.node,
  replace: React.PropTypes.func.isRequired,
  clean: React.PropTypes.func.isRequired,
  erroredApis: React.PropTypes.object,
  config: React.PropTypes.object,
};

export function mapStateToProps(state, { routes }) {
  return { erroredApis: getApiErrors(state), config: ErrorPageConfig.get(routes) };
}

function mapDispatchToProps(dispatch) {
  return { clean: (key) => dispatch(ApiCall.clean(key)) };
}

function getApiErrors(state) {
  return state.get('apiCalls').filter((call) => ApiCall.State.hasFailed(call)).toList();
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageHandler);
