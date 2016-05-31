import 'react-select/dist/react-select.css';

import React, { Component } from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import Field from '../Field';
import Checkbox from './Checkbox';

class CheckboxList extends Component {
  componentDidMount() {
    this.props.setValue([]);
  }

  handleChange(e, option) {
    const checked = e.currentTarget.checked;

    let newValue = [];
    if (checked) {
      newValue = this.props.getValue().concat(option);
    } else {
      newValue = this.props.getValue().filter((it) => !this.cmp(it, option));
    }

    this.props.setValue(newValue);
  }

  cmp(a, b) {
    return a === b;
  }

  render() {
    const { name, label, items, validations, validationError } = this.props;

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
              onChecked={(e, option) => this.handleChange(e, option)} />)
      }
    </Field>;
  }

}

CheckboxList.propTypes = {
  setValue: React.PropTypes.func.isRequired,
  getValue: React.PropTypes.func.isRequired,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  items: React.PropTypes.array,
  getErrorMessage: React.PropTypes.func.isRequired,
  showRequired: React.PropTypes.func.isRequired,
  showError: React.PropTypes.func.isRequired,
  validations: React.PropTypes.string,
  validationError: React.PropTypes.string,
};

export default formsyDecorator(CheckboxList);
