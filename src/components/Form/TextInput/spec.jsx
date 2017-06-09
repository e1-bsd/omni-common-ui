import styles from './style.postcss';

import React from 'react';
import { mount } from 'enzyme';
import Form from '../';

test('works along with Formsy', () => {
  const wrapper = mount(<Form>
    <Form.TextInput name="email"
        label="Email"
        validations="isEmail"
        validationError="This is not a valid email"
        value="123" />
  </Form>);
  expect(wrapper.find(`.${styles.__error}`).length).toBeGreaterThanOrEqual(1);
});
