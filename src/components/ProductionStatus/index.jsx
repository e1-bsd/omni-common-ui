import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import is from 'is_js';
import Tooltip from 'components/Tooltip';

const ProductionStatus = (props) => {
  const { status, initial, highlighted } = props;
  if (is.not.string(initial) || is.empty(initial)) {
    return null;
  }

  const statusClasses = classnames(styles.ProductionStatus_inner,
      { [styles.__highlight]: !! highlighted });
  return <Tooltip text={status} className={classnames(styles.ProductionStatus, props.className)}>
    <div className={statusClasses}>{initial}</div>
  </Tooltip>;
};

ProductionStatus.propTypes = {
  className: React.PropTypes.string,
  status: React.PropTypes.string,
  initial: React.PropTypes.string,
  highlighted: React.PropTypes.bool,
};

export default ProductionStatus;
