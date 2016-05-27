import React from 'react';
import Item from '../Item';
import is from 'is_js';

const Group = (props) => {
  return <div className="row">
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

export default Group;
