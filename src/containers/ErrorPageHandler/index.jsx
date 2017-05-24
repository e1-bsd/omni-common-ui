import styles from './style.postcss';
import React from 'react';
import ErrorPage from 'components/ErrorPage';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import ErrorPageConfig from 'domain/ErrorPageConfig';
import is from 'is_js';
import AlertDialog from 'components/AlertDialog';
import ErrorMessage from 'domain/ErrorMessage';
import Config from 'domain/Config';
import userManager from 'containers/SingleSignOn/userManager';
import PropTypes from 'prop-types';

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

    if (erroredApi.error && erroredApi.error.status === 401) {
      setLastUrlPath();
      userManager.forceSignoutRedirect();
      throw new Error('Api called with 401 unauthorized');
    }

    if (shouldShowPopUp()) {
      const { response } = erroredApi.error;
      return <AlertDialog isWarning
          content1={buildMessage(response)}
          okButtonContent="OK"
          onButtonClick={cleanErrors} />;
    }

    return <ErrorPage erroredApi={erroredApi}
        config={config}
        afterButtonClicked={cleanErrors}
        {...props} />;
  }

  function setLastUrlPath() {
    sessionStorage.lastUrlPath = location.pathname + location.search;
  }

  function renderChildren() {
    if (erroredApi && ! shouldShowPopUp()) {
      return null; // Because the error page will be rendered.
    }

    return children;
  }

  function shouldShowPopUp() {
    if (Config.get('errorHandlerRendersPopUps') !== true || ! erroredApi) {
      return false;
    }

    const { response, status } = erroredApi.error;
    return is.object(response) && status !== 500;
  }

  function buildMessage(response) {
    let message = ErrorMessage.for(response.errorCode) || response.message;

    // To handle the pattern of exception response from the end point of identity server
    // which return { error: string }
    if (! message && response.error) {
      message = response.error;
      return message;
    }

    if (is.not.array(response.args)) {
      return message;
    }

    response.args.forEach((arg) => {
      message = message.replace(/{".*"}/i, arg);
    });

    return message;
  }
};

ErrorPageHandler.propTypes = {
  children: PropTypes.node,
  replace: PropTypes.func.isRequired,
  clean: PropTypes.func.isRequired,
  erroredApis: PropTypes.object,
  erroredApi: PropTypes.object,
  config: PropTypes.object,
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
  return ApiCall.getErrors(state).toList();
}

function getApiError(erroredApis) {
  if (erroredApis.size <= 0) {
    return undefined;
  }

  return erroredApis.first();
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageHandler);
