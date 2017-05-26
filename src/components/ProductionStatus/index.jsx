import React from 'react';
import pure from 'recompose/pure';
import ColourLabel from 'components/ColourLabel';
import PropTypes from 'prop-types';

const ProductionStatus = (props) => {
  const { status, initial, highlighted } = props;
  const colour = highlighted === true ? '#0087e6' : '#c8c8c8';
  return <ColourLabel text={status} initial={initial} colour={colour} />;
};

ProductionStatus.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string,
  initial: PropTypes.string,
  highlighted: PropTypes.bool,
  unbreakable: PropTypes.bool,
};

export default pure(ProductionStatus);
