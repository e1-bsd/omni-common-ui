import React from 'react';

const Header = ({ children }) =>
  <div>
    {children}
  </div>;

Header.propTypes = {
  children: React.PropTypes.node,
};

export default Header;
