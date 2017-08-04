import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const PaceSpinner = ({ className, isShown }) => {
  // only show one at a time.
  if (document.querySelector('.pace:not(.pace-inactive)')) {
    return null;
  }
  return <div className={classnames('pace', className, {
    'pace-inactive': ! isShown,
    'pace-active': !! isShown,
  })}>
    <div className="pace-activity" />
  </div>;
};

PaceSpinner.propTypes = {
  className: PropTypes.string,
  isShown: PropTypes.bool,
};

export default PaceSpinner;
