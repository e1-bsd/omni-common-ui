import styles from './style.postcss';

import React from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Field from '../Field';

const TextInput = (props) => {
  const classes = classnames(styles.TextInput,
      { [styles.__required]: props.showRequired() },
      { [styles.__error]: props.showError() });

  return <Field label={props.label}
      getErrorMessage={() => props.getErrorMessage()}
      showError={() => props.showError()}
      showRequired={() => props.showRequired()}>
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

export default FormsyDecorator(TextInput);
