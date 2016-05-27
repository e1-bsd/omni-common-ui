import React from 'react';
import { Form } from 'omni-common-ui';

const RadioShowcase = () => <div>
  <Form.Radio name="radio" label="Radio" items={['foo', 'bar']}></Form.Radio>
</div>;

export default RadioShowcase;
