import 'react-select/dist/react-select.css';
import styles from './style.postcss';

import React from 'react';
import ReactSelect from 'react-select';
import is from 'is_js';
import { HOC as formsyDecorator } from 'formsy-react';
import classnames from 'classnames';
import Icon from 'components/Icon';
import Field from '../Field';
import PropTypes from 'prop-types';

const Select = (props) => {
  const arrowRenderer = () =>
    <span className={styles.Select_icon}>
      <Icon id="chevron-small-down" />
    </span>;

  const classes = classnames(styles.Select_element,
      props.className,
      { [styles.__required]: props.showRequired() },
      { [styles.__error]: props.showError() });

  const select = <ReactSelect placeholder={props.placeholder || undefined}
      onChange={(e) => handleChange(e)}
      arrowRenderer={() => arrowRenderer()}
      optionRenderer={(option) => <div className={styles.Select_option}>
        {option.label || option.value}
      </div>}
      {...props}
      className={classes} />;

  if (is.not.undefined(props.label)) {
    return <Field label={props.label}
        getErrorMessage={() => props.getErrorMessage()}
        showError={() => props.showError()}
        showRequired={() => props.showRequired()}
        useLabel
        {...props.fieldOptions}>
      {select}
    </Field>;
  }
  return select;

  function handleChange(e) {
    props.setValue(e.value);
  }
};

Select.propTypes = {
  className: PropTypes.string,
  getErrorMessage: PropTypes.func.isRequired,
  showRequired: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  clearable: PropTypes.bool,   // default: true
  searchable: PropTypes.bool,  // default: true
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fieldOptions: PropTypes.shape({
    className: PropTypes.string,
    labelTextClassName: PropTypes.string,
    neighborStackMode: PropTypes.oneOf(['default', 'horizontal']),
    innerStackMode: PropTypes.oneOf(['horizontal', 'vertical']),  // default: horizontal
  }),
};

export default formsyDecorator(Select);
