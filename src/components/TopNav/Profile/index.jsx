import styles from './style.postcss';

import React from 'react';

const Profile = (props) => <div className={styles.Profile}>
  <span className={styles.Profile_picture} { ...props } />
</div>;

export default Profile;
