import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Field = (props) => {
  const classes = classnames(styles.Field, getValidationClasses());
  return <label className={classes}>
    <span className={styles.Field_label}>{props.label}</span>
    <div className={styles.Field_inputContainer}>
      {props.children}
      <span className={styles.Field_inputContainer_validationError}>
        {getErrorMessage()}
      </span>
    </div>
  </label>;

  function getValidationClasses() {
    if (props.showError()) {
      return styles.__error;
    }

    if (props.showRequired()) {
      return styles.__required;
    }
  }

  function getErrorMessage() {
    if (props.showRequired()) {
      return 'This field is required';
    } else {
      return props.getErrorMessage();
    }
  }
};

Field.propTypes = {
  label: React.PropTypes.func,
  showError: React.PropTypes.func.required,
  showRequired: React.PropTypes.func.required,
  getErrorMessage: React.PropTypes.func.required,
};

export default Field;
