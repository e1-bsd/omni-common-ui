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
    this.state = { value: this._parseValue(props) };
    this._parseProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: this._parseValue(nextProps) });
    }

    this._parseProps(nextProps);
  }

  componentWillUpdate(nextProps) {
    this._parseProps(nextProps);
  }

  _parseProps(props) {
    this._min = this.transferToNumber(props.min);
    this._max = this.transferToNumber(props.max);
    this._step = this.transferToNumber(props.step, 1);
  }

  _parseValue({ value, defaultValue }) {
    return this.transferToNumber(value === undefined ? defaultValue : value);
  }

  transferToNumber(target, defaultValue) {
    if (is.number(target)) {
      return Number(target.toFixed(0));
    }
    if (REG_EXP_ACCEPTED_CHARS.test(target)) {
      return Number(target);
    }
    return defaultValue;
  }

  upArrowClickHandler() {
    if (this.state.value === undefined) {
      if (is.not.undefined(this._min)) {
        this.applyChange(this._min);
      } else {
        this.applyChange(this._step || 1);
      }
      return;
    }

    if (is.undefined(this._max) ||
        this.state.value + this._step <= this._max) {
      this.applyChange(this.state.value + this._step);
    }
  }

  downArrowClickHandler() {
    if (this.state.value === undefined) {
      if (is.not.undefined(this._min)) {
        this.applyChange(this._min);
      } else {
        this.applyChange(- this._step || - 1);
      }
      return;
    }

    if (is.undefined(this._min) ||
        this.state.value - this._step >= this._min) {
      this.applyChange(this.state.value - this._step);
    }
  }

  valueChangeHandler(e) {
    if (e.target.value === '') {
      this.applyChange(e.target.value);
    }

    if (REG_EXP_ACCEPTED_CHARS.test(e.target.value)) {
      this.setState({ value: e.target.value });

      if ((is.undefined(this._min) ||
          Number(e.target.value, 10) >= this._min) &&
          (is.undefined(this._max) ||
          Number(e.target.value, 10) <= this._max)) {
        this.applyChange(Number(e.target.value, 10));
      }

      if (Number(e.target.value, 10) < this._min) {
        this.applyChange(Number(this._min, 10));
      }

      if (Number(e.target.value, 10) > this._max) {
        this.applyChange(Number(this._max, 10));
      }
    }
  }

  applyChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      if (value === '') {
        this.props.onChange({ target: {} });
      } else {
        this.props.onChange({ target: { value } });
      }
    }
  }

  render() {
    return <div className={styles.NumberInputContainer}>
      {this.props.labelName ?
        <span className={styles.NumberInputName}>
          {this.props.labelName}
        </span> :
        ''}
      <div className={classnames(styles.NumberInput, this.props.className)}
          style={this.props.customStyle} >
        {
          ! this.props.disabled &&
          <div className={styles.upArrow} onClick={() => this.upArrowClickHandler()}>
            <Icon id="chevron-small-up" />
          </div>
        }
        {
          ! this.props.disabled &&
          <div className={styles.downArrow} onClick={() => this.downArrowClickHandler()}>
            <Icon id="chevron-small-down" />
          </div>
        }
        <input className={styles.valueBox}
            type="text"
            value={this.state.value}
            disabled={this.props.unwritable || this.props.disabled}
            onChange={(e) => this.valueChangeHandler(e)} />
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
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  unwritable: PropTypes.bool,
  className: PropTypes.string,
  labelName: PropTypes.string,
  customStyle: PropTypes.object,
};
