/* global FixedSticky */
import styles from './style.postcss';

import React, { Component } from 'react';
import jQuery from 'jquery';
import classnames from 'classnames';

FixedSticky.tests.sticky = false; // Disregards all native 'sticky' implementations.

export class Sticker extends Component {
  componentDidMount() {
    jQuery(this._node).fixedsticky();
  }

  componentWillUnmount() {
    jQuery(this._node).fixedsticky('destroy');
  }

  render() {
    return <div className={classnames(styles.Sticker, this.props.className)}
        ref={(n) => { this._node = n; }}>
      {this.props.children}
    </div>;
  }
}

Sticker.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Sticker;
