import styles from './style.postcss';

import React, { Component } from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';
import classnames from 'classnames';

class TextInput extends Component {
  handleChange(e) {
    this.props.setValue(e.currentTarget.value);
  }

  getValidationClasses() {
    if (this.props.showError()) {
      return styles.__error;
    }

    if (this.props.showRequired()) {
      return styles.__required;
    }
  }

  getErrorMessage() {
    if (this.props.showRequired()) {
      return 'This field is required';
    } else {
      return this.props.getErrorMessage();
    }
  }

  render() {
    const errorMessage = this.getErrorMessage();
    const classes = classnames(styles.TextInput, this.getValidationClasses());
    return <div className={classes}>
      <label>
        <span className={styles.TextInput_label}>{this.props.label}</span>
        <input type="text"
            className={styles.TextInput_element}
            name={this.props.name}
            disabled={this.props.disabled}
            value={this.props.getValue()}
            validations={this.props.validations}
            validationError={this.props.validationError}
            required={this.props.required}
            onChange={(e) => this.handleChange(e)} />
      </label>
      <span className={styles.TextInput_validationError}>{errorMessage}</span>
    </div>;
  }
}

export default FormsyDecorator(TextInput);
