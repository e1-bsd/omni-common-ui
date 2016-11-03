import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as privilegesActions } from 'containers/Privileges';
import userManager from './userManager';
import log from 'loglevel';
import routes from './routes';

const MockSingleSignOnHandler = (props) => props.children;

MockSingleSignOnHandler.propTypes = {
  children: React.PropTypes.node,
};

class SingleSignOnHandler extends Component {
  constructor(props) {
    super(props);
    this._onUserIsExpiring.bind(this);
  }

  componentDidMount() {
    this._checkUser(this.props);
    this._checkPrivileges(this.props);
    userManager.events.addAccessTokenExpiring(this._onUserIsExpiring);
  }

  componentWillReceiveProps(nextProps) {
    this._checkUser(nextProps);
    this._checkPrivileges(nextProps);
  }

  componentWillUnmount() {
    userManager.events.removeAccessTokenExpired(this._onUserIsExpiring);
  }

  _checkUser(props) {
    const { user } = props;
    if (! user || user.expired) {
      this._setLastUrlPath();
      log.debug('SingleSignOnHandler - User is not valid', user);
      log.debug('SingleSignOnHandler - lastUrlPath', localStorage.lastUrlPath);
      userManager.signinRedirect();
      return;
    }
  }

  _checkPrivileges(props) {
    const { user } = props;

    if (user && ! user.expired) {
      log.debug('SingleSignOnHandler - Will call fetchPrivilegesIfNeeded()');
      props.fetchPrivilegesIfNeeded();
    }
  }

  _onUserIsExpiring() {
    userManager.signoutRedirect();
  }

  _setLastUrlPath() {
    if (location.pathname === routes.path) {
      log.debug(`SingleSignOnHandler - New lastUrlPath is ${routes.path}. Will not modify it.`);
      return;
    }

    localStorage.lastUrlPath = location.pathname + location.search;
  }

  render() {
    const { user } = this.props;
    if (user && ! user.expired) {
      log.debug('SingleSignOnHandler - User is valid', user);
      return this.props.children;
    }

    return null;
  }
}

SingleSignOnHandler.propTypes = {
  children: React.PropTypes.node,
  user: React.PropTypes.object,
  fetchPrivilegesIfNeeded: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const user = state.get('singleSignOn').user;
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(privilegesActions, dispatch);
}

export default CONFIG.featureLogin !== true ?
    MockSingleSignOnHandler :
    connect(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
