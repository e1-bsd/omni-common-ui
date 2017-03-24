import styles from './style.postcss';
import closeSrc from './close.svg';

import React, { Component } from 'react';
import Link from './Link';
import is from 'is_js';
import { OrderedMap, List, Map } from 'immutable';
import classnames from 'classnames';

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
        .sortBy((item) => item.get('order'));
  }

  static _getColor(props) {
    const { routes } = props;
    const colorConfig = new List(routes).findLast((route) => is.string(route.sidebarColor));
    if (! colorConfig) {
      return undefined;
    }

    return colorConfig.sidebarColor;
  }

  constructor(props) {
    super(props);
    this._items = Sidebar._getItems(props);
    this._color = Sidebar._getColor(props);
    this._onClickedOutside = this._onClickedOutside.bind(this);
  }

  componentDidMount() {
    this._setUp(this.props);
  }

  componentWillUpdate(props) {
    this._items = Sidebar._getItems(props);
    this._color = Sidebar._getColor(props);
    this._setUp(props);
  }

  componentWillUnmount() {
    this._removeClickOutsideEvent();
  }

  _setUp(props) {
    if (props.expanded === true) {
      document.body.addEventListener('click', this._onClickedOutside);
      document.body.addEventListener('touchstart', this._onClickedOutside);
    } else {
      this._removeClickOutsideEvent();
    }
  }

  _removeClickOutsideEvent() {
    document.body.removeEventListener('click', this._onClickedOutside);
    document.body.removeEventListener('touchstart', this._onClickedOutside);
  }

  _onClickedOutside(evt) {
    if (this._node.contains(evt.target)) {
      return;
    }

    this._contract();
  }

  _expand() {
    is.function(this.props.onExpand) && this.props.onExpand();
  }

  _contract() {
    is.function(this.props.onCollapse) && this.props.onCollapse();
  }

  _renderExpanded() {
    if (this.props.expanded !== true) {
      return null;
    }

    const { location: { pathname } } = this.props;
    return <div className={styles.Sidebar_expanded} style={{ backgroundColor: this._color }}>
      <div className={styles.Sidebar_close}>
        <button onClick={() => this._contract()}
            className={styles.Sidebar_close_button}>
          <img src={closeSrc} alt="Close" className={styles.Sidebar_close_button_icon} />
        </button>
      </div>
      {
        this._items.map((config, link) => <Link key={link} to={link} currentPath={pathname}>
          <button className={styles.Sidebar_item}>{config.get('text')}</button>
        </Link>).toArray()
      }
    </div>;
  }

  render() {
    if (this._items.size <= 0) {
      return null;
    }

    const { expanded } = this.props;
    const classes = classnames(styles.Sidebar, { [styles.__expanded]: expanded === true });
    const onClickBar = expanded === true ? undefined : () => this._expand();
    return <div className={classes}
        onClick={onClickBar}
        style={{ backgroundColor: this._color }}
        ref={(c) => { this._node = c; }}>
      {this._renderExpanded()}
    </div>;
  }
}

Sidebar.propTypes = {
  routes: React.PropTypes.array.isRequired,
  location: React.PropTypes.shape({ pathname: React.PropTypes.string.isRequired }).isRequired,
  expanded: React.PropTypes.bool,
  onCollapse: React.PropTypes.func,
  onExpand: React.PropTypes.func,
};

export default Sidebar;
