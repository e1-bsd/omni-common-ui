import React from 'react';
import styles from './style.postcss';

const Profile = (props) => {
  const { src } = props;
  return <img src={src} role="presentation" className={styles.Profile}>
  </img>;
};

Profile.propTypes = {
  src: React.PropTypes.string,
};

export default Profile;
