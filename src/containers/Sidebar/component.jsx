import styles from './style.postcss';

import React, { Component } from 'react';
import Link from './Link';
import is from 'is_js';
import { OrderedMap, List, Map } from 'immutable';

class Sidebar extends Component {
  static _getItems(props) {
    const { routes } = props;
    return new List(routes).reduce((reduction, value) => {
      if (is.not.object(value.sidebar)) {
        return reduction;
      }

      return reduction.merge(value.sidebar);
    }, new OrderedMap())
        .filter((item) => item instanceof Map && ! item.isEmpty())
        .sortBy((item) => item.order);
  }

  constructor(props) {
    super(props);
    this._items = Sidebar._getItems(props);
  }

  componentWillReceiveProps(props) {
    this._items = Sidebar._getItems(props);
  }

  render() {
    const { location: { pathname } } = this.props;
    if (this._items.size <= 0) {
      return null;
    }

    return <div className={styles.Sidebar}>
      {
        this._items.map((config, link) => <Link to={link} currentPath={pathname}>
          <button className={styles.Sidebar_item}>
            <span className={styles.Sidebar_item_text}>{config.get('text')}</span>
          </button>
        </Link>)
      }
    </div>;
  }
}

Sidebar.propTypes = {
  routes: React.PropTypes.array.isRequired,
  location: React.PropTypes.shape({ pathname: React.PropTypes.string.isRequired }).isRequired,
};

export default Sidebar;
