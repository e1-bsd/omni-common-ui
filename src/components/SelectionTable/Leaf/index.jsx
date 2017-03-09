import React from 'react';

const Leaf = ({ children }) =>
  <div>
    {children}
  </div>;

Leaf.propTypes = {
  children: React.PropTypes.children,
};

export default Leaf;
