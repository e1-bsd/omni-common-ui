import styles from './style.postcss';

import React from 'react';

const TopNav = (props) => <div className={styles.TopNav} { ...props }>
  {props.children}
</div>;

export default TopNav;
