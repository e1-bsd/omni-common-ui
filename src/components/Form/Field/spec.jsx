import styles from './style.postcss';

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Field from './';

describe('Form', () => {
  describe('Field', () => {
    it('applies error style if showError returns true', () => {
      const wrapper = shallow(<Field showError={() => true}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__error}`)).to.have.length(1);
    });

    it('does not apply error style if showError returns false', () => {
      const wrapper = shallow(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__error}`)).to.have.length(0);
    });

    it('shows the error message provided by getErrorMessage if showError returns true', () => {
      const errorMessage = 'This is not a valid email';
      const wrapper = shallow(<Field showError={() => true}
          showRequired={() => false}
          getErrorMessage={() => errorMessage} />);
      const errorClass = styles.Field_wrap_inputContainer_validationError;
      const errorText = wrapper.find(`.${errorClass}`).text();
      expect(errorText).to.equal(errorMessage);
    });

    it('does not show the error message provided by getErrorMessage if showError returns false', () => {
      const wrapper = shallow(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      const errorClass = styles.Field_wrap_inputContainer_validationError;
      expect(wrapper.find(`.${errorClass}`)).to.have.length(0);
    });

    it('applies required styles if showRequired retuns true', () => {
      const wrapper = mount(<Field showError={() => false}
          showRequired={() => true}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__required}`)).to.have.length(1);
    });

    it('does not apply required styles if showRequired retuns false', () => {
      const wrapper = mount(<Field showError={() => false}
          showRequired={() => false}
          getErrorMessage={() => ''} />);
      expect(wrapper.find(`.${styles.__required}`)).to.have.length(0);
    });
  });
});
