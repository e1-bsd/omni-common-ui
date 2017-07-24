import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ExpandableAnimationItem extends PureComponent {

  _setUpHeight(node) {
    this.height = node && node.offsetHeight;
  }

  render() {
    const outerStyle = {
      height: this.props.isExpand ? this.height : 0,
    };
    const innerStyle = {
      marginTop: this.props.isExpand ? 0 : - this.height,
    };
    return <div className={styles.ExpandableAnimationItem} style={outerStyle}>
      <div ref={(node) => this._setUpHeight(node)}
          className={styles.ExpandableAnimationItem_inner}
          style={innerStyle}>
        {this.props.children}
      </div>
    </div>;
  }
}

ExpandableAnimationItem.propTypes = {
  isExpand: PropTypes.bool,
  height: PropTypes.number,
  children: PropTypes.node,
};

export default ExpandableAnimationItem;
