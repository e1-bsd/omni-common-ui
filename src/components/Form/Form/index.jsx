import React from 'react';
import { Form as FormsyForm } from 'formsy-react';

const Form = (props) => <div className={props.className}>
  <FormsyForm onSubmit={props.onSubmit}
      onChange={props.onChange}
      onValid={props.onValid}
      onInvalid={props.onInvalid}>
    {props.children}
  </FormsyForm>
</div>;

Form.propTypes = {
  className: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onValid: React.PropTypes.func,
  onInvalid: React.PropTypes.func,
  children: React.PropTypes.node,
};

export default Form;
