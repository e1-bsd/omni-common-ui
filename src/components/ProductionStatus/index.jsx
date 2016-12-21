import React from 'react';
import ColourLabel from 'components/ColourLabel';

const ProductionStatus = (props) => {
  const { status, initial, highlighted } = props;
  const colour = highlighted === true ? '#0087e6' : undefined;
  return <ColourLabel text={status} initial={initial} colour={colour} />;
};

ProductionStatus.propTypes = {
  className: React.PropTypes.string,
  status: React.PropTypes.string,
  initial: React.PropTypes.string,
  highlighted: React.PropTypes.bool,
  unbreakable: React.PropTypes.bool,
};

export default ProductionStatus;
