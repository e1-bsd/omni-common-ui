import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const Field = (props) => {
  const classes = classnames(styles.Field, props.className, getValidationClasses(), {
    [styles.__stackedHorizontally]: props.neighborStackMode === 'horizontal',
  });
  if (props.useLabel === true) {
    return <label className={classes}>{renderInner()}</label>;
  }

  return <div className={classes}>{renderInner()}</div>;

  function renderInner() {
    return <div className={classnames(styles.Field_wrap, {
      [styles.__stackedVertically]: props.innerStackMode === 'vertical',
    })}>
      <span className={classnames(styles.Field_wrap_label, props.labelTextClassName)}>
        {props.label}
      </span>
      <div className={styles.Field_wrap_inputContainer}>
        {props.children}
        {renderError()}
      </div>
    </div>;
  }

  function renderError() {
    if (! props.showError()) {
      return;
    }

    return <span className={styles.Field_wrap_inputContainer_validationError}>
      {getErrorMessage()}
    </span>;
  }

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
    }

    return props.getErrorMessage();
  }
};

Field.propTypes = {
  className: PropTypes.string,
  labelTextClassName: PropTypes.string,
  label: PropTypes.string,
  showError: PropTypes.func.isRequired,
  showRequired: PropTypes.func.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  useLabel: PropTypes.bool,
  neighborStackMode: PropTypes.oneOf(['default', 'horizontal']),
  innerStackMode: PropTypes.oneOf(['horizontal', 'vertical']),  // default: horizontal
};

export default pure(Field);
