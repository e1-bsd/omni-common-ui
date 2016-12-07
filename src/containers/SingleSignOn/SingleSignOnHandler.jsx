import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as privilegesActions } from 'containers/Privileges';
import log from 'loglevel';
import routes from './routes';
import userManager from './userManager';
import Config from 'domain/Config';

const MockSingleSignOnHandler = (props) => props.children;

MockSingleSignOnHandler.propTypes = {
  children: React.PropTypes.node,
};

class SingleSignOnHandler extends Component {
  componentWillMount() {
    this._setLastUrlPath();
  }

  componentDidMount() {
    this._checkUserAndPrivileges(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._checkUserAndPrivileges(nextProps);
  }

  _checkUserAndPrivileges(props) {
    if (! this._isUserValid()) {
      return userManager.signinRedirect();
    }

    log.debug('SingleSignOnHandler - Will call fetchPrivilegesIfNeeded()');
    props.fetchPrivilegesIfNeeded();
  }

  _setLastUrlPath() {
    if (location.pathname === routes.path) {
      log.debug(`SingleSignOnHandler - New lastUrlPath is ${routes.path}. Will not modify it.`);
      return;
    }

    localStorage.lastUrlPath = location.pathname + location.search;
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

export default Config.get('featureLogin') !== true ?
    MockSingleSignOnHandler :
    connect(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
