import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import ErrorPage from 'components/ErrorPage';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import ErrorPageConfig from 'domain/ErrorPageConfig';
import AlertDialog from 'components/AlertDialog';
import ErrorMessage from 'domain/ErrorMessage';
import Config from 'domain/Config';
import userManager from 'containers/SingleSignOn/userManager';

export class ErrorPageHandler extends PureComponent {
  constructor(props) {
    super(props);
    this._setLastUrlPath = this._setLastUrlPath.bind(this);
    this._shouldShowPopUp = this._shouldShowPopUp.bind(this);
    this._buildMessage = this._buildMessage.bind(this);
    this._cleanErrors = this._cleanErrors.bind(this);
    this._renderChildren = this._renderChildren.bind(this);
    this._renderError = this._renderError.bind(this);
  }

  componentWillUpdate({ location: { pathname: nextPath } }) {
    const { location: { pathname } } = this.props;
    if (pathname !== nextPath) {  // page changed, clear errors
      this._cleanErrors();
    }
  }

  _setLastUrlPath() {
    sessionStorage.lastUrlPath = location.pathname + location.search;
  }

  _shouldShowPopUp() {
    const { erroredApi } = this.props;

    if (Config.get('errorHandlerRendersPopUps') !== true || ! erroredApi) {
      return false;
    }

    const { response, status } = erroredApi.error;
    return is.object(response) && status !== 500;
  }

  _buildMessage() {
    const { erroredApi: { error: { response } } } = this.props;

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

  _cleanErrors() {
    const { erroredApis, clean } = this.props;
    erroredApis.forEach((api) => clean(api.id));
  }

  _renderChildren() {
    const { erroredApi, children } = this.props;

    if (erroredApi && ! this._shouldShowPopUp()) {
      return null; // Because the error page will be rendered.
    }

    return children;
  }

  _renderError() {
    const { erroredApi, config } = this.props;

    if (! erroredApi) {
      return null;
    }

    if (erroredApi.error && erroredApi.error.status === 401) {
      this._setLastUrlPath();
      userManager.forceSignoutRedirect();
      throw new Error('Api called with 401 unauthorized');
    }

    if (this._shouldShowPopUp()) {
      return <AlertDialog isWarning
          content1={this._buildMessage()}
          okButtonContent="OK"
          onButtonClick={this._cleanErrors} />;
    }

    return <ErrorPage erroredApi={erroredApi}
        config={config}
        afterButtonClicked={this._cleanErrors}
        {...this.props} />;
  }

  render() {
    return <div className={styles.ErrorPageHandler}>
      {this._renderError()}
      {this._renderChildren()}
    </div>;
  }
}

ErrorPageHandler.propTypes = {
  config: PropTypes.object,
  erroredApis: PropTypes.shape({
    size: PropTypes.string.func,
    first: PropTypes.string.func,
    forEach: PropTypes.string.func,
  }),
  erroredApi: PropTypes.shape({
    error: PropTypes.shape({
      status: PropTypes.number,
      response: PropTypes.any,
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  clean: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
  children: PropTypes.node,
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
