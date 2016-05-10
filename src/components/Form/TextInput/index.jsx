import styles from './style.postcss';

import React from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';

const TextInput = (props) => <div className={styles.TextInput}>
  <label className={styles.TextInput_label} >{props.label}
    <input type="text" name={props.name} disabled={props.disabled}  value={props.getValue()}
           validations={props.validations}
           validationError={props.validationError} />
  </label>
</div>;

export default FormsyDecorator(TextInput);
