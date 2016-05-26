import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Field from '../Field';

const Radio = (props) => {
  const { name, label, items } = props;
  const classes = classnames(styles.Select_element,
      { [styles.__required]: props.showRequired() },
      { [styles.__error]: props.showError() });
  return <Field label={label}
      getErrorMessage={() => props.getErrorMessage()}
      showError={() => props.showError()}
      showRequired={() => props.showRequired()}>
      {items.map((item, i) =>
        <div className={classes} key={i}>
          <input
            type="radio"
            name={name}
            />
          <span>{item}</span>
        </div>
      )}
  </Field>;

};

export default FormsyDecorator(Radio);
