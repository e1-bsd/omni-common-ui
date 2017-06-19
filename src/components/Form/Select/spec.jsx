import styles from './style.postcss';

import React from 'react';
import { mount } from 'enzyme';
import Form from '../';
import Field from '../Field';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', clearableValue: false },
];

test('works along with Formsy', () => {
  const wrapper = mount(<Form>
    <Form.Select name="required"
        label="required"
        value=""
        options={options}
        required />
  </Form>);
  expect(wrapper.find(`.${styles.__required}`).length).toBeGreaterThanOrEqual(1);
});

describe('label prop existence', () => {
  test('has a Field when there is a label prop present', () => {
    const wrapper = mount(<Form>
      <Form.Select name="labelled"
          label="labelled"
          value=""
          options={options} />
    </Form>);
    expect(wrapper.find(Field)).toHaveLength(1);
    expect(wrapper.find(Field).prop('useLabel')).toBeTruthy();
  });

  test('passes options to Field when there is are label and fieldOptions props present', () => {
    const wrapper = mount(<Form>
      <Form.Select name="labelled"
          label="labelled"
          value=""
          options={options}
          fieldOptions={{ neighborStackMode: 'horizontal', className: 'class' }} />
    </Form>);
    const field = wrapper.find(Field);
    expect(field.prop('neighborStackMode')).toBe('horizontal');
    expect(field.prop('className')).toBe('class');
  });

  test('does not have a Field when there is no label prop present', () => {
    const wrapper = mount(<Form>
      <Form.Select name="labelless"
          value=""
          options={options} />
    </Form>);
    expect(wrapper.find(Field)).toHaveLength(0);
  });
});
