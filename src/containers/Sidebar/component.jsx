import styles from './style.postcss';

import React from 'react';
import Link from './Link';

const Sidebar = ({ location: { pathname } }) => <div className={styles.sideNavContainer}>
  <Link to="https://www.google.es" currentPath={pathname}>
    <button className={styles.sideNavItem}>
      <span className={styles.sideNavItem_displayName}>ODIN+</span>
    </button>
  </Link>
  <Link to="/group/10616" currentPath={pathname}>
    <button className={styles.sideNavItem}>
      <span className={styles.sideNavItem_displayName}>wat</span>
    </button>
  </Link>
</div>;

Sidebar.propTypes = {
  location: React.PropTypes.shape({ pathname: React.PropTypes.string.isRequired }).isRequired,
};

export default Sidebar;
