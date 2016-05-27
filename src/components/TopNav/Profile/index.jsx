import styles from './style.postcss';

import React from 'react';

const Profile = (props) => <span className={styles.Profile} { ...props } />;

export default Profile;
