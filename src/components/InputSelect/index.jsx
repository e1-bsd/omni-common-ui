import styles from './style.postcss';

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import is from 'is_js';
import loFind from 'lodash.find';
import PropTypes from 'prop-types';

export default class InputSelect extends PureComponent {
  constructor(props) {
    super(props);

    const initOption = is.not.undefined(props.optionList[props.value]) ?
      props.optionList[props.value] :
      props.defaultOption;
    this.state = {
      value: props.value,
      selectedOption: initOption,
      selectedText: is.not.undefined(initOption) ? initOption.name : '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentWillReceiveProps(props) {
    this.updateState(props.value);
  }

  updateState(value) {
    const props = this.props;
    let option;
    if (is.array(props.optionList)) {
      option = loFind(props.optionList, ['id', value]);
    } else {
      option = is.not.undefined(props.optionList[value]) ?
       props.optionList[value] :
       props.defaultOption;
    }

    this.setState({
      value,
      selectedOption: option,
      selectedText: is.not.undefined(option) ? option.name : '',
    });
  }

  handleChange(e) {
    this.updateState(e.target.value);
    this.props.onChange(e);
  }

  render() {
    const {
      optionKeys,
      optionList,
      className,
      selectClassName,
      labelClassName,
      defaultOption,
      disabledDefaultOption,
      nameIdentified,
    } = this.props;
    const classes = classnames(styles.InputSelect, className);
    const selectClasses = classnames(selectClassName, styles.InputSelect_select);
    const labelClasses = classnames(labelClassName, styles.InputSelect_name);

    function renderOptions() {
      if (optionKeys && is.object(optionList)) {
        return optionKeys.map((key) =>
          <option value={key}>{optionList[key] ? optionList[key].name : ''}</option>);
      }

      if (! optionKeys && is.array(optionList)) {
        if (! nameIdentified) {
          return optionList.map((item) => <option value={item.id}>{item.name}</option>);
        }
        return optionList.map((item) => <option value={item.name}>{item.name}</option>);
      }
    }
    return (
      <div className={classes} style={this.props.myStyle}>
        {
          this.props.labelName ?
            <span className={labelClasses}>
              {this.props.labelName}
            </span> :
            ''
        }

        <select className={selectClasses}
            disabled={this.props.disabled}
            style={this.props.selectStyle}
            onChange={this.handleChange}
            value={this.props.value}
            required={this.props.required}>
          {
            <option value={is.object(defaultOption) ? defaultOption.key : ''}
                disabled={disabledDefaultOption}
                style={{ display: disabledDefaultOption ? 'none' : 'block' }}>
              {is.object(defaultOption) ? defaultOption.name : defaultOption}
            </option>
          }
          {renderOptions()}
        </select>
      </div>
    );
  }
}

InputSelect.propTypes = {
  optionList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  optionKeys: PropTypes.array.isRequired,
  myStyle: PropTypes.object,
  selectStyle: PropTypes.object,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  value: PropTypes.string,
  labelName: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  defaultOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      name: PropTypes.string,
    }),
  ]),
  disabledDefaultOption: PropTypes.bool,
  nameIdentified: PropTypes.bool,
};

InputSelect.defaultProps = {
  nameIdentified: false,
  disabledDefaultOption: false,
  optionList: {},
};
