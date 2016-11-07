import styles from './style.postcss';

import React, { Component } from 'react';
import connect from 'domain/connect';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import Impersonate from 'containers/Impersonate';
import userManager from 'containers/SingleSignOn/userManager';
import Permission from 'containers/Permission';
import ApiResponseHelper from 'domain/ApiResponseHelper';
import is from 'is_js';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isShowImpersonate: false,
    };
  }

  _onLogoutButtonClicked() {
    event.preventDefault();
    userManager.signoutRedirect();
  }

  _redirectToPortal() {
    window.location = '/portal';
  }

  _onSwitchBackClicked() {
    this.props.unimpersonate();
    this.props.removeImpersonate();
    this.setState({ impersonateData: undefined });
  }

  _toggleFeatures() {
    this.setState({ isDropdownOpen: ! this.state.isDropdownOpen });
  }

  _showImpersonateDialog() {
    this.setState({ isShowImpersonate: true, isDropdownOpen: false });
  }

  _closeImpersonateDialog() {
    this.setState({ isShowImpersonate: false });
  }

  _handleImpersonateSuccess(data) {
    this.props.setImpersonate(data);
    this._redirectToPortal();
  }

  _renderImpersonateDialog() {
    if (! this.state.isShowImpersonate) {
      return null;
    }
    return <div>
      <Dialog isOpen={this.state.isShowImpersonate}>
        <Impersonate close={() => this._closeImpersonateDialog()}
            success={(data) => this._handleImpersonateSuccess(data)} />
      </Dialog>
    </div>;
  }

  _renderImpersonateOption() {
    if (this.props.impersonate) {
      return <div className={styles.UserInfo_features_item}>
        <div onClick={() => this._onSwitchBackClicked()}>Switch Back</div>
      </div>;
    }

    return <Permission permissionId={CONFIG.impersonatePermission}>
      <div className={styles.UserInfo_features_item}>
        <div onClick={() => this._showImpersonateDialog()}>Switch User</div>
      </div>
    </Permission>;
  }

  _renderDropdown() {
    if (this.state.isDropdownOpen !== true) {
      return null;
    }

    return <div className={classnames(styles.UserInfo_features)}>
      {this._renderImpersonateOption()}
      <div className={classnames(styles.UserInfo_features_item,
          styles.UserInfo_features_item_last)}>
        <div onClick={this._onLogoutButtonClicked}>Log Out</div>
      </div>
    </div>;
  }

  render() {
    const { privileges, unimpersonateState } = this.props;
    const errorCode = unimpersonateState ? unimpersonateState.get('error') : undefined;
    const data = unimpersonateState ? unimpersonateState.get('data') : undefined;

    if (errorCode || data) {
      this._redirectToPortal();
    }

    if (is.not.object(this.props.user) || ! ApiResponseHelper.hasSucceeded(privileges)) {
      return null;
    }

    const userName = this.props.user.profile.name;
    return <div className={classnames(styles.UserInfo,
        { [styles.__impersonating]: this.props.impersonate })}>
      <div className={styles.UserInfo_container} onClick={() => this._toggleFeatures()}>
        <div className={classnames(styles.UserInfo_container_expand)} />
        <div className={classnames(styles.UserInfo_container_username)}>
          {userName}
          {this.props.impersonate ? ` as ${this.props.impersonate.userName}` : ''}
        </div>
      </div>
      {this._renderDropdown()}
      {this._renderImpersonateDialog()}
    </div>;
  }
}

UserInfo.propTypes = {
  setImpersonate: React.PropTypes.func.isRequired,
  removeImpersonate: React.PropTypes.func.isRequired,
  unimpersonate: React.PropTypes.func,
  impersonate: React.PropTypes.object,
  privileges: React.PropTypes.object,
  unimpersonateState: React.PropTypes.object,
  user: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    privileges: state.get('privileges'),
    user: state.get('singleSignOn').user,
    unimpersonateState: state.get('impersonate')
      .get('unimpersonate')
      .get('unimpersonate'),
  };
}

export default connect(mapStateToProps)(UserInfo);
