import styles from './style.postcss';

import React from 'react';

const Logo = (props) => <span className={styles.Logo} { ...props }>
  <img src={props.src} />
</span>;

export default Logo;
