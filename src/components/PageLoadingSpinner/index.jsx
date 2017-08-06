import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const PageLoadingSpinner = ({ className, isHidden, isAbsolutePositioned }) => {
  // only show one at a time.
  if (document.querySelector('.pace:not(.pace-inactive)')) {
    return null;
  }
  return <div style={{ position: isAbsolutePositioned ? 'absolute' : 'fixed' }}
      className={classnames('pace', className, {
        'pace-inactive': !! isHidden,
        'pace-active': ! isHidden,
      })}>
    <div className="pace-activity" />
  </div>;
};

PageLoadingSpinner.propTypes = {
  className: PropTypes.string,
  isHidden: PropTypes.bool,
  isAbsolutePositioned: PropTypes.bool,
};

export default PageLoadingSpinner;
