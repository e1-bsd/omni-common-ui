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
      impersonateData: getImpersonate(),
    };

    this._toggleFeatures.bind(this);
    this._showImpersonateDialog.bind(this);
    this._closeImpersonateDialog.bind(this);
    this._renderImpersonateDialog.bind(this);
    this._handleImpersonateSuccess.bind(this);
    this._onSwitchBackClicked.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ impersonateData: getImpersonate() });
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
            this.state.impersonateData ? styles.userInfo_container_expand_impersonate : null)} />
        <div className={classnames(styles.userInfo_container_username,
            this.state.impersonateData ? styles.userInfo_container_username_impersonate : null)}>
          {userName}
          {this.state.impersonateData ? ` as ${this.state.impersonateData.userName}` : ''}
        </div>
      </div>
      <div className={classnames(styles.userInfo_features,
          this.state.isShowFeatures ? '' : styles.userInfo_hide)}>
        {
          this.state.impersonateData ?
            <div className={styles.userInfo_features_item}>
              <div onClick={() => this._onSwitchBackClicked()}>Switch Back</div>
            </div> :
            <Permission permissionId={CONFIG.impersonatePermission}>
              <div className={styles.userInfo_features_item}>
                <div onClick={() => this._showImpersonateDialog()}>Switch User</div>
              </div>
            </Permission>
        }
        <div className={classnames(styles.userInfo_features_item,
            styles.userInfo_features_item_last)}>
          <div onClick={this._onLogoutButtonClicked}>Log Out</div>
        </div>
      </div>
      {this._renderImpersonateDialog()}
    </div>;
  }
}

function mapStateToProps(state) {
  return {
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
