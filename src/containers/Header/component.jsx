import React from 'react';
import classnames from 'classnames';
import styles from './style.postcss';
import { actions as impersonateActions } from 'containers/Impersonate';
import UserInfo from './UserInfo';
import log from 'loglevel';
import { connect } from 'domain/connect';

const Header = (props) => {
  log.debug('Header - impersonateData', props.impersonate);
  const classes = classnames(styles.Header, { [styles.__impersonating]: props.impersonate });
  return <div className={classes}>
    <div className={classnames(styles.Header_logo)} />
    <UserInfo />
  </div>;
};

Header.propTypes = {
  impersonate: React.PropTypes.object,
};

function mapStateToProps() {
  return { impersonate: impersonateActions.getImpersonate() };
}

export default connect(mapStateToProps)(Header);
