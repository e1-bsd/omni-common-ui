import React from 'react';
import pure from 'recompose/pure';
import { Form as FormsyForm } from 'formsy-react';
import PropTypes from 'prop-types';

const Form = (props) => <div className={props.className}>
  <FormsyForm onSubmit={props.onSubmit}
      onChange={props.onChange}
      onValid={props.onValid}
      onInvalid={props.onInvalid}>
    {props.children}
  </FormsyForm>
</div>;

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  children: PropTypes.node,
};

export default pure(Form);
