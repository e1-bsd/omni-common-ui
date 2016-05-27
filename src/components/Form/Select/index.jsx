import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React from 'react';
import ReactSelect from 'react-select';
import { HOC as FormsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Field from '../Field';

const Select = (props) => {
  const classes = classnames(styles.Select_element,
      { [styles.__required]: props.showRequired() },
      { [styles.__error]: props.showError() });
  return <Field label={props.label}
      getErrorMessage={() => props.getErrorMessage()}
      showError={() => props.showError()}
      showRequired={() => props.showRequired()}>
    <ReactSelect className={classes} {...props} onChange={(e) => handleChange(e)}/>
  </Field>;

  function handleChange(e) {
    props.setValue(e.value);
  }
};

export default FormsyDecorator(Select);
