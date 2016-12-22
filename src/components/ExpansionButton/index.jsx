import styles from './style.postcss';
import React from 'react';

const ExpansionButton = (props) => {
  const { isExpand, onExpansionButtonClick } = props;
  const expandIcon = isExpand ?
    styles.ExpansionButton_arrowUp :
    styles.ExpansionButton_arrowDown;
  const expandDescription = isExpand ? 'VIEW LESS' : 'VIEW MORE';

  return <div className={styles.ExpansionButton}
      onClick={() => onExpansionButtonClick()}>
    <span className={styles.ExpansionButton_description}>
      {expandDescription}
    </span>
    <div className={expandIcon} />
  </div>;
};

ExpansionButton.propTypes = {
  isExpand: React.PropTypes.bool.isRequired,
  onExpansionButtonClick: React.PropTypes.func.isRequired,
};

export default ExpansionButton;
