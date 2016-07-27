import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import is from 'is_js';
import Tooltip from 'components/Tooltip';

const ProductionStatus = (props) => {
  const { status, initial, highlighted, className } = props;
  const statusClasses = classnames(styles.ProductionStatus_inner,
      { [styles.__highlight]: !! highlighted });

  if (is.string(initial) && is.not.empty(initial)) {
    return renderSmall();
  }

  if (is.string(status) && is.not.empty(status)) {
    return renderBig();
  }

  return null;

  function renderSmall() {
    return <Tooltip text={status} className={classnames(styles.ProductionStatus, className)}>
      <div className={classnames(statusClasses, styles.__small)}>{initial}</div>
    </Tooltip>;
  }

  function renderBig() {
    return <div className={classnames(styles.ProductionStatus, className)}>
      <div className={statusClasses}>{status}</div>
    </div>;
  }
};

ProductionStatus.propTypes = {
  className: React.PropTypes.string,
  status: React.PropTypes.string,
  initial: React.PropTypes.string,
  highlighted: React.PropTypes.bool,
};

export default ProductionStatus;
