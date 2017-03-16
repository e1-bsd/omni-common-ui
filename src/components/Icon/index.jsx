import React from 'react';
import InlineSvg from 'components/InlineSvg';
import icons from './icons';

const Icon = ({ className, id }) => <InlineSvg className={className}>{icons.get(id)}</InlineSvg>;

Icon.propTypes = {
  className: React.PropTypes.string,
  id: React.PropTypes.oneOf(Object.keys(icons.toObject())),
};

export default Icon;
