import React from 'react';
import { Form } from 'omni-common-ui';

const CheckboxShowcase = () => <div>
  <Form.Checkbox name="checkBoxNormal"
      label="Normal Checkbox"
      items={['foo', 'bar']} />
</div>;

export default CheckboxShowcase;
