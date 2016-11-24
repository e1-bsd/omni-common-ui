import styles from './style.postcss';

import React from 'react';
import Link from './Link';
import is from 'is_js';
import { OrderedMap, List } from 'immutable';

const Sidebar = ({ routes, location: { pathname } }) => {
  const items = getItems();
  if (items.size <= 0) {
    return null;
  }

  return <div className={styles.Sidebar}>
    {
      items.map(({ text, icon }, link) => <Link to={link} currentPath={pathname}>
        <button className={styles.Sidebar_item}>
          <img src={icon} alt={text} />
          <span className={styles.Sidebar_item_text}>{text}</span>
        </button>
      </Link>)
    }
  </div>;

  function getItems() {
    return new List(routes).reduce((reduction, value) => {
      if (is.not.object(value.sidebar)) {
        return reduction;
      }

      return reduction.merge(value.sidebar);
    }, new OrderedMap());
  }
};

Sidebar.propTypes = {
  routes: React.PropTypes.array.isRequired,
  location: React.PropTypes.shape({ pathname: React.PropTypes.string.isRequired }).isRequired,
};

export default Sidebar;
