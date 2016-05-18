import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { HOC as FormsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Field from '../Field';

class Select extends Component {
  render() {
    const classes = classnames(styles.Select_element,
        { [styles.__required]: this.props.showRequired() },
        { [styles.__error]: this.props.showError() });
    return <Field label={this.props.label}
        getErrorMessage={() => this.props.getErrorMessage()}
        showError={() => this.props.showError()}
        showRequired={() => this.props.showRequired()}>
      <ReactSelect className={classes} {...this.props} />
    </Field>;
  }
}

export default FormsyDecorator(Select);
