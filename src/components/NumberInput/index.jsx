import React, { Component } from 'react';
import styles from './style.postcss';
import is from 'is_js';
import classnames from 'classnames';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

export default class NumberInput extends Component {
  componentWillMount() {
    this.acceptedString = /^[0-9]+$/;
    this.setState({
      value: this.transferToNumber(this.props.value === undefined ?
          this.props.defaultValue :
          this.props.value, ''),
      min: this.transferToNumber(this.props.min),
      max: this.transferToNumber(this.props.max),
      step: this.transferToNumber(this.props.step, 1),
      disabled: this.props.disabled,
      unwritable: this.props.unwritable,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.value === nextProps.value &&
        this.props.min === nextProps.min &&
        this.props.max === nextProps.max &&
        this.props.step === nextProps.step &&
        this.props.disabled === nextProps.disabled &&
        this.props.unwritable === nextProps.unwritable) {
      return;
    }
    this.setState({
      value: this.transferToNumber(nextProps.value === undefined ?
          nextProps.defaultValue :
          nextProps.value),
      min: this.transferToNumber(nextProps.min),
      max: this.transferToNumber(nextProps.max),
      step: this.transferToNumber(nextProps.step, 1),
      disabled: nextProps.disabled,
      unwritable: nextProps.unwritable,
    });
  }

  transferToNumber(target, defaultValue) {
    if (is.number(target)) {
      return Number(target.toFixed(0));
    }
    if (this.acceptedString.test(target)) {
      return Number(target);
    }
    return defaultValue;
  }

  upArrowClickHandler() {
    if (this.state.value === undefined) {
      if (is.not.undefined(this.state.min)) {
        this.applyChange(this.state.min);
      } else {
        this.applyChange(this.state.step || 1);
      }
      return;
    }

    if (is.undefined(this.state.max) ||
        this.state.value + this.state.step <= this.state.max) {
      this.applyChange(this.state.value + this.state.step);
    }
  }

  downArrowClickHandler() {
    if (this.state.value === undefined) {
      if (is.not.undefined(this.state.min)) {
        this.applyChange(this.state.min);
      } else {
        this.applyChange(- this.state.step || - 1);
      }
      return;
    }

    if (is.undefined(this.state.min) ||
        this.state.value - this.state.step >= this.state.min) {
      this.applyChange(this.state.value - this.state.step);
    }
  }

  valueChangeHandler(e) {
    if (e.target.value === '') {
      this.applyChange(e.target.value);
    }

    if (this.acceptedString.test(e.target.value)) {
      this.setState({ value: e.target.value });

      if ((is.undefined(this.state.min) ||
          Number(e.target.value, 10) >= this.state.min) &&
          (is.undefined(this.state.max) ||
          Number(e.target.value, 10) <= this.state.max)) {
        this.applyChange(Number(e.target.value, 10));
      }

      if (Number(e.target.value, 10) < this.state.min) {
        this.applyChange(Number(this.state.min, 10));
      }

      if (Number(e.target.value, 10) > this.state.max) {
        this.applyChange(Number(this.state.max, 10));
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
            disabled={this.state.unwritable || this.state.disabled}
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
