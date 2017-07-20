import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class CallbackComponent extends PureComponent {
  componentDidMount() {
    this.props.userManager.signinRedirectCallback()
      .then((user) => this._onRedirectSuccess(user))
      .catch((error) => this._onRedirectError(error));
  }

  _onRedirectSuccess(user) {
    this.props.successCallback(user);
  }

  _onRedirectError(error) {
    if (this.props.errorCallback) {
      this.props.errorCallback(error);
    } else {
      throw new Error(`Error handling redirect callback: ${error.message}`);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

CallbackComponent.propTypes = {
  children: PropTypes.element.isRequired,
  userManager: PropTypes.object.isRequired,
  successCallback: PropTypes.func.isRequired,
  errorCallback: PropTypes.func,
};

export default CallbackComponent;
