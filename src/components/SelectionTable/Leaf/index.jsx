import React from 'react';
import PropTypes from 'prop-types';

const Leaf = ({ children }) =>
  <div>
    {children}
  </div>;

Leaf.propTypes = {
  children: PropTypes.node,
};

export default Leaf;
