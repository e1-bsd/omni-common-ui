import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as privilegesActions } from 'containers/Privileges';
import log from 'domain/log';
import userManager from './userManager';
import * as actions from './actions';
import Config from 'domain/Config';
import ReactGA from 'react-ga';
import Raven from 'raven-js';

const MockSingleSignOnHandler = (props) => props.children;

MockSingleSignOnHandler.propTypes = {
  children: React.PropTypes.node,
};

class SingleSignOnHandlerImpl extends Component {
  constructor(props) {
    super(props);
    this._onUserLoaded = this._onUserLoaded.bind(this);
    this._onUserUnloaded = this._onUserUnloaded.bind(this);
  }

  componentWillMount() {
    this._setLastUrlPath();
    userManager.events.addUserLoaded(this._onUserLoaded);
    userManager.events.addUserUnloaded(this._onUserUnloaded);
  }

  componentDidMount() {
    this._checkUserAndPrivileges(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._checkUserAndPrivileges(nextProps);
  }

  componentWillUnmount() {
    userManager.events.removeUserLoaded(this._onUserLoaded);
    userManager.events.removeUserUnloaded(this._onUserUnloaded);
  }

  _onUserLoaded(user) {
    log.debug('SingleSignOnHandler - _onUserLoaded');
    this.props.userLoaded(user);
  }

  _onUserUnloaded() {
    log.debug('SingleSignOnHandler - _onUserUnloaded');
    this.props.userUnloaded();
  }

  _checkUserAndPrivileges(props) {
    if (! this._isUserValid()) {
      return this._trySilentSignIn();
    }

    this._logUser(props);
    log.debug('SingleSignOnHandler - Will call fetchPrivilegesIfNeeded()');
    props.fetchPrivilegesIfNeeded();
  }

  _trySilentSignIn() {
    log.debug('SingleSignOnHandler - _trySilentSignIn()');
    return userManager.signinSilent()
        .then(() => log.debug('SingleSignOnHandler - _trySilentSignIn() - Success'))
        .catch((error) => {
          log.error('SingleSignOnHandler - _trySilentSignIn() - Could not sign in', error);
          this._redirectToSignInPage();
        });
  }

  _redirectToSignInPage() {
    return userManager.signinRedirect();
  }

  _logUser(props) {
    if (! props.user) {
      return;
    }

    const user = props.user.profile;
    const userId = user.sub;
    const { email } = user;

    ReactGA.set({ userId });
    Raven.setUserContext({ email, id: userId });
  }

  _setLastUrlPath() {
    sessionStorage.lastUrlPath = location.pathname + location.search;
  }

  _isUserValid() {
    const { user } = this.props;
    return user && ! user.expired;
  }

  render() {
    if (this._isUserValid()) {
      log.debug('SingleSignOnHandler - User is valid', this.props.user);
      return this.props.children;
    }

    return null;
  }
}

SingleSignOnHandlerImpl.propTypes = {
  children: React.PropTypes.node,
  user: React.PropTypes.shape(),
  fetchPrivilegesIfNeeded: React.PropTypes.func.isRequired,
  userLoaded: React.PropTypes.func.isRequired,
  userUnloaded: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const user = state.get('singleSignOn').get('user');
  return { user };
}

function mapDispatchToProps(dispatch) {
  return Object.assign(bindActionCreators(actions, dispatch),
      bindActionCreators(privilegesActions, dispatch));
}

export const SingleSignOnHandler = Config.get('featureLogin') !== true ?
    MockSingleSignOnHandler :
    SingleSignOnHandlerImpl;

export default connect(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
