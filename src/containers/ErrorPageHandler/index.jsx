import styles from './style.postcss';
import React from 'react';
import ErrorPage from 'components/ErrorPage';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import ErrorPageConfig from 'domain/ErrorPageConfig';
import is from 'is_js';
import AlertDialog from 'components/AlertDialog';
import ErrorMessage from 'domain/ErrorMessage';

export const ErrorPageHandler = (props) => {
  const { children, config, erroredApis, erroredApi, clean } = props;
  const cleanErrors = () => erroredApis.forEach((api) => clean(api.id));

  return <div className={styles.ErrorPageHandler}>
    {renderError()}
    {renderChildren()}
  </div>;

  function renderError() {
    if (! erroredApi) {
      return null;
    }

    if (shouldShowPopUp()) {
      const { apiResponse } = erroredApi.error;
      return <AlertDialog iswarning
          content1={buildMessage(apiResponse)}
          okButtonContent="OK"
          onButtonClick={cleanErrors} />;
    }

    return <ErrorPage erroredApi={erroredApi}
        config={config}
        afterButtonClicked={cleanErrors}
        {...props} />;
  }

  function renderChildren() {
    if (erroredApi && ! shouldShowPopUp()) {
      return null; // Because the error page will be rendered.
    }

    return children;
  }

  function shouldShowPopUp() {
    if (! erroredApi) {
      return false;
    }

    const { apiResponse } = erroredApi.error;
    return is.object(apiResponse) && apiResponse.code !== 500;
  }

  function buildMessage(apiResponse) {
    let message = ErrorMessage.for(apiResponse.errorCode) || apiResponse.message;
    if (is.not.array(apiResponse.args)) {
      return message;
    }

    apiResponse.args.forEach((arg) => {
      message = message.replace(/{".*"}/i, arg);
    });

    return message;
  }
};

ErrorPageHandler.propTypes = {
  children: React.PropTypes.node,
  replace: React.PropTypes.func.isRequired,
  clean: React.PropTypes.func.isRequired,
  erroredApis: React.PropTypes.object,
  erroredApi: React.PropTypes.object,
  config: React.PropTypes.object,
};

export function mapStateToProps(state, { routes }) {
  const erroredApis = getApiErrors(state);
  const erroredApi = getApiError(erroredApis);
  return { erroredApis, erroredApi, config: ErrorPageConfig.get(routes) };
}

function mapDispatchToProps(dispatch) {
  return { clean: (key) => dispatch(ApiCall.clean(key)) };
}

function getApiErrors(state) {
  return state.get('apiCalls').filter((call) => ApiCall.State.hasFailed(call)).toList();
}

function getApiError(erroredApis) {
  if (erroredApis.size <= 0) {
    return undefined;
  }

  return erroredApis.first();
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageHandler);
