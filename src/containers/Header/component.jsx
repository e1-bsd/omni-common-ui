import React from 'react';
import classnames from 'classnames';
import styles from './style.postcss';
import { actions as impersonateActions } from 'containers/Impersonate';
import UserInfo from './UserInfo';
import log from 'domain/log';
import { connect } from 'domain/connect';
import { bindActionCreators } from 'redux';
import Icon from 'components/Icon';

const Header = (props) => {
  log.debug('Header - impersonateData', props.impersonate);
  const classes = classnames(styles.Header, { [styles.__impersonating]: props.impersonate });
  return <div className={classes}>
    <div className={styles.Header_burger}><Icon id="burger" /></div>
    <div className={styles.Header_logo} />
    <div className={styles.Header_wrap}>
      <UserInfo impersonate={props.impersonate}
          setImpersonate={props.setImpersonate}
          removeImpersonate={props.removeImpersonate}
          unimpersonate={props.unimpersonate}
          router={props.router}
          routes={props.routes} />
    </div>
  </div>;
};

Header.propTypes = {
  router: React.PropTypes.any.isRequired,
  routes: React.PropTypes.array.isRequired,
  setImpersonate: React.PropTypes.func.isRequired,
  removeImpersonate: React.PropTypes.func.isRequired,
  unimpersonate: React.PropTypes.func.isRequired,
  impersonate: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(impersonateActions, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    impersonate: dispatchProps.getImpersonate(),
  });
}

export default connect(null, mapDispatchToProps, mergeProps)(Header);
