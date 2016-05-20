import styles from './style.postcss';

import React from 'react';

const MenuGroup = (props) => <div className={styles.MenuGroup} { ...props }>
  {props.children}
</div>;

export default MenuGroup;
