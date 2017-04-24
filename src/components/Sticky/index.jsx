/* global FixedSticky */
import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';
import stickybits from 'stickybits';

export class Sticky extends Component {
  componentDidMount() {
    stickybits(this._node, { useStickyClasses: true });
  }

  componentWillUnmount() {
    // TODO Clean up!
  }

  render() {
    return <div className={classnames(styles.Sticky, this.props.className)}
        ref={(n) => { this._node = n; }}>
      <div className={styles.Sticky_wrapper}>{this.props.children}</div>
      <div className={styles.Sticky_placeholder}>{this.props.children}</div>
    </div>;
  }
}

Sticky.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Sticky;
