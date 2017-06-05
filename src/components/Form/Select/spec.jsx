import styles from './style.postcss';

import React from 'react';
import { mount } from 'enzyme';
import Form from '../';
import Field from '../Field';

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
            required />
      </Form>);
      expect(wrapper.find(`.${styles.__required}`)).toHaveLength(1);
    });

    describe('label prop existence', () => {
      it('has a Field when there is a label prop present', () => {
        const wrapper = mount(<Form>
          <Form.Select name="labelled"
              label="labelled"
              value=""
              options={options} />
        </Form>);
        expect(wrapper).to.have.descendants(Field);
      });

      it('does not have a Field when there is no label prop present', () => {
        const wrapper = mount(<Form>
          <Form.Select name="labelless"
              value=""
              options={options} />
        </Form>);
        expect(wrapper).to.not.have.descendants(Field);
      });
    });
  });
});
