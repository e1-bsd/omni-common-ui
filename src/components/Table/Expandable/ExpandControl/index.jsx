import styles from './style.postcss';

import React from 'react';

const ExpandControl = (props) => {
  return <div onClick={onClick} className={styles.ExpandControl}>
    {props.isOpen === true ? 'Contract' : 'Expand'}
  </div>;

  function onClick() {
    if (props.isOpen === true) {
      return props.onContract();
    }

    return props.onExpand();
  }
};

ExpandControl.propTypes = {
  isOpen: React.PropTypes.bool,
  onExpand: React.PropTypes.func.isRequired,
  onContract: React.PropTypes.func.isRequired,
};

export default ExpandControl;
