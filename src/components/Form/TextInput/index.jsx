import styles from './style.postcss';

import React from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Field from '../Field';

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
  showRequired: React.PropTypes.func.isRequired,
  name: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  getValue: React.PropTypes.func.isRequired,
  setValue: React.PropTypes.func.isRequired,
  showError: React.PropTypes.func.isRequired,
  label: React.PropTypes.string,
};

export default formsyDecorator(TextInput);
