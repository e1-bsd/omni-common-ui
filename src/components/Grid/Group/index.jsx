import React from 'react';

const Group = (props) => {
  return <div className="row">
    {props.children}
  </div>;
};

export default Group;
