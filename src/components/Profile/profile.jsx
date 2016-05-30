import React from 'react';
import styles from './style.postcss';

const Profile = (props) => {
  const { src } = props;
  return <span src={src} className={styles.Profile}>

  </span>;
};

Profile.propTypes = {
  src: React.PropTypes.string,
};

export default Profile;
