import styles from './style.postcss';

import React from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Field from '../Field';
import PropTypes from 'prop-types';

const TextInput = (props) => {
  const classes = classnames(styles.TextInput,
      { [styles.__required]: props.showRequired() },
      { [styles.__error]: props.showError() });

  return <Field label={props.label}
      getErrorMessage={() => props.getErrorMessage()}
      showError={() => props.showError()}
      showRequired={() => props.showRequired()}
      useLabel>
    <input type="text"
        className={classes}
        name={props.name}
        disabled={props.disabled}
        value={props.getValue()}
        onChange={(e) => handleChange(e)} />
  </Field>;

  function handleChange(e) {
    props.setValue(e.currentTarget.value);
  }
};

TextInput.propTypes = {
  getErrorMessage: PropTypes.func.isRequired,
  showRequired: PropTypes.func.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default formsyDecorator(TextInput);
