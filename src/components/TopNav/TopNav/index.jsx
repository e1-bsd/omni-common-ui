import styles from './style.postcss';

import React from 'react';

const TopNav = (props) => <div className={styles.TopNav} { ...props }>
  Hi, This is Top Nav
</div>;

export default TopNav;
