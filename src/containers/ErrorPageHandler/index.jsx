import React from 'react';
import ErrorPage from 'components/ErrorPage';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import ErrorPageConfig from 'domain/ErrorPageConfig';
import is from 'is_js';
import AlertDialog from 'components/AlertDialog';

export const ErrorPageHandler = (props) => {
  const { children, config, erroredApis, clean } = props;
  if (erroredApis.size <= 0) {
    return children;
  }

  const cleanErrors = () => erroredApis.forEach((api) => clean(api.id));
  const erroredApi = erroredApis.first();
  const { apiResponse } = erroredApi.error;
  if (is.object(apiResponse) && apiResponse.code !== 500) {
    return <div>
      <AlertDialog iswarning
          content1={apiResponse.message}
          okButtonContent="OK"
          onButtonClick={cleanErrors} />
      {children}
    </div>;
  }

  return <ErrorPage erroredApi={erroredApi}
      config={config}
      afterButtonClicked={cleanErrors}
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
