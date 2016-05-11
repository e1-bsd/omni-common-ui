import styles from './style.postcss';

import React, { Component } from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';

class TextInput extends Component {

    handleChange(e) {
        this.props.setValue(e.currentTarget.value);
    }

    render() {
        const errorMessage = this.props.getErrorMessage();
        return <div className={styles.TextInput}>
            <label className={styles.TextInput_label} >{this.props.label}
                <input type="text"
                    name={this.props.name}
                    disabled={this.props.disabled}
                    value={this.props.getValue()}
                    validations={this.props.validations}
                    validationError={this.props.validationError}
                    onChange={(e) => this.handleChange(e)}/>
            </label>
            <span className={styles.TextInput_validationError}>{errorMessage}</span>
        </div>;
    }
}

export default FormsyDecorator(TextInput);
