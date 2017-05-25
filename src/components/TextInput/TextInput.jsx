import styles from './style.postcss';

import React from 'react';
import PureComponent from 'domain/PureComponent';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class TextInput extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (this.props.acceptedChars) {
      if (this.props.acceptedChars.type === 'number' &&
          e.target.value.match(/\D/g)
          ) {
        return;
      }
      if (this.props.acceptedChars.length > 0 &&
          this.props.acceptedChars.length < e.target.value.length) {
        return;
      }
    }
    this.props.onChange(e);
  }

  render() {
    const { suffix } = this.props;
    const _this = this;
    const classes = classnames(styles.TextInput, this.props.className);
    const inputClasses = ! suffix ?
      classnames(styles.TextInput_input, this.props.inputClassName) :
      classnames(styles.TextInput_input, this.props.inputClassName, styles.TextInput_suffixInput);
    return <div className={classes} style={this.props.myStyle}>
      <span className={styles.TextInput_name}>{this.props.labelName}</span>
      {renderInputText()}
    </div>;

    function renderInputText() {
      if (suffix) {
        return <div className={styles.TextInput_suffixWrapper}>
          <input type="text" style={_this.props.inputStyle}
              className={inputClasses}
              name={_this.props.name}
              disabled={_this.props.disabled}
              required={_this.props.required}
              value={_this.props.value}
              placeholder={_this.props.placeholder}
              onBlur={_this.handleChange}
              onChange={_this.handleChange} />
          <span className={styles.TextInput_suffixWrapper_suffix}>{suffix}</span>
        </div>;
      }

      return <input type="text" style={_this.props.inputStyle}
          className={inputClasses}
          name={_this.props.name}
          disabled={_this.props.disabled}
          required={_this.props.required}
          value={_this.props.value}
          placeholder={_this.props.placeholder}
          onBlur={_this.handleChange}
          onChange={_this.handleChange} />;
    }
  }
}

TextInput.propTypes = {
  myStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  labelName: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  suffix: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  acceptedChars: PropTypes.object,
};

export default TextInput;
