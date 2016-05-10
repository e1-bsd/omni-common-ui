import styles from './style.postcss';

import React from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';

const TextInput = (props) => {
    return <div className={styles.TextInput}>
        <label className={styles.TextInput_label} >{props.label}
            <input type="text" name={props.name} disabled={props.disabled}  value={props.getValue()}
                   validations={props.validations}
                   validationError={props.validationError}
                   onChange={(e) => handleChange(e)}/>
        </label>
    </div>;

    function handleChange(e) {
        props.setValue(e.currentTarget.value);
    }
}

export default FormsyDecorator(TextInput);
