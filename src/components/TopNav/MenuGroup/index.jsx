import styles from './style.postcss';

import React from 'react';

const MenuGroup = (props) => <div className={styles.MenuGroup} { ...props }>
  {props.children}
</div>;

MenuGroup.propTypes = {
  children: React.PropTypes.node,
};

export default MenuGroup;
