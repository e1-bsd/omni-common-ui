import React from 'react';
import classnames from 'classnames';
import styles from './style.postcss';
import UserInfo from './UserInfo';
import log from 'domain/log';
import { connect } from 'domain/connect';
import Icon from 'components/Icon';
import is from 'is_js';
import testClass from 'domain/testClass';
import PropTypes from 'prop-types';

const Header = (props) => {
  log.debug('Header - impersonateData', props.impersonate);
  const classes = classnames(styles.Header,
      testClass('header'),
      { [styles.__impersonating]: props.impersonate });
  return <div className={classes}>
    <div className={classnames(styles.Header_burger, testClass('hamburger'))}
        onClick={(e) => is.function(props.onHamburgerClick) && props.onHamburgerClick(e)}>
      <Icon id="burger" />
    </div>
    <div className={styles.Header_logo} />
    <div className={styles.Header_wrap}>
      <UserInfo impersonate={props.impersonate}
          router={props.router}
          routes={props.routes} />
    </div>
  </div>;
};

Header.propTypes = {
  router: PropTypes.any.isRequired,
  routes: PropTypes.array.isRequired,
  impersonate: PropTypes.object,
  onHamburgerClick: PropTypes.func,
};

function mapStateToProps(state) {
  const userProfile = state.get('singleSignOn').user.profile;
  let impersonate;
  if (! userProfile.impersonated_user_email) return { impersonate };

  impersonate = {
    email: userProfile.impersonated_user_email,
    sub: userProfile.impersonated_user_id,
    avatarUrl: userProfile.impersonated_user_avatar_url,
    gender: userProfile.impersonated_user_gender,
    name: userProfile.impersonated_user_name,
    familyName: userProfile.impersonated_user_family_name,
    middleName: userProfile.impersonated_user_middle_name,
    givenName: userProfile.impersonated_user_given_name,
  };
  return { impersonate };
}

export default connect(mapStateToProps, null)(Header);
