import styles from './style.postcss';

import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactGA from 'react-ga';
import is from 'is_js';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

class Breadcrumbs extends Component {
  constructor() {
    super();
    this.crumbNodes = {};
    this.state = {
      isIntermediateCrumbsCollapsed: false,
      collapsedAtWidth: null,  // populated below
    };
  }

  componentDidMount() {
    if (! this.props.singleLineMode) return;
    this._updateIntermediateCrumbsCollapsedState();
    window.addEventListener('resize', this.onResizeHandler = debounce(() => {
      this._updateIntermediateCrumbsCollapsedState();
    }, 10), false);
  }

  componentWillReceiveProps() {
    this._updateIntermediateCrumbsCollapsedState();
  }

  componentWillUnmount() {
    if (! this.onResizeHandler) return;
    window.removeEventListener('resize', this.onResizeHandler);
  }

  _updateIntermediateCrumbsCollapsedState() {
    if (! this.listNode) return;
    const expectedHeight =
        Number.parseInt(
          getComputedStyle(this.listNode)
            .getPropertyValue('font-size')
        , 10);
    const { offsetHeight } = this.listNode;
    const containerWidth = this.containerNode.offsetWidth;
    if (this.state.isIntermediateCrumbsCollapsed &&
        (is.not.number(this.state.collapsedAtWidth) ||
        containerWidth > this.state.collapsedAtWidth)) {
      this.setState({
        isIntermediateCrumbsCollapsed: false,
        collapsedAtWidth: null,
      });
    } else if (offsetHeight > expectedHeight + 10 &&  // +10 for wiggle room
        ! this.state.isIntermediateCrumbsCollapsed) {
      // wrapping - collapse intermediate crumbs
      this.setState({
        isIntermediateCrumbsCollapsed: true,
        collapsedAtWidth: containerWidth > this.state.collapsedAtWidth ||
            is.not.number(this.state.collapsedAtWidth) ?
              containerWidth :
              this.state.collapsedAtWidth,
      });
    }
  }

  render() {
    if (! this.props.items || this.props.items.length <= 1) return null;

    // make a copy of props.items so that we can mangle it
    let itemsToRender = this.props.items;
    // push collapsed intermediate crumbs if enabled
    if (this.state.isIntermediateCrumbsCollapsed) {
      itemsToRender = [this.props.items[0]];
      if (this.props.items.length > 2) {
        itemsToRender.push({
          label: '…',
          clickable: false,
        });
      }
      itemsToRender.push(this.props.items[this.props.items.length - 1]);
    }

    return <nav className={classnames(styles.Breadcrumbs, this.props.className, {
      [styles.__collapsedInnerCrumbs]: !! this.state.isIntermediateCrumbsCollapsed,
    })}>
      <ul className={styles.Breadcrumbs_list}
          ref={(_node) => {
            if (! _node) return;
            this.listNode = _node;
            this.containerNode = _node
              .parentElement  // <nav>
              .parentElement; // host
          }}>
        {itemsToRender.map((item, idx) => {
          const indexedCrumbClassName = styles[`Breadcrumbs_crumb_${idx}`];
          const itemClassNames = classnames(styles.Breadcrumbs_crumb, {
            [indexedCrumbClassName]: !! indexedCrumbClassName,
            [styles.__clickable]: !! item.clickable,
          });
          const itemKey = item.label + item.href;
          return <li key={itemKey}
              className={itemClassNames}
              ref={(_node) => { this.crumbNodes[itemKey] = _node; }}>
            {item.clickable ? <Link to={item.href} onClick={onClick}>
              {item.label}
            </Link> : <span>
              {item.label}
            </span>}
          </li>;

          function onClick() {
            ReactGA.event({
              category: 'Navigation',
              action: 'Clicked breadcrumb',
              label: `Clicked breadcrumb ${item.label}`,
            });
          }
        })}
      </ul>
    </nav>;
  }
}

Breadcrumbs.propTypes = {
  className: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    clickable: React.PropTypes.bool.isRequired,
  })).isRequired,
  backHref: React.PropTypes.string.isRequired,
  singleLineMode: React.PropTypes.bool,
};

export default Breadcrumbs;
