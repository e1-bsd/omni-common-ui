import styles from './style.postcss';
import React, { Component } from 'react';
import classnames from 'classnames';
import is from 'is_js';
import _ from 'lodash';

export default class InputSelect extends Component {
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
      option = _.find(props.optionList, ['id', value]);
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
  optionList: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  optionKeys: React.PropTypes.array.isRequired,
  myStyle: React.PropTypes.object,
  selectStyle: React.PropTypes.object,
  className: React.PropTypes.string,
  selectClassName: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  value: React.PropTypes.string,
  labelName: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  required: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  defaultOption: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.shape({
      key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      name: React.PropTypes.string,
    }),
  ]),
  disabledDefaultOption: React.PropTypes.bool,
  nameIdentified: React.PropTypes.bool,
};

InputSelect.defaultProps = {
  nameIdentified: false,
  disabledDefaultOption: false,
  optionList: {},
};
