import styles from './style.postcss';

import React, { Component } from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';
import Field from '../Field';

class TextInput extends Component {
  handleChange(e) {
    this.props.setValue(e.currentTarget.value);
  }

  render() {
    return <Field label={this.props.label}
        getErrorMessage={() => this.props.getErrorMessage()}
        showError={() => this.props.showError()}
        showRequired={() => this.props.showRequired()}>
      <input type="text"
          className={styles.TextInput}
          name={this.props.name}
          disabled={this.props.disabled}
          value={this.props.getValue()}
          onChange={(e) => this.handleChange(e)} />
    </Field>;
  }
}

export default FormsyDecorator(TextInput);
