import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { HOC as FormsyDecorator } from 'formsy-react';
import classnames from 'classnames';

class Select extends Component {

  getClasses() {
    if (this.props.showRequired()) {
      return styles.__required;
    }
  }

  getErrorMessage() {
    if (this.props.showRequired()) {
      return 'This field is required';
    }

    return '';
  }

  render() {
    const classes = classnames(styles.Select_element, this.getClasses());
    const errorMessage = this.getErrorMessage();
    return <div className={styles.Select}>
      <label>
        <span className={styles.Select_label}>{this.props.label}</span>
        <ReactSelect className={classes} {...this.props} />
        <span className={styles.Select_element_validationError}>
        {errorMessage}
        </span>
      </label>
    </div>;
  }

}

export default FormsyDecorator(Select);
