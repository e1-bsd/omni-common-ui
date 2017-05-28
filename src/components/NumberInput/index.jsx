import styles from './style.postcss';

import React, { PureComponent } from 'react';
import is from 'is_js';
import classnames from 'classnames';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

const REG_EXP_ACCEPTED_CHARS = /^[0-9]+$/;

export default class NumberInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this._parseProps(props);
    this._onUpArrowClicked = this._onUpArrowClicked.bind(this);
    this._onDownArrowClicked = this._onDownArrowClicked.bind(this);
    this._onValueChanged = this._onValueChanged.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  componentWillUpdate(nextProps) {
    this._parseProps(nextProps);
  }

  _parseProps(props) {
    this._value = this._parseNumber(props.value);
    this._defaultValue = this._parseNumber(props.defaultValue);
    this._min = this._parseNumber(props.min);
    this._max = this._parseNumber(props.max);
    this._step = this._parseNumber(props.step, 1);
  }

  _parseNumber(target, defaultValue) {
    if (is.number(target)) {
      return Number(target.toFixed(0));
    }

    if (REG_EXP_ACCEPTED_CHARS.test(target)) {
      return Number(target, 10);
    }

    return defaultValue;
  }

  _onUpArrowClicked() {
    this._setNewValue((this._value || this._defaultValue) + 1);
    this._focusOnInput();
  }

  _onDownArrowClicked() {
    this._setNewValue((this._value || this._defaultValue) - 1);
    this._focusOnInput();
  }

  _setNewValue(value) {
    this._onValueChanged({ target: { value } });
  }

  _focusOnInput() {
    this._input.focus();
  }

  _onValueChanged({ target: { value: newValue } }) {
    if (is.empty(newValue)) {
      return this._sendCallbackWithNewValue(null);
    }

    if (! REG_EXP_ACCEPTED_CHARS.test(newValue)) {
      return;
    }

    const numberValue = Number(newValue, 10);
    if ((is.undefined(this._min) || numberValue >= this._min) &&
        (is.undefined(this._max) || numberValue <= this._max)) {
      return this._sendCallbackWithNewValue(numberValue);
    }

    if (numberValue < this._min) {
      return this._sendCallbackWithNewValue(this._min);
    }

    if (numberValue > this._max) {
      return this._sendCallbackWithNewValue(this._max);
    }
  }

  _sendCallbackWithNewValue(value) {
    if (is.function(this.props.onChange)) {
      this.props.onChange(value);
    }
  }

  _onFocus() {
    this.setState({ focused: true });
  }

  _onBlur() {
    this.setState({ focused: false });
  }

  render() {
    const classes = classnames(styles.NumberInput_inputContainer,
        this.props.className,
        { [styles.__focused]: this.state.focused });
    return <div className={styles.NumberInput}>
      {
        this.props.labelName &&
        <span className={styles.NumberInput_label}>
          {this.props.labelName}
        </span>
      }
      <div className={classes}>
        <input className={styles.NumberInput_inputContainer_input}
            type="text"
            value={this._value || this._defaultValue}
            disabled={this.props.unwritable || this.props.disabled}
            onChange={this._onValueChanged}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            ref={(c) => { this._input = c; }} />
        {
          ! this.props.disabled &&
          <div className={styles.NumberInput_arrowsContainer}>
            <div className={styles.NumberInput_arrow} onClick={this._onUpArrowClicked}>
              <Icon id="chevron-small-up" />
            </div>
            <div className={styles.NumberInput_arrow} onClick={this._onDownArrowClicked}>
              <Icon id="chevron-small-down" />
            </div>
          </div>
        }
      </div>
    </div>;
  }
}

NumberInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  min: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  step: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  unwritable: PropTypes.bool,
  className: PropTypes.string,
  labelName: PropTypes.string,
};
