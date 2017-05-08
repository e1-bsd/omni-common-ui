import styles from './style.postcss';

import React from 'react';
import Item from '../Item';
import is from 'is_js';
import classnames from 'classnames';

const Group = (props, { grid }) => {
  return <div className={classnames(grid.row, styles.Group)}>
    {buildChildren()}
  </div>;

  function buildChildren() {
    if (is.not.existy(props.children)) {
      return;
    }

    if (is.not.function(props.children.map)) {
      return wrapChildIfNeeded(props.children);
    }

    return props.children.map(wrapChildIfNeeded);
  }

  function wrapChildIfNeeded(child) {
    if (child.type === Item) {
      return child;
    }

    return <Item>{child}</Item>;
  }
};

Group.propTypes = {
  children: React.PropTypes.node,
};

Group.contextTypes = {
  grid: React.PropTypes.object,
};

export default Group;
