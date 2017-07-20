import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  userExpired,
  userFound,
  silentRenewError,
  sessionTerminated,
  userExpiring,
  userSignedOut,
} from 'data/SingleSignOn/actions';

class OidcProvider extends Component {
  constructor(props) {
    super(props);
    this.userManager = props.userManager;
    this._onUserLoaded = this._onUserLoaded.bind(this);
    this._onSilentRenewError = this._onSilentRenewError.bind(this);
    this._onAccessTokenExpired = this._onAccessTokenExpired.bind(this);
    this._onUserUnloaded = this._onUserUnloaded.bind(this);
    this._onAccessTokenExpiring = this._onAccessTokenExpiring.bind(this);
    this._onAccessTokenExpired = this._onAccessTokenExpired.bind(this);
    this._onUserSignedOut = this._onUserSignedOut.bind(this);
  }

  componentWillMount() {
    // register the event callbacks
    this.userManager.events.addUserLoaded(this._onUserLoaded);
    this.userManager.events.addSilentRenewError(this._onSilentRenewError);
    this.userManager.events.addAccessTokenExpired(this._onAccessTokenExpired);
    this.userManager.events.addAccessTokenExpiring(this._onAccessTokenExpiring);
    this.userManager.events.addUserUnloaded(this._onUserUnloaded);
    this.userManager.events.addUserSignedOut(this._onUserSignedOut);
  }

  componentWillUnmount() {
    // unregister the event callbacks
    this.userManager.events.removeUserLoaded(this._onUserLoaded);
    this.userManager.events.removeSilentRenewError(this._onSilentRenewError);
    this.userManager.events.removeAccessTokenExpired(this._onAccessTokenExpired);
    this.userManager.events.removeAccessTokenExpiring(this._onAccessTokenExpiring);
    this.userManager.events.removeUserUnloaded(this._onUserUnloaded);
    this.userManager.events.removeUserSignedOut(this._onUserSignedOut);
  }

  // event callback when the user has been loaded (on silent renew or redirect)
  _onUserLoaded(user) {
    this.props.store.dispatch(userFound(user));
  }

  // event callback when silent renew errored
  _onSilentRenewError(error) {
    this.props.store.dispatch(silentRenewError(error));
  }

  // event callback when the access token expired
  _onAccessTokenExpired() {
    this.props.store.dispatch(userExpired());
  }

  // event callback when the user is logged out
  _onUserUnloaded() {
    this.props.store.dispatch(sessionTerminated());
  }

  // event callback when the user is expiring
  _onAccessTokenExpiring() {
    this.props.store.dispatch(userExpiring());
  }

  // event callback when the user is signed out
  _onUserSignedOut() {
    this.props.store.dispatch(userSignedOut());
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

OidcProvider.propTypes = {
  userManager: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default OidcProvider;
