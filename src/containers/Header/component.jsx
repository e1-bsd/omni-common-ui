import React from 'react';
import classnames from 'classnames';
import styles from './style.postcss';
import { actions as impersonateActions } from 'containers/Impersonate';
import UserInfo from './UserInfo';
import log from 'loglevel';
import { connect } from 'domain/connect';
import { bindActionCreators } from 'redux';

const Header = (props) => {
  log.debug('Header - impersonateData', props.impersonate);
  const classes = classnames(styles.Header, { [styles.__impersonating]: props.impersonate });
  return <div className={classes}>
    <div className={classnames(styles.Header_logo)} />
    <UserInfo impersonate={props.impersonate}
        setImpersonate={props.setImpersonate}
        removeImpersonate={props.removeImpersonate}
        unimpersonate={props.unimpersonate} />
  </div>;
};

Header.propTypes = {
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
