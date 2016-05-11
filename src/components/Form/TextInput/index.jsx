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
      return styles.TextInput_error;
    }

    if (this.props.showRequired()) {
      return styles.TextInput_required;
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
    const textInputElementClasses = classnames(styles.TextInput_element,
        this.getValidationClasses());
    return <div className={styles.TextInput}>
      <label>
        <span className={styles.TextInput_label}>{this.props.label}</span>
        <input type="text"
            className={textInputElementClasses}
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
