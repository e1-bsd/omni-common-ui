import React from 'react';
import styles from './style.postcss';
import classnames from 'classnames';

const Profile = (props) => {
  const { src } = props;
  const classes = props.disabled ? classnames(styles.Profile, styles.__disabled) : styles.Profile;
  return <img src={src} role="presentation" className={classes}>
  </img>;
};

Profile.propTypes = {
  src: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

export default Profile;
