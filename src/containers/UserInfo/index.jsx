import styles from './style.postcss';

import React, { Component } from 'react';
import connect from 'domain/connect';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import Impersonate, { actions as impersonateActions } from 'containers/Impersonate';
import userManager from 'containers/SingleSignOn/userManager';
import Permission from 'containers/Permission';
import ApiResponseHelper from 'domain/ApiResponseHelper';
import is from 'is_js';

const {
  setImpersonate,
  getImpersonate,
  removeImpersonate,
  unimpersonateRequest,
} = impersonateActions;

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFeatures: false,
      isShowImpersonate: false,
    };

    this._toggleFeatures.bind(this);
    this._showImpersonateDialog.bind(this);
    this._closeImpersonateDialog.bind(this);
    this._renderImpersonateDialog.bind(this);
    this._handleImpersonateSuccess.bind(this);
    this._onSwitchBackClicked.bind(this);
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
    removeImpersonate();
    this.setState({ impersonateData: undefined });
  }

  _toggleFeatures() {
    this.setState({ isShowFeatures: ! this.state.isShowFeatures });
  }

  _showImpersonateDialog() {
    this.setState({ isShowImpersonate: true, isShowFeatures: false });
  }

  _closeImpersonateDialog() {
    this.setState({ isShowImpersonate: false });
  }

  _handleImpersonateSuccess(data) {
    setImpersonate(data);
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
    if (this.props.impersonateData) {
      return <div className={styles.userInfo_features_item}>
        <div onClick={() => this._onSwitchBackClicked()}>Switch Back</div>
      </div>;
    }

    return <Permission permissionId={CONFIG.impersonatePermission}>
      <div className={styles.userInfo_features_item}>
        <div onClick={() => this._showImpersonateDialog()}>Switch User</div>
      </div>
    </Permission>;
  }

  _renderDropdown() {
    if (this.state.isShowFeatures !== true) {
      return null;
    }

    return <div className={classnames(styles.userInfo_features)}>
      {this._renderImpersonateOption()}
      <div className={classnames(styles.userInfo_features_item,
          styles.userInfo_features_item_last)}>
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
    return <div className={styles.userInfo}>
      <div className={styles.userInfo_container} onClick={() => this._toggleFeatures()}>
        <div className={classnames(styles.userInfo_container_expand,
            { [styles.userInfo_container_expand_impersonate]: this.props.impersonateData })} />
        <div className={classnames(styles.userInfo_container_username,
            { [styles.userInfo_container_username_impersonate]: this.props.impersonateData })}>
          {userName}
          {this.props.impersonateData ? ` as ${this.props.impersonateData.userName}` : ''}
        </div>
      </div>
      {this._renderDropdown()}
      {this._renderImpersonateDialog()}
    </div>;
  }
}

UserInfo.propTypes = {
  impersonateData: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    impersonateData: getImpersonate(),
    privileges: state.get('privileges'),
    user: state.get('singleSignOn').user,
    unimpersonateState: state.get('impersonate')
      .get('unimpersonate')
      .get('unimpersonate'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    unimpersonate: () => dispatch(unimpersonateRequest()),
  };
}

UserInfo.propTypes = {
  user: React.PropTypes.object,
  privileges: React.PropTypes.object,
  unimpersonateState: React.PropTypes.object,
  unimpersonate: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
