import styles from './style.postcss';

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Form from '../';

describe('Form', () => {
  describe('Select', () => {
    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two', clearableValue: false },
    ];

    it('works along with Formsy', () => {
      const wrapper = mount(<Form>
        <Form.Select name="required"
            label="required"
            value=""
            options={options}
            required={true} />
      </Form>);
      expect(wrapper.find(`.${styles.__required}`)).to.have.length(1);
    });
  });
});
