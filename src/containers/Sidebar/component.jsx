import styles from './style.postcss';

import React from 'react';
import PureComponent from 'domain/PureComponent';
import Link from './Link';
import is from 'is_js';
import { OrderedMap, List, Map } from 'immutable';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classnames from 'classnames';
import testClass from 'domain/testClass';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

class Sidebar extends PureComponent {
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
    this._onPageScrolled = this._onPageScrolled.bind(this);
  }

  componentDidMount() {
    this._setUp(this.props);
  }

  componentWillUpdate(props) {
    this._items = Sidebar._getItems(props);
    this._color = Sidebar._getColor(props);
    this._setUp(props);
  }

  componentDidUpdate() {
    this._onPageScrolled();
  }

  componentWillUnmount() {
    this._removeClickOutsideEvents();
    this._removePageSrolledEvents();
  }

  _setUp(props) {
    if (props.expanded === true) {
      this._addClickOutsideEvents();
      this._addPageSrolledEvents();
    } else {
      this._removeClickOutsideEvents();
      this._removePageSrolledEvents();
    }
  }

  _addClickOutsideEvents() {
    document.body.addEventListener('click', this._onClickedOutside);
    document.body.addEventListener('touchstart', this._onClickedOutside);
  }

  _removeClickOutsideEvents() {
    document.body.removeEventListener('click', this._onClickedOutside);
    document.body.removeEventListener('touchstart', this._onClickedOutside);
  }

  _addPageSrolledEvents() {
    document.addEventListener('scroll', this._onPageScrolled);
    document.addEventListener('wheel', this._onPageScrolled);
  }

  _removePageSrolledEvents() {
    document.removeEventListener('scroll', this._onPageScrolled);
    document.removeEventListener('wheel', this._onPageScrolled);
  }

  _onClickedOutside(evt) {
    if (this._node.contains(evt.target)) {
      return;
    }

    this._contract(evt);
  }

  _onPageScrolled() {
    const expandedNode = this._node.querySelector(`.${styles.Sidebar_expanded}`);
    if (! expandedNode) {
      return;
    }

    expandedNode.style.paddingTop = `calc(${styles.headerSize} - ${document.body.scrollTop}px)`;
  }

  _expand(evt) {
    is.function(this.props.onExpand) && this.props.onExpand(evt);
  }

  _contract(evt) {
    is.function(this.props.onCollapse) && this.props.onCollapse(evt);
  }

  _renderExpanded() {
    const { location: { pathname } } = this.props;
    return <div className={classnames(styles.Sidebar_expanded, testClass('sidebar-expanded'))}
        style={{ backgroundColor: this._color }}>
      <div className={styles.Sidebar_close}>
        <button onClick={(e) => this._contract(e)}
            className={classnames(styles.Sidebar_close_button, testClass('sidebar-close'))}>
          <Icon className={styles.Sidebar_close_button_icon} id="close" />
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
    const onClickBar = expanded === true ? undefined : (e) => this._expand(e);
    return <div className={classnames(styles.Sidebar, testClass('sidebar'))}
        onClick={onClickBar}
        style={{ backgroundColor: this._color }}
        ref={(c) => { this._node = c; }}>
      <CSSTransitionGroup transitionName="sidebar">
        {expanded === true && this._renderExpanded()}
      </CSSTransitionGroup>
    </div>;
  }
}

Sidebar.propTypes = {
  routes: PropTypes.array.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  expanded: PropTypes.bool,
  onCollapse: PropTypes.func,
  onExpand: PropTypes.func,
};

export default Sidebar;
