import React from 'react';
import Item from '../Item';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Group = (props, { grid }) => {
  return <div className={classnames(grid.row, props.className)}>
    {buildChildren()}
  </div>;

  function buildChildren() {
    return React.Children.map(props.children, wrapChildIfNeeded);
  }

  function wrapChildIfNeeded(child) {
    if (! child) {
      return null;
    }

    if (child.type === Item) {
      return child;
    }

    return <Item>{child}</Item>;
  }
};

Group.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Group.contextTypes = {
  grid: PropTypes.object,
};

export default Group;
