import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import is from 'is_js';
import Tooltip from 'components/Tooltip';

const ProductionStatus = (props) => {
  const { status, initial, highlighted, className, unbreakable } = props;
  const containerClasses = classnames(styles.ProductionStatus, className);
  const statusClasses = classnames(styles.ProductionStatus_inner,
      { [styles.__highlight]: !! highlighted },
      { [styles.__unbreakable]: !! unbreakable });

  if (is.string(initial) && is.not.empty(initial)) {
    return renderSmall();
  }

  if (is.string(status) && is.not.empty(status)) {
    return renderBig();
  }

  return null;

  function renderSmall() {
    if (is.string(status) && is.not.empty(status)) {
      return <Tooltip text={status} className={containerClasses}>
        <div className={classnames(statusClasses, styles.__small)}>{initial}</div>
      </Tooltip>;
    }

    return <div className={containerClasses}>
      <div className={classnames(statusClasses, styles.__small)}>{initial}</div>
    </div>;
  }

  function renderBig() {
    return <div className={containerClasses}>
      <div className={statusClasses}>{status}</div>
    </div>;
  }
};

ProductionStatus.propTypes = {
  className: React.PropTypes.string,
  status: React.PropTypes.string,
  initial: React.PropTypes.string,
  highlighted: React.PropTypes.bool,
  unbreakable: React.PropTypes.bool,
};

export default ProductionStatus;
