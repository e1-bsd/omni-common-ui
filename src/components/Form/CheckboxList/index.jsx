import 'react-select/dist/react-select.css';

import React, { Component } from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import Field from '../Field';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';

class CheckboxList extends Component {
  static cmp(a, b) {
    return a === b;
  }

  componentDidMount() {
    this.props.setValue([]);
  }

  handleChange(e, option) {
    const checked = e.currentTarget.checked;

    let newValue = [];
    if (checked) {
      newValue = this.props.getValue().concat(option);
    } else {
      newValue = this.props.getValue().filter((it) => ! CheckboxList.cmp(it, option));
    }

    this.props.setValue(newValue);
  }

  render() {
    const { name, label, items, validations, validationError } = this.props;
    const checked = this.props.getValue() || [];

    return <Field label={label}
        getErrorMessage={() => this.props.getErrorMessage()}
        showError={() => this.props.showError()}
        validations={validations}
        validationError={validationError}
        showRequired={() => this.props.showRequired()}>
      {
        items.map((item, i) =>
          <Checkbox key={i}
              name={name}
              item={item}
              onChecked={(e) => this.handleChange(e, item)}
              checked={checked.indexOf(item) >= 0} />)
      }
    </Field>;
  }

}

CheckboxList.propTypes = {
  setValue: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  getErrorMessage: PropTypes.func.isRequired,
  showRequired: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  validations: PropTypes.string,
  validationError: PropTypes.string,
};

export default formsyDecorator(CheckboxList);
