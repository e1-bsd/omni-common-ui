import React from 'react';

const InlineSvg = ({ children, className }) =>
  <i className={className} dangerouslySetInnerHTML={{ __html: children }} />;

InlineSvg.propTypes = {
  children: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default InlineSvg;
