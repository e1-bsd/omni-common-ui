import React from 'react';
import { Form as FormsyForm } from 'formsy-react';

const Form = (props) => <div>
  <FormsyForm onSubmit={props.onSubmit}
      onChange={props.onChange}
      onValid={props.onValid}
      onInvalid={props.onInvalid}>
    {props.children}
  </FormsyForm>
</div>;

export default Form;
